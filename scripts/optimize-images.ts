/**
 * Image optimization script
 * Автоматически оптимизирует изображения:
 * - Сжимает JPEG/PNG с качеством 85%
 * - Создает WebP версии
 * - Генерирует @2x и @1x варианты для Retina
 * - Сохраняет оригиналы в .original/
 */

import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync, copyFileSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const IMAGES_DIR = join(process.cwd(), 'public', 'images');
const QUALITY = 85;
const WEBP_QUALITY = 80;

// Цвета для консоли
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

interface OptimizationStats {
  originalSize: number;
  optimizedSize: number;
  webpSize: number;
  savings: number;
  savingsPercent: number;
}

async function getFileSize(path: string): Promise<number> {
  try {
    return statSync(path).size;
  } catch {
    return 0;
  }
}

async function formatBytes(bytes: number): Promise<string> {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

async function optimizeImage(filePath: string): Promise<OptimizationStats | null> {
  const ext = extname(filePath).toLowerCase();
  const baseName = basename(filePath, ext);
  const dirName = join(filePath, '..');
  
  // Пропускаем SVG и оригиналы
  if (ext === '.svg' || filePath.includes('.original')) {
    return null;
  }

  // Поддерживаем только изображения
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return null;
  }

  try {
    const originalSize = await getFileSize(filePath);
    
    // Создаем папку для оригиналов
    const originalDir = join(dirName, '.original');
    if (!existsSync(originalDir)) {
      mkdirSync(originalDir, { recursive: true });
    }

    // Сохраняем оригинал
    const originalPath = join(originalDir, `${baseName}${ext}`);
    if (!existsSync(originalPath)) {
      copyFileSync(filePath, originalPath);
    }

    // Загружаем изображение
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      console.log(`${colors.yellow}⚠️  Пропускаем ${basename(filePath)} - нет метаданных${colors.reset}`);
      return null;
    }

    console.log(`${colors.blue}🔄 Обрабатываю ${basename(filePath)}${colors.reset} ${colors.gray}(${metadata.width}x${metadata.height})${colors.reset}`);

    // Оптимизируем оригинальный формат
    const optimizedPath = filePath;
    if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
        .toFile(filePath + '.tmp');
    } else if (ext === '.png') {
      await image
        .png({ quality: QUALITY, compressionLevel: 9, progressive: true })
        .toFile(filePath + '.tmp');
    }

    // Заменяем файл оптимизированной версией
    if (existsSync(filePath + '.tmp')) {
      copyFileSync(filePath + '.tmp', filePath);
      await Bun.file(filePath + '.tmp').text().then(() => {
        // Удаляем временный файл через Bun
        require('fs').unlinkSync(filePath + '.tmp');
      });
    }

    const optimizedSize = await getFileSize(filePath);

    // Создаем WebP версию
    const webpPath = join(dirName, `${baseName}.webp`);
    await sharp(originalPath)
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(webpPath);

    const webpSize = await getFileSize(webpPath);

    // Создаем @2x версию (уменьшаем на 50% для создания @1x)
    const width = metadata.width;
    const height = metadata.height;

    // @1x версия (50% от оригинала)
    const standardPath = join(dirName, `${baseName}@1x${ext}`);
    await sharp(originalPath)
      .resize(Math.round(width! / 2), Math.round(height! / 2), {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFile(standardPath);

    // @2x версия (оригинальный размер)
    const retinaPath = join(dirName, `${baseName}@2x${ext}`);
    copyFileSync(filePath, retinaPath);

    // @1x WebP
    const webpStandardPath = join(dirName, `${baseName}@1x.webp`);
    await sharp(originalPath)
      .resize(Math.round(width! / 2), Math.round(height! / 2), {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(webpStandardPath);

    // @2x WebP
    const webpRetinaPath = join(dirName, `${baseName}@2x.webp`);
    copyFileSync(webpPath, webpRetinaPath);

    const savings = originalSize - optimizedSize;
    const savingsPercent = (savings / originalSize) * 100;

    return {
      originalSize,
      optimizedSize,
      webpSize,
      savings,
      savingsPercent,
    };
  } catch (error) {
    console.error(`${colors.yellow}❌ Ошибка при обработке ${basename(filePath)}:${colors.reset}`, error);
    return null;
  }
}

async function processDirectory(dir: string): Promise<void> {
  if (!existsSync(dir)) {
    console.log(`${colors.yellow}⚠️  Директория не найдена: ${dir}${colors.reset}`);
    return;
  }

  const files = readdirSync(dir, { withFileTypes: true });
  const stats: OptimizationStats[] = [];

  for (const file of files) {
    const fullPath = join(dir, file.name);

    if (file.isDirectory()) {
      // Рекурсивно обрабатываем поддиректории (кроме .original)
      if (file.name !== '.original') {
        await processDirectory(fullPath);
      }
    } else if (file.isFile()) {
      const result = await optimizeImage(fullPath);
      if (result) {
        stats.push(result);
        
        const originalStr = await formatBytes(result.originalSize);
        const optimizedStr = await formatBytes(result.optimizedSize);
        const webpStr = await formatBytes(result.webpSize);
        const savingsStr = await formatBytes(result.savings);
        
        console.log(`  ${colors.green}✓${colors.reset} Оригинал: ${originalStr}`);
        console.log(`  ${colors.green}✓${colors.reset} Оптимизировано: ${optimizedStr} ${colors.gray}(-${result.savingsPercent.toFixed(1)}%)${colors.reset}`);
        console.log(`  ${colors.green}✓${colors.reset} WebP: ${webpStr} ${colors.gray}(-${((1 - result.webpSize / result.originalSize) * 100).toFixed(1)}%)${colors.reset}`);
        console.log(`  ${colors.cyan}💾 Сэкономлено: ${savingsStr}${colors.reset}\n`);
      }
    }
  }

  // Итоговая статистика
  if (stats.length > 0) {
    const totalOriginal = stats.reduce((sum, s) => sum + s.originalSize, 0);
    const totalOptimized = stats.reduce((sum, s) => sum + s.optimizedSize, 0);
    const totalWebp = stats.reduce((sum, s) => sum + s.webpSize, 0);
    const totalSavings = totalOriginal - totalOptimized;
    const totalSavingsPercent = (totalSavings / totalOriginal) * 100;

    console.log(`\n${colors.cyan}═══════════════════════════════════════${colors.reset}`);
    console.log(`${colors.green}📊 Итоговая статистика${colors.reset}`);
    console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}`);
    console.log(`Обработано файлов: ${stats.length}`);
    console.log(`Исходный размер: ${await formatBytes(totalOriginal)}`);
    console.log(`После оптимизации: ${await formatBytes(totalOptimized)} ${colors.gray}(-${totalSavingsPercent.toFixed(1)}%)${colors.reset}`);
    console.log(`WebP версии: ${await formatBytes(totalWebp)} ${colors.gray}(-${((1 - totalWebp / totalOriginal) * 100).toFixed(1)}%)${colors.reset}`);
    console.log(`${colors.green}💰 Сэкономлено: ${await formatBytes(totalSavings)}${colors.reset}`);
    console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}\n`);
  }
}

// Главная функция
async function main() {
  console.log(`\n${colors.cyan}🚀 Оптимизация изображений MUSE${colors.reset}\n`);
  console.log(`${colors.gray}Директория: ${IMAGES_DIR}${colors.reset}`);
  console.log(`${colors.gray}JPEG качество: ${QUALITY}%${colors.reset}`);
  console.log(`${colors.gray}WebP качество: ${WEBP_QUALITY}%${colors.reset}\n`);

  await processDirectory(IMAGES_DIR);

  console.log(`${colors.green}✨ Оптимизация завершена!${colors.reset}\n`);
  console.log(`${colors.yellow}💡 Теперь обновите код для использования WebP:${colors.reset}`);
  console.log(`${colors.gray}   <picture>`);
  console.log(`     <source srcset="image@1x.webp 1x, image@2x.webp 2x" type="image/webp" />`);
  console.log(`     <img src="image.jpg" srcset="image@1x.jpg 1x, image@2x.jpg 2x" />`);
  console.log(`   </picture>${colors.reset}\n`);
}

main().catch(console.error);

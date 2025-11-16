#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
GRAY='\033[0;90m'
NC='\033[0m' # No Color

echo -e "\n${CYAN}🚀 Загрузка изображений для проекта MUSE${NC}\n"

# Создаем структуру папок
echo -e "${BLUE}📁 Создание структуры папок...${NC}"
mkdir -p public/images/{hero,events,muse-tv,about}
echo -e "${GREEN}✓${NC} Папки созданы\n"

# Функция для загрузки с прогресс-баром
download_image() {
  local url=$1
  local output=$2
  local name=$3
  
  echo -e "${BLUE}⬇️  Загружаю${NC} ${name}${GRAY} → ${output}${NC}"
  
  if curl -L --progress-bar "$url" -o "$output" 2>&1 | \
     grep --line-buffered -oP '\d+\.\d+' | \
     awk '{printf "\r  Progress: %.1f%%", $1}'; then
    echo -e "\r${GREEN}  ✓ Загружено${NC} ${name}"
  else
    echo -e "\r${YELLOW}  ⚠️  Ошибка загрузки${NC} ${name}"
  fi
}

# Events images
echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}📸 Events страница${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

download_image \
  "https://cdn.poehali.dev/files/16b2656a-d7ad-4d09-996c-22fdd08827b8.jpg" \
  "public/images/events/mobile-bg.jpg" \
  "Mobile Background"

download_image \
  "https://cdn.poehali.dev/files/f730e14d-c58a-4ac4-9b0a-d2d7c2378616.jpg" \
  "public/images/events/left.jpg" \
  "Left Hero"

download_image \
  "https://cdn.poehali.dev/files/4a9523f3-5fc0-400f-b4c7-6dd69bdbd217.jpg" \
  "public/images/events/right.jpg" \
  "Right Hero"

# MUSE TV images
echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}📺 MUSE TV страница${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

download_image \
  "https://cdn.poehali.dev/files/0a4d076c-a60c-4a0a-9bf1-eab254a3f261.png" \
  "public/images/muse-tv/background.png" \
  "Background"

# About section
echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}👤 About секция${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

download_image \
  "https://cdn.poehali.dev/files/f8cbb77a-0ff7-4aa5-b210-4095cac6db26.jpg" \
  "public/images/about/founder.jpg" \
  "Founder"

# Итоговая статистика
echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ Загрузка завершена!${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Подсчет размера
TOTAL_SIZE=$(du -sh public/images | cut -f1)
FILE_COUNT=$(find public/images -type f ! -name "*.svg" ! -name "*.md" ! -name ".gitkeep" | wc -l)

echo -e "${BLUE}📊 Статистика:${NC}"
echo -e "  • Файлов загружено: ${FILE_COUNT}"
echo -e "  • Общий размер: ${TOTAL_SIZE}"
echo -e "\n${YELLOW}💡 Следующий шаг:${NC}"
echo -e "  Запустите оптимизацию: ${CYAN}bun run scripts/optimize-images.ts${NC}\n"

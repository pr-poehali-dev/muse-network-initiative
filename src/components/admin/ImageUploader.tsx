/**
 * ImageUploader Component
 * Позволяет загружать изображения напрямую в проект
 */

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  maxSizeMB?: number;
  accept?: string;
  label?: string;
  currentImage?: string;
}

export default function ImageUploader({
  onImageUploaded,
  maxSizeMB = 10,
  accept = 'image/jpeg,image/jpg,image/png,image/webp,image/gif',
  label = 'Загрузить изображение',
  currentImage,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    // Проверка размера
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`Файл слишком большой. Максимум ${maxSizeMB}MB`);
      return;
    }

    // Проверка типа
    const allowedTypes = accept.split(',').map(t => t.trim());
    if (!allowedTypes.includes(file.type)) {
      toast.error('Неподдерживаемый формат файла');
      return;
    }

    setUploading(true);

    try {
      // Показываем превью
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Генерируем имя файла
      const ext = file.name.split('.').pop() || 'jpg';
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(7);
      const filename = `${timestamp}-${randomStr}.${ext}`;
      const url = `/images/uploads/${filename}`;

      // Сохраняем файл локально (скачивание)
      await saveFileLocally(filename, file);

      // Уведомляем родителя
      onImageUploaded(url);
      
      toast.success('Изображение подготовлено!', {
        description: `Переместите ${filename} в public/images/uploads/`,
        duration: 8000,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Ошибка обработки изображения');
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const saveFileLocally = async (filename: string, file: File) => {
    // Создаем ссылку для скачивания
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    // Небольшая задержка перед очисткой
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      <Card
        className={`border-2 border-dashed transition-all cursor-pointer ${
          dragOver
            ? 'border-[#d4af37] bg-[#d4af37]/10'
            : 'border-[#d4af37]/30 hover:border-[#d4af37]/60'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-8">
          {preview ? (
            <div className="space-y-4">
              <div className="relative aspect-video bg-black/5 rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                disabled={uploading}
              >
                <Icon name="Upload" className="mr-2" size={16} />
                Заменить изображение
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d4af37]/10">
                <Icon name="Upload" className="text-[#d4af37]" size={32} />
              </div>
              <div>
                <p className="text-lg font-semibold mb-1">{label}</p>
                <p className="text-sm text-muted-foreground">
                  Перетащите файл сюда или нажмите для выбора
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Максимум {maxSizeMB}MB • JPEG, PNG, WebP, GIF
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#d4af37]"></div>
          Загрузка изображения...
        </div>
      )}
    </div>
  );
}
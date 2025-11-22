/**
 * OptimizedImage Component
 * Автоматически использует WebP с fallback на JPG/PNG
 * Поддерживает responsive изображения (@1x, @2x)
 */

import { ImgHTMLAttributes } from 'react';
import { getLocalImagePath, getImageSrcSet, getWebPPath, getWebPSrcSet } from '@/utils/imageLoader';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src: string | undefined | null;
  alt: string;
  /** Использовать ли WebP формат (по умолчанию true) */
  useWebP?: boolean;
  /** Использовать ли responsive варианты @1x/@2x (по умолчанию true) */
  useResponsive?: boolean;
  /** Приоритет загрузки (для критичных изображений) */
  fetchpriority?: 'high' | 'low' | 'auto';
}

/**
 * Оптимизированный компонент изображения
 * 
 * @example
 * ```tsx
 * <OptimizedImage 
 *   src="https://cdn.poehali.dev/files/abc123.jpg"
 *   alt="Description"
 *   className="w-full h-full object-cover"
 * />
 * ```
 * 
 * Результат:
 * ```html
 * <picture>
 *   <source srcset="/images/events/left@1x.webp 1x, /images/events/left@2x.webp 2x" type="image/webp" />
 *   <img src="/images/events/left.jpg" srcset="/images/events/left@1x.jpg 1x, /images/events/left@2x.jpg 2x" alt="Description" />
 * </picture>
 * ```
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  useWebP = true, 
  useResponsive = true,
  loading = 'lazy',
  decoding = 'async',
  fetchpriority = 'auto',
  ...props 
}: OptimizedImageProps) {
  const localPath = getLocalImagePath(src);
  
  // Если нет пути или это SVG - используем обычный img
  if (!localPath || localPath.endsWith('.svg')) {
    return (
      <img 
        src={localPath} 
        alt={alt} 
        loading={loading}
        decoding={decoding}
        {...(fetchpriority !== 'auto' && { fetchpriority })}
        {...props} 
      />
    );
  }

  // Если это внешний URL (CDN) - используем обычный img
  if (localPath.startsWith('http')) {
    return (
      <img 
        src={localPath} 
        alt={alt} 
        loading={loading}
        decoding={decoding}
        {...(fetchpriority !== 'auto' && { fetchpriority })}
        {...props} 
      />
    );
  }

  // Формируем srcSet для изображений
  const imgSrcSet = useResponsive ? getImageSrcSet(src) : undefined;
  const webpPath = useWebP ? getWebPPath(src) : undefined;
  const webpSrcSet = useWebP && useResponsive ? getWebPSrcSet(src) : undefined;

  // Если нужен WebP - используем <picture>
  if (useWebP && webpPath) {
    return (
      <picture>
        {/* WebP версия с srcSet для Retina */}
        {webpSrcSet && (
          <source 
            srcSet={webpSrcSet} 
            type="image/webp" 
          />
        )}
        
        {/* WebP версия без srcSet */}
        {!webpSrcSet && (
          <source 
            srcSet={webpPath} 
            type="image/webp" 
          />
        )}
        
        {/* Fallback на оригинальный формат */}
        <img 
          src={localPath}
          srcSet={imgSrcSet}
          alt={alt}
          loading={loading}
          decoding={decoding}
          {...(fetchpriority !== 'auto' && { fetchpriority })}
          {...props}
        />
      </picture>
    );
  }

  // Если не нужен WebP - обычный img с srcSet
  return (
    <img 
      src={localPath}
      srcSet={imgSrcSet}
      alt={alt}
      loading={loading}
      decoding={decoding}
      {...(fetchpriority !== 'auto' && { fetchpriority })}
      {...props}
    />
  );
}
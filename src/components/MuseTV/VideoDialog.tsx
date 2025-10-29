import { Dialog, DialogContent } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { VideoContent, VideoMetadata, formatDuration, formatViews } from '@/data/museTvData';

interface VideoDialogProps {
  video: VideoContent | null;
  metadata?: VideoMetadata | null;
  onClose: () => void;
}

export const VideoDialog = ({ video, metadata, onClose }: VideoDialogProps) => {
  if (!video) return null;

  const isRutube = video.vkEmbed?.includes('rutube.ru');
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  let videoUrl = video.vkEmbed;
  if (isRutube) {
    const separator = videoUrl.includes('?') ? '&' : '?';
    videoUrl = `${videoUrl}${separator}autoplay=true&t=0`;
    if (isMobile) {
      videoUrl += '&bmstart=true';
    }
  } else {
    const separator = videoUrl.includes('?') ? '&' : '?';
    videoUrl = `${videoUrl}${separator}autoplay=1`;
  }

  return (
    <Dialog open={!!video} onOpenChange={onClose}>
      <DialogContent className="max-w-full w-full h-full md:max-w-[95vw] md:w-[95vw] md:h-auto p-0 bg-black border-0 md:rounded-lg overflow-y-auto">
        <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6 min-h-full md:min-h-0">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {video.vkEmbed && (
              <iframe
                src={videoUrl}
                className="absolute inset-0 w-full h-full md:rounded-lg"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#d4af37] mb-2">
                {metadata?.title || video.title}
              </h2>
              <div className="flex items-center justify-between text-white/60 text-sm">
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={14} className="text-[#b8953d]/60" />
                  {metadata?.duration 
                    ? formatDuration(metadata.duration)
                    : video.duration
                  }
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Eye" size={14} className="text-[#b8953d]/60" />
                  {metadata?.views 
                    ? formatViews(metadata.views)
                    : video.views
                  } просмотров
                </span>
              </div>
            </div>

            {metadata?.description && (
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-lg font-semibold text-white mb-2">Описание</h3>
                <p className="text-white/70 leading-relaxed whitespace-pre-line">
                  {metadata.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

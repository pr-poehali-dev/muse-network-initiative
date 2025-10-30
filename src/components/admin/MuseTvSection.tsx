import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface MuseTvSectionProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const MuseTvSection = ({ isLoading, setIsLoading }: MuseTvSectionProps) => {
  const { toast } = useToast();
  const [videos, setVideos] = useState<any[]>([]);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  
  const [videoFormData, setVideoFormData] = useState({
    video_id: '',
    title: '',
    type: 'Подкаст',
    url: '',
    embed_url: '',
    thumbnail_url: '',
    display_order: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/88de6a19-94ff-4811-a220-47e387f88968');
      const data = await response.json();
      setVideos(data.videos || []);
    } catch (error) {
      console.error('Failed to load MUSE TV data:', error);
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = editingVideo ? 'PUT' : 'POST';
      const body = editingVideo
        ? { resource: 'video', id: editingVideo.id, data: videoFormData }
        : { resource: 'video', data: videoFormData };

      const response = await fetch('https://functions.poehali.dev/88de6a19-94ff-4811-a220-47e387f88968', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast({
          title: 'Успешно!',
          description: editingVideo ? 'Видео обновлено' : 'Видео добавлено',
        });
        resetVideoForm();
        loadData();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить видео',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };



  const handleDeleteVideo = async (id: number) => {
    if (!confirm('Удалить это видео?')) return;
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/88de6a19-94ff-4811-a220-47e387f88968', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resource: 'video', id })
      });

      if (response.ok) {
        toast({ title: 'Успешно!', description: 'Видео удалено' });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить видео', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };



  const resetVideoForm = () => {
    setVideoFormData({ video_id: '', title: '', type: 'Подкаст', url: '', embed_url: '', thumbnail_url: '', display_order: 0 });
    setEditingVideo(null);
    setShowVideoForm(false);
  };



  const handleEditVideo = (video: any) => {
    setVideoFormData(video);
    setEditingVideo(video);
    setShowVideoForm(true);
  };



  return (
    <>
      <div className="mb-8">
        <Button
          onClick={() => setShowVideoForm(!showVideoForm)}
          className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          {showVideoForm ? 'Отменить' : 'Добавить видео'}
        </Button>
      </div>

      {showVideoForm && (
        <Card className="bg-[#1a1a1a] border-[#d4af37]/20 mb-8">
          <CardHeader>
            <CardTitle className="text-[#d4af37]">{editingVideo ? 'Редактировать видео' : 'Новое видео'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVideoSubmit} className="space-y-4">
              <div>
                <Label className="text-white/80">Video ID</Label>
                <Input
                  value={videoFormData.video_id}
                  onChange={(e) => setVideoFormData({ ...videoFormData, video_id: e.target.value })}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-white/80">Название (опционально)</Label>
                <Input
                  value={videoFormData.title}
                  onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">URL видео</Label>
                <Input
                  value={videoFormData.url}
                  onChange={(e) => setVideoFormData({ ...videoFormData, url: e.target.value })}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-white/80">Embed URL</Label>
                <Input
                  value={videoFormData.embed_url}
                  onChange={(e) => setVideoFormData({ ...videoFormData, embed_url: e.target.value })}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-white/80">URL превью-изображения (опционально)</Label>
                <div className="space-y-2">
                  <Input
                    value={videoFormData.thumbnail_url}
                    onChange={(e) => setVideoFormData({ ...videoFormData, thumbnail_url: e.target.value })}
                    className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-white/40 text-xs">
                    Вставьте URL изображения или используйте загруженное изображение с CDN
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-white/80">Порядок отображения</Label>
                <Input
                  type="number"
                  value={videoFormData.display_order}
                  onChange={(e) => setVideoFormData({ ...videoFormData, display_order: parseInt(e.target.value) })}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? 'Сохранение...' : (editingVideo ? 'Обновить' : 'Добавить')}
              </Button>
              {editingVideo && (
                <Button
                  type="button"
                  onClick={resetVideoForm}
                  variant="outline"
                  className="ml-2"
                >
                  Отменить
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      )}



      <div className="grid gap-6">
        <Card className="bg-[#1a1a1a] border-[#d4af37]/20">
          <CardHeader>
            <CardTitle className="text-[#d4af37]">Видео MUSE TV</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {videos.length === 0 ? (
                <p className="text-white/60 text-center py-8">Нет добавленных видео</p>
              ) : (
                videos.map((video) => (
                  <div key={video.id} className="bg-[#0a0a0a] border border-[#d4af37]/20 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        {video.thumbnail_url && (
                          <img src={video.thumbnail_url} alt={video.title || 'Video thumbnail'} className="w-32 h-20 object-cover rounded" />
                        )}
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{video.title || `Video ID: ${video.video_id}`}</h3>
                          <p className="text-white/60 text-sm mt-1">ID: {video.video_id}</p>
                          <p className="text-white/60 text-sm">Порядок: {video.display_order}</p>
                          <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-[#d4af37] text-sm hover:underline">
                            Смотреть на Rutube
                          </a>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditVideo(video)}
                          className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteVideo(video.id)}
                          className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>


      </div>
    </>
  );
};

export default MuseTvSection;
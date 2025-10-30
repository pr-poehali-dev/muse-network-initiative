import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface VideoItem {
  id: number;
  title: string;
  description: string;
  kinescope_id: string;
  thumbnail_url?: string;
  display_order: number;
}

interface VideoGallerySectionProps {
  onDataChange?: () => void;
}

const VideoGallerySection = ({ onDataChange }: VideoGallerySectionProps) => {
  const { toast } = useToast();
  const [items, setItems] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<VideoItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    kinescope_id: '',
    thumbnail_url: '',
    display_order: 0
  });

  useEffect(() => {
    loadVideoGallery();
  }, []);

  const loadVideoGallery = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/5025e5fe-44cb-42e7-808c-9a1f6a53de0c');
      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Failed to load video gallery:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить видеогалерею',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = 'https://functions.poehali.dev/5025e5fe-44cb-42e7-808c-9a1f6a53de0c';
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem 
        ? { ...formData, id: editingItem.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast({
          title: 'Успешно!',
          description: editingItem ? 'Видео обновлено' : 'Видео добавлено',
        });
        resetForm();
        loadVideoGallery();
        onDataChange?.();
      } else {
        throw new Error(data.error || 'Ошибка сохранения');
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

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить это видео?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`https://functions.poehali.dev/5025e5fe-44cb-42e7-808c-9a1f6a53de0c?id=${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast({
          title: 'Успешно!',
          description: 'Видео удалено'
        });
        loadVideoGallery();
        onDataChange?.();
      } else {
        throw new Error(data.error || 'Ошибка удаления');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить видео',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: VideoItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      kinescope_id: item.kinescope_id,
      thumbnail_url: item.thumbnail_url || '',
      display_order: item.display_order
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      kinescope_id: '',
      thumbnail_url: '',
      display_order: 0
    });
    setEditingItem(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Видеогалерея</h2>
        <Button onClick={() => setShowForm(!showForm)} disabled={isLoading}>
          <Icon name={showForm ? 'X' : 'Plus'} className="mr-2" size={16} />
          {showForm ? 'Отмена' : 'Добавить видео'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? 'Редактировать видео' : 'Новое видео'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Название</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Название видео"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Описание видео"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="kinescope_id">Kinescope ID</Label>
                <Input
                  id="kinescope_id"
                  value={formData.kinescope_id}
                  onChange={(e) => setFormData({ ...formData, kinescope_id: e.target.value })}
                  placeholder="Например: 6DNFMoaf85akazKot4D3v7"
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  ID видео из Kinescope (из URL после /embed/)
                </p>
              </div>

              <div>
                <Label htmlFor="display_order">Порядок отображения</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {editingItem ? 'Обновить' : 'Добавить'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="aspect-[9/16] mb-3 bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://kinescope.io/embed/${item.kinescope_id}?preload=metadata&controls=0&ui=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="preload"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{item.title || 'Без названия'}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{item.kinescope_id}</p>
                  </div>
                </div>
                {item.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                )}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Icon name="Pencil" size={14} className="mr-1" />
                    Редактировать
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Icon name="Trash2" size={14} className="mr-1" />
                    Удалить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          Нет видео в галерее
        </div>
      )}
    </div>
  );
};

export default VideoGallerySection;

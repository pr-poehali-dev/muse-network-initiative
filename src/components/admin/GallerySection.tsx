import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  media_url: string;
  media_type: 'image' | 'video';
  thumbnail_url?: string;
  span_class: string;
  display_order: number;
}

interface GallerySectionProps {
  onDataChange?: () => void;
}

const GallerySection = ({ onDataChange }: GallerySectionProps) => {
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media_url: '',
    media_type: 'image' as 'image' | 'video',
    thumbnail_url: '',
    span_class: 'col-span-1 row-span-1',
    display_order: 0
  });

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/cee4a73f-f829-4117-87aa-9624320944a3');
      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Failed to load gallery items:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить галерею',
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
      const url = 'https://functions.poehali.dev/cee4a73f-f829-4117-87aa-9624320944a3';
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
          description: editingItem ? 'Элемент обновлен' : 'Элемент добавлен',
        });
        resetForm();
        loadGalleryItems();
        onDataChange?.();
      } else {
        throw new Error(data.error || 'Ошибка сохранения');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить элемент',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этот элемент?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`https://functions.poehali.dev/cee4a73f-f829-4117-87aa-9624320944a3?id=${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast({
          title: 'Успешно!',
          description: 'Элемент удален'
        });
        loadGalleryItems();
        onDataChange?.();
      } else {
        throw new Error(data.error || 'Ошибка удаления');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить элемент',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      media_url: item.media_url,
      media_type: item.media_type,
      thumbnail_url: item.thumbnail_url || '',
      span_class: item.span_class,
      display_order: item.display_order
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      media_url: '',
      media_type: 'image',
      thumbnail_url: '',
      span_class: 'col-span-1 row-span-1',
      display_order: 0
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const spanOptions = [
    { value: 'col-span-1 row-span-1', label: '1×1 (маленький)' },
    { value: 'col-span-2 row-span-1', label: '2×1 (широкий)' },
    { value: 'col-span-1 row-span-2', label: '1×2 (высокий)' },
    { value: 'col-span-2 row-span-2', label: '2×2 (большой)' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Галерея</h2>
        <Button onClick={() => setShowForm(!showForm)} disabled={isLoading}>
          <Icon name={showForm ? 'X' : 'Plus'} className="mr-2" size={16} />
          {showForm ? 'Отмена' : 'Добавить элемент'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? 'Редактировать элемент' : 'Новый элемент'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="media_type">Тип</Label>
                <Select
                  value={formData.media_type}
                  onValueChange={(value: 'image' | 'video') => setFormData({ ...formData, media_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Фото</SelectItem>
                    <SelectItem value="video">Видео</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Название</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Название элемента"
                />
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Описание"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="media_url">URL {formData.media_type === 'image' ? 'фото' : 'видео'} *</Label>
                <Input
                  id="media_url"
                  value={formData.media_url}
                  onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                  placeholder="https://..."
                  required
                />
              </div>

              {formData.media_type === 'video' && (
                <div>
                  <Label htmlFor="thumbnail_url">URL превью (для видео)</Label>
                  <Input
                    id="thumbnail_url"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              )}

              <div>
                <Label htmlFor="span_class">Размер в сетке</Label>
                <Select
                  value={formData.span_class}
                  onValueChange={(value) => setFormData({ ...formData, span_class: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {spanOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <div className="aspect-video mb-3 bg-muted rounded-lg overflow-hidden">
                {item.media_type === 'image' ? (
                  <img src={item.media_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black/10">
                    <Icon name="Video" size={48} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{item.title || 'Без названия'}</h3>
                    <p className="text-sm text-muted-foreground">{item.media_type === 'image' ? 'Фото' : 'Видео'}</p>
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    {spanOptions.find(o => o.value === item.span_class)?.label || item.span_class}
                  </span>
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
          Нет элементов в галерее
        </div>
      )}
    </div>
  );
};

export default GallerySection;

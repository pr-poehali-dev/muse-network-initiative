import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface PartnersSectionProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const convertYandexDiskUrl = async (url: string): Promise<string> => {
  if (url.includes('disk.yandex.ru') || url.includes('yadi.sk')) {
    try {
      console.log('Converting Yandex.Disk URL:', url);
      const response = await fetch(`https://functions.poehali.dev/feae6b7c-94fa-43c4-a9a0-34526f6664d9?public_url=${encodeURIComponent(url)}`);
      const data = await response.json();
      console.log('Response from backend:', data);
      if (data.direct_url) {
        console.log('Direct URL received:', data.direct_url);
        return data.direct_url;
      }
    } catch (error) {
      console.error('Failed to convert Yandex.Disk URL:', error);
    }
  }
  return url;
};

const PartnersSection = ({ isLoading, setIsLoading }: PartnersSectionProps) => {
  const { toast } = useToast();
  const [partners, setPartners] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const [isConverting, setIsConverting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    website_url: '',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/88f10ed9-e5e5-4d29-a85b-c8cb3a62b921');
      const data = await response.json();
      setPartners(data.partners || []);
    } catch (error) {
      console.error('Failed to load partners:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = editingPartner ? 'PUT' : 'POST';
      const body = editingPartner
        ? { id: editingPartner.id, data: formData }
        : { data: formData };

      const response = await fetch('https://functions.poehali.dev/88f10ed9-e5e5-4d29-a85b-c8cb3a62b921', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast({
          title: 'Успешно!',
          description: editingPartner ? 'Партнер обновлен' : 'Партнер добавлен',
        });
        resetForm();
        loadPartners();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить партнера',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этого партнера?')) return;
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/88f10ed9-e5e5-4d29-a85b-c8cb3a62b921', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        toast({ title: 'Успешно!', description: 'Партнер удален' });
        loadPartners();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить партнера', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', logo_url: '', website_url: '', display_order: 0, is_active: true });
    setEditingPartner(null);
    setShowForm(false);
  };

  const handleEdit = (partner: any) => {
    setFormData(partner);
    setEditingPartner(partner);
    setShowForm(true);
  };

  return (
    <>
      <div className="mb-8">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          {showForm ? 'Отменить' : 'Добавить партнера'}
        </Button>
      </div>

      {showForm && (
        <Card className="bg-[#1a1a1a] border-[#d4af37]/20 mb-8">
          <CardHeader>
            <CardTitle className="text-[#d4af37]">{editingPartner ? 'Редактировать партнера' : 'Новый партнер'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-white/80">Название</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                  required
                />
              </div>
              <div>
                <Label className="text-white/80">URL логотипа</Label>
                <Input
                  value={formData.logo_url}
                  onChange={async (e) => {
                    const url = e.target.value;
                    
                    if (url.includes('disk.yandex.ru') || url.includes('yadi.sk')) {
                      setIsConverting(true);
                      const directUrl = await convertYandexDiskUrl(url);
                      setFormData(prev => ({ ...prev, logo_url: directUrl }));
                      setIsConverting(false);
                      
                      if (directUrl !== url) {
                        toast({
                          title: 'Ссылка конвертирована',
                          description: 'Яндекс.Диск ссылка преобразована в прямую ссылку',
                        });
                      }
                    } else {
                      setFormData(prev => ({ ...prev, logo_url: url }));
                    }
                  }}
                  placeholder="https://... или ссылка с Яндекс.Диска"
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                  required
                  disabled={isConverting}
                />
                {isConverting && (
                  <p className="text-xs text-yellow-500 mt-2 animate-pulse">
                    ⏳ Получаем прямую ссылку с Яндекс.Диска...
                  </p>
                )}
                <p className="text-xs text-white/50 mt-2">
                  💡 Поддерживаются прямые ссылки и публичные ссылки с Яндекс.Диска
                </p>
                <div className="mt-2 p-2 bg-blue-900/20 border border-blue-600/30 rounded">
                  <p className="text-xs text-blue-400 mb-1">Яндекс.Диск:</p>
                  <p className="text-xs text-white/60">1. Загрузите изображение на Яндекс.Диск</p>
                  <p className="text-xs text-white/60">2. Нажмите "Поделиться" → "Скопировать ссылку"</p>
                  <p className="text-xs text-white/60">3. Вставьте ссылку сюда (автоматически конвертируется)</p>
                </div>
                {formData.logo_url && (
                  <div className="mt-3 p-3 bg-[#0a0a0a] border border-white/10 rounded">
                    <img src={formData.logo_url} alt="Preview" className="h-16 object-contain" />
                  </div>
                )}
              </div>
              <div>
                <Label className="text-white/80">Сайт (опционально)</Label>
                <Input
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://..."
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Порядок отображения</Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#d4af37] hover:bg-[#b8953d] text-black font-bold"
                >
                  {editingPartner ? 'Обновить' : 'Добавить'}
                </Button>
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="outline"
                  className="border-[#d4af37]/20 text-white"
                >
                  Отменить
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {partners.map((partner) => (
          <Card key={partner.id} className="bg-[#1a1a1a] border-[#d4af37]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={partner.logo_url} 
                    alt={partner.name}
                    className="h-12 w-auto object-contain bg-white/5 p-2 rounded"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{partner.name}</h3>
                    {partner.website_url && (
                      <a 
                        href={partner.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#d4af37] text-sm hover:underline"
                      >
                        {partner.website_url}
                      </a>
                    )}
                    <p className="text-white/50 text-sm">Порядок: {partner.display_order}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(partner)}
                    variant="outline"
                    size="sm"
                    className="border-[#d4af37]/20 text-white"
                  >
                    <Icon name="Pencil" size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDelete(partner.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default PartnersSection;
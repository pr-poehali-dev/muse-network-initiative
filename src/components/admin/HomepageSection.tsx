import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { convertCloudUrl, isCloudUrl, getServiceName } from '@/utils/imageUrlConverter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HomepageSectionProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const HomepageSection = ({ isLoading, setIsLoading }: HomepageSectionProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState<any>({});
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/15067ca2-df63-4e81-8c9f-2fb93d2daa95');
      const data = await response.json();
      setContent(data.content || {});
    } catch (error) {
      console.error('Failed to load homepage content:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить контент',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSection = async (section: string, sectionContent: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/15067ca2-df63-4e81-8c9f-2fb93d2daa95', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, content: sectionContent }),
      });

      if (response.ok) {
        toast({
          title: 'Сохранено',
          description: 'Раздел успешно обновлен',
        });
        loadContent();
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Failed to update section:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить изменения',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (value: string, callback: (url: string) => void) => {
    if (isCloudUrl(value)) {
      const directUrl = await convertCloudUrl(value);
      callback(directUrl);
      if (directUrl !== value) {
        toast({
          title: 'Ссылка конвертирована',
          description: `${getServiceName(value)} ссылка преобразована в прямую ссылку`,
        });
      }
    } else {
      callback(value);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#8b7355] flex items-center gap-3">
          <Icon name="Home" size={28} />
          Редактор главной страницы
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeSection} onValueChange={setActiveSection}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2 bg-[#0a0a0a] p-2">
            <TabsTrigger value="hero">Баннер</TabsTrigger>
            <TabsTrigger value="statistics">Статистика</TabsTrigger>
            <TabsTrigger value="about">О клубе</TabsTrigger>
            <TabsTrigger value="values">Ценности</TabsTrigger>
            <TabsTrigger value="events">События</TabsTrigger>
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
            <TabsTrigger value="experts">Эксперты</TabsTrigger>
            <TabsTrigger value="join_cta">Призыв</TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero" className="space-y-4 mt-6">
            <h3 className="text-white text-lg font-semibold">Героический баннер</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-white/80">Заголовок</Label>
                <Input
                  value={content.hero?.title || ''}
                  onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Слоган</Label>
                <Input
                  value={content.hero?.tagline || ''}
                  onChange={(e) => setContent({...content, hero: {...content.hero, tagline: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Описание</Label>
                <Textarea
                  value={content.hero?.description || ''}
                  onChange={(e) => setContent({...content, hero: {...content.hero, description: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-white/80">Левое изображение</Label>
                  <Input
                    value={content.hero?.image_left || ''}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setContent({...content, hero: {...content.hero, image_left: newValue}});
                      handleImageChange(newValue, (url) => {
                        if (url !== newValue) {
                          setContent({...content, hero: {...content.hero, image_left: url}});
                        }
                      });
                    }}
                    className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                    placeholder="https://... или ImgBB"
                  />
                  <p className="text-xs text-white/50 mt-1">💡 ImgBB, Google Drive</p>
                </div>
                <div>
                  <Label className="text-white/80">Центральное изображение</Label>
                  <Input
                    value={content.hero?.image_center || ''}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setContent({...content, hero: {...content.hero, image_center: newValue}});
                      handleImageChange(newValue, (url) => {
                        if (url !== newValue) {
                          setContent({...content, hero: {...content.hero, image_center: url}});
                        }
                      });
                    }}
                    className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                    placeholder="https://... или ImgBB"
                  />
                  <p className="text-xs text-white/50 mt-1">💡 ImgBB, Google Drive</p>
                </div>
                <div>
                  <Label className="text-white/80">Правое изображение</Label>
                  <Input
                    value={content.hero?.image_right || ''}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setContent({...content, hero: {...content.hero, image_right: newValue}});
                      handleImageChange(newValue, (url) => {
                        if (url !== newValue) {
                          setContent({...content, hero: {...content.hero, image_right: url}});
                        }
                      });
                    }}
                    className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                    placeholder="https://... или ImgBB"
                  />
                  <p className="text-xs text-white/50 mt-1">💡 ImgBB, Google Drive</p>
                </div>
              </div>
              <Button
                onClick={() => updateSection('hero', content.hero)}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold"
              >
                <Icon name="Save" size={20} className="mr-2" />
                Сохранить баннер
              </Button>
            </div>
          </TabsContent>

          {/* Statistics Section */}
          <TabsContent value="statistics" className="space-y-4 mt-6">
            <h3 className="text-white text-lg font-semibold">Статистика</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-white/80">Заголовок секции</Label>
                <Input
                  value={content.statistics?.title || ''}
                  onChange={(e) => setContent({...content, statistics: {...content.statistics, title: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              {(content.statistics?.stats || []).map((stat: any, index: number) => (
                <Card key={index} className="bg-[#0a0a0a] border-[#d4af37]/20">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white/80">Значение</Label>
                        <Input
                          type="number"
                          value={stat.value || ''}
                          onChange={(e) => {
                            const newStats = [...content.statistics.stats];
                            newStats[index] = {...stat, value: parseInt(e.target.value) || 0};
                            setContent({...content, statistics: {...content.statistics, stats: newStats}});
                          }}
                          className="bg-black border-[#d4af37]/20 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white/80">Подпись</Label>
                        <Input
                          value={stat.label || ''}
                          onChange={(e) => {
                            const newStats = [...content.statistics.stats];
                            newStats[index] = {...stat, label: e.target.value};
                            setContent({...content, statistics: {...content.statistics, stats: newStats}});
                          }}
                          className="bg-black border-[#d4af37]/20 text-white"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={() => updateSection('statistics', content.statistics)}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold"
              >
                <Icon name="Save" size={20} className="mr-2" />
                Сохранить статистику
              </Button>
            </div>
          </TabsContent>

          {/* About Section */}
          <TabsContent value="about" className="space-y-4 mt-6">
            <h3 className="text-white text-lg font-semibold">О клубе</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-white/80">Заголовок</Label>
                <Input
                  value={content.about?.title || ''}
                  onChange={(e) => setContent({...content, about: {...content.about, title: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Подзаголовок</Label>
                <Input
                  value={content.about?.subtitle || ''}
                  onChange={(e) => setContent({...content, about: {...content.about, subtitle: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Описание</Label>
                <Textarea
                  value={content.about?.description || ''}
                  onChange={(e) => setContent({...content, about: {...content.about, description: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                  rows={4}
                />
              </div>
              
              <Card className="bg-[#0a0a0a] border-[#d4af37]/30 mt-6">
                <CardHeader>
                  <CardTitle className="text-white text-base">Цитата основательницы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white/80">Фото основательницы</Label>
                    <Input
                      value={content.about?.founder?.image || ''}
                      onChange={(e) => handleImageChange(e.target.value, (url) => 
                        setContent({
                          ...content, 
                          about: {
                            ...content.about, 
                            founder: {...content.about?.founder, image: url}
                          }
                        })
                      )}
                      className="bg-black border-[#d4af37]/20 text-white"
                      placeholder="https://... или ImgBB"
                    />
                    <p className="text-xs text-white/50 mt-1">💡 ImgBB, Google Drive, Яндекс.Диск</p>
                  </div>
                  <div>
                    <Label className="text-white/80">Цитата (часть 1)</Label>
                    <Textarea
                      value={content.about?.founder?.quote_1 || ''}
                      onChange={(e) => setContent({
                        ...content, 
                        about: {
                          ...content.about, 
                          founder: {...content.about?.founder, quote_1: e.target.value}
                        }
                      })}
                      className="bg-black border-[#d4af37]/20 text-white"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className="text-white/80">Цитата (часть 2)</Label>
                    <Textarea
                      value={content.about?.founder?.quote_2 || ''}
                      onChange={(e) => setContent({
                        ...content, 
                        about: {
                          ...content.about, 
                          founder: {...content.about?.founder, quote_2: e.target.value}
                        }
                      })}
                      className="bg-black border-[#d4af37]/20 text-white"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white/80">Имя</Label>
                      <Input
                        value={content.about?.founder?.name || ''}
                        onChange={(e) => setContent({
                          ...content, 
                          about: {
                            ...content.about, 
                            founder: {...content.about?.founder, name: e.target.value}
                          }
                        })}
                        className="bg-black border-[#d4af37]/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80">Должность</Label>
                      <Input
                        value={content.about?.founder?.role || ''}
                        onChange={(e) => setContent({
                          ...content, 
                          about: {
                            ...content.about, 
                            founder: {...content.about?.founder, role: e.target.value}
                          }
                        })}
                        className="bg-black border-[#d4af37]/20 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={() => updateSection('about', content.about)}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold"
              >
                <Icon name="Save" size={20} className="mr-2" />
                Сохранить раздел "О клубе"
              </Button>
            </div>
          </TabsContent>

          {/* Values Section */}
          <TabsContent value="values" className="space-y-4 mt-6">
            <h3 className="text-white text-lg font-semibold">Ценности</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-white/80">Заголовок</Label>
                <Input
                  value={content.values?.title || ''}
                  onChange={(e) => setContent({...content, values: {...content.values, title: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              {(content.values?.values || []).map((value: any, index: number) => (
                <Card key={index} className="bg-[#0a0a0a] border-[#d4af37]/20">
                  <CardContent className="pt-4 space-y-3">
                    <div>
                      <Label className="text-white/80">Название</Label>
                      <Input
                        value={value.title || ''}
                        onChange={(e) => {
                          const newValues = [...content.values.values];
                          newValues[index] = {...value, title: e.target.value};
                          setContent({...content, values: {...content.values, values: newValues}});
                        }}
                        className="bg-black border-[#d4af37]/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80">Описание</Label>
                      <Textarea
                        value={value.description || ''}
                        onChange={(e) => {
                          const newValues = [...content.values.values];
                          newValues[index] = {...value, description: e.target.value};
                          setContent({...content, values: {...content.values, values: newValues}});
                        }}
                        className="bg-black border-[#d4af37]/20 text-white"
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={() => updateSection('values', content.values)}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold"
              >
                <Icon name="Save" size={20} className="mr-2" />
                Сохранить ценности
              </Button>
            </div>
          </TabsContent>

          {/* Events Section */}
          <TabsContent value="events" className="space-y-4 mt-6">
            <h3 className="text-white text-lg font-semibold">События</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-white/80">Заголовок</Label>
                <Input
                  value={content.events?.title || ''}
                  onChange={(e) => setContent({...content, events: {...content.events, title: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Подзаголовок</Label>
                <Input
                  value={content.events?.subtitle || ''}
                  onChange={(e) => setContent({...content, events: {...content.events, subtitle: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <Button
                onClick={() => updateSection('events', content.events)}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold"
              >
                <Icon name="Save" size={20} className="mr-2" />
                Сохранить раздел "События"
              </Button>
            </div>
          </TabsContent>

          {/* Gallery Section */}
          <TabsContent value="gallery" className="space-y-4 mt-6">
            <h3 className="text-white text-lg font-semibold">Галерея</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-white/80">Заголовок</Label>
                <Input
                  value={content.gallery?.title || ''}
                  onChange={(e) => setContent({...content, gallery: {...content.gallery, title: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Описание</Label>
                <Input
                  value={content.gallery?.description || ''}
                  onChange={(e) => setContent({...content, gallery: {...content.gallery, description: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Текст кнопки</Label>
                <Input
                  value={content.gallery?.button_text || ''}
                  onChange={(e) => setContent({...content, gallery: {...content.gallery, button_text: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <Button
                onClick={() => updateSection('gallery', content.gallery)}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold"
              >
                <Icon name="Save" size={20} className="mr-2" />
                Сохранить раздел "Галерея"
              </Button>
            </div>
          </TabsContent>

          {/* Experts Section */}
          <TabsContent value="experts" className="space-y-4 mt-6">
            <h3 className="text-white text-lg font-semibold">Эксперты</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-white/80">Заголовок</Label>
                <Input
                  value={content.experts?.title || ''}
                  onChange={(e) => setContent({...content, experts: {...content.experts, title: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Подзаголовок</Label>
                <Input
                  value={content.experts?.subtitle || ''}
                  onChange={(e) => setContent({...content, experts: {...content.experts, subtitle: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <Button
                onClick={() => updateSection('experts', content.experts)}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold"
              >
                <Icon name="Save" size={20} className="mr-2" />
                Сохранить раздел "Эксперты"
              </Button>
            </div>
          </TabsContent>

          {/* Join CTA Section */}
          <TabsContent value="join_cta" className="space-y-4 mt-6">
            <h3 className="text-white text-lg font-semibold">Призыв вступить</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-white/80">Заголовок</Label>
                <Input
                  value={content.join_cta?.title || ''}
                  onChange={(e) => setContent({...content, join_cta: {...content.join_cta, title: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Описание</Label>
                <Textarea
                  value={content.join_cta?.description || ''}
                  onChange={(e) => setContent({...content, join_cta: {...content.join_cta, description: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-white/80">Текст кнопки</Label>
                <Input
                  value={content.join_cta?.button_text || ''}
                  onChange={(e) => setContent({...content, join_cta: {...content.join_cta, button_text: e.target.value}})}
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                />
              </div>
              <Button
                onClick={() => updateSection('join_cta', content.join_cta)}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold"
              >
                <Icon name="Save" size={20} className="mr-2" />
                Сохранить призыв
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HomepageSection;
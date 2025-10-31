import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

import { useToast } from '@/hooks/use-toast';
import MuseTvSection from '@/components/admin/MuseTvSection';
import MediaGallerySection from '@/components/admin/MediaGallerySection';
import PartnersSection from '@/components/admin/PartnersSection';
import HomepageSection from '@/components/admin/HomepageSection';
import { convertCloudUrl, isCloudUrl, getServiceName } from '@/utils/imageUrlConverter';

interface Event {
  id?: number;
  title: string;
  date: string;
  time: string;
  description: string;
  type: string;
  location: string;
  seats: number | null;
  speakers: Speaker[];
  is_paid: boolean;
  price?: number;
}

interface Speaker {
  name: string;
  role: string;
  image: string;
}

interface DBSpeaker {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string | null;
  video_url: string | null;
  display_order: number;
  is_guest: boolean;
}

const Admin = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [availableSpeakers, setAvailableSpeakers] = useState<DBSpeaker[]>([]);
  const [showSpeakerPicker, setShowSpeakerPicker] = useState(false);
  const [activeTab, setActiveTab] = useState<'homepage' | 'events' | 'speakers' | 'headliners' | 'musetv' | 'gallery' | 'partners'>('homepage');
  const [showSpeakerForm, setShowSpeakerForm] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<DBSpeaker | null>(null);
  const [speakerFormData, setSpeakerFormData] = useState({
    name: '',
    role: '',
    image: '',
    bio: '',
    video_url: '',
    display_order: 0,
    is_guest: false
  });
  const [isUploadingSpeakerImage, setIsUploadingSpeakerImage] = useState(false);
  const speakerImageInputRef = useRef<HTMLInputElement>(null);

  const [headlinersContent, setHeadlinersContent] = useState<any>(null);
  const [rutubeVideos, setRutubeVideos] = useState<any[]>([]);
  const [museTvContent, setMuseTvContent] = useState<any>(null);
  const [museTvVideos, setMuseTvVideos] = useState<any[]>([]);
  const [museTvStreams, setMuseTvStreams] = useState<any[]>([]);
  const [showMuseTvVideoForm, setShowMuseTvVideoForm] = useState(false);
  const [showMuseTvStreamForm, setShowMuseTvStreamForm] = useState(false);
  const [editingMuseTvVideo, setEditingMuseTvVideo] = useState<any>(null);
  const [editingMuseTvStream, setEditingMuseTvStream] = useState<any>(null);
  const [museTvVideoFormData, setMuseTvVideoFormData] = useState({
    video_id: '',
    title: '',
    type: 'Подкаст',
    url: '',
    embed_url: '',
    display_order: 0
  });
  const [museTvStreamFormData, setMuseTvStreamFormData] = useState({
    title: '',
    date: '',
    time: '',
    category: '',
    speaker: '',
    display_order: 0
  });
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [videoFormData, setVideoFormData] = useState({
    video_id: '',
    title: '',
    description: '',
    thumbnail_url: '',
    duration: 0,
    display_order: 0
  });
  const [contentFormData, setContentFormData] = useState({
    hero_title: 'ХЕДЛАЙНЕРЫ',
    hero_subtitle: 'Вдохновляющие истории успеха',
    hero_description: 'Женщины, которые изменили мир бизнеса',
    hero_mobile_image: '',
    hero_left_image: '',
    hero_right_image: '',
    manifesto_title: 'МАНИФЕСТ',
    manifesto_subtitle: 'Почему мы создали Хедлайнеры',
    manifesto_text: '',
    cta_title: 'Станьте частью элитного сообщества',
    cta_description: 'Присоединяйтесь к клубу MUSE'
  });

  const [formData, setFormData] = useState<Event>({
    title: '',
    date: '',
    time: '18:00',
    description: '',
    type: 'online',
    location: '',
    seats: 20,
    speakers: [{ name: '', role: '', image: '' }],
    is_paid: false,
    price: undefined
  });
  const [unlimitedSeats, setUnlimitedSeats] = useState(false);
  const [silentMode, setSilentMode] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('muse_admin_token');
    if (authToken) {
      setIsAuthenticated(true);
      loadEvents();
      loadSpeakers();
      loadHeadlinersData();
      loadMuseTvData();
    }
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/9a03b227-0396-4821-b715-378637815ee2');
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error('Failed to load events:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить события',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadSpeakers = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/ac7d58d9-492c-4af9-b8d4-03cd08056a51');
      const data = await response.json();
      setAvailableSpeakers(data.speakers || []);
    } catch (error) {
      console.error('Failed to load speakers:', error);
    }
  };

  const loadHeadlinersData = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/fd61f513-079d-4d92-8d1a-623d0c7ef372');
      const data = await response.json();
      if (data.content) {
        setHeadlinersContent(data.content);
        setContentFormData(data.content);
      }
      setRutubeVideos(data.videos || []);
    } catch (error) {
      console.error('Failed to load headliners data:', error);
    }
  };

  const loadMuseTvData = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/88de6a19-94ff-4811-a220-47e387f88968');
      const data = await response.json();
      if (data.content) {
        setMuseTvContent(data.content);
      }
      setMuseTvVideos(data.videos || []);
      setMuseTvStreams(data.streams || []);
    } catch (error) {
      console.error('Failed to load MUSE TV data:', error);
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = 'https://functions.poehali.dev/fd61f513-079d-4d92-8d1a-623d0c7ef372';
      const method = editingVideo ? 'PUT' : 'POST';
      const body = editingVideo 
        ? { resource: 'video', id: editingVideo.id, data: videoFormData }
        : { resource: 'video', data: videoFormData };

      const response = await fetch(url, {
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
        loadHeadlinersData();
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

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = 'https://functions.poehali.dev/fd61f513-079d-4d92-8d1a-623d0c7ef372';
      const method = headlinersContent ? 'PUT' : 'POST';
      const body = headlinersContent
        ? { resource: 'content', id: headlinersContent.id, data: contentFormData }
        : { resource: 'content', data: contentFormData };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast({
          title: 'Успешно!',
          description: 'Контент страницы обновлен',
        });
        loadHeadlinersData();
      } else {
        throw new Error(data.error || 'Ошибка сохранения');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить контент',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVideo = async (videoId: number) => {
    if (!confirm('Вы уверены, что хотите удалить это видео?')) return;

    setIsLoading(true);
    try {
      const response = await fetch('HEADLINERS_FUNCTION_URL', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: videoId })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast({
          title: 'Успешно!',
          description: 'Видео удалено',
        });
        loadHeadlinersData();
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

  const resetVideoForm = () => {
    setVideoFormData({
      video_id: '',
      title: '',
      description: '',
      thumbnail_url: '',
      duration: 0,
      display_order: 0
    });
    setEditingVideo(null);
    setShowVideoForm(false);
  };

  const handleEditVideo = (video: any) => {
    setVideoFormData({
      video_id: video.video_id,
      title: video.title,
      description: video.description || '',
      thumbnail_url: video.thumbnail_url || '',
      duration: video.duration || 0,
      display_order: video.display_order || 0
    });
    setEditingVideo(video);
    setShowVideoForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = 'https://functions.poehali.dev/9a03b227-0396-4821-b715-378637815ee2';
      const method = editingEvent ? 'PUT' : 'POST';
      const body = editingEvent ? { ...formData, id: editingEvent.id, silent: silentMode } : formData;

      console.log('Saving event:', method, body);
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success) {
        const notificationMsg = silentMode 
          ? 'Событие обновлено без уведомлений'
          : (editingEvent ? 'Событие обновлено и уведомления отправлены' : 'Событие создано и уведомления отправлены');

        toast({
          title: 'Успешно!',
          description: notificationMsg,
        });
        
        resetForm();
        loadEvents();
      } else {
        throw new Error(data.error || 'Ошибка сохранения');
      }
    } catch (error) {
      console.error('Failed to save event:', error);
      const errorMessage = error instanceof Error ? error.message : 'Не удалось сохранить событие';
      toast({
        title: 'Ошибка',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '18:00',
      description: '',
      type: 'guest',
      location: '',
      seats: 20,
      speakers: [{ name: '', role: '', image: '' }],
      is_paid: false,
      price: undefined
    });
    setUnlimitedSeats(false);
    setSilentMode(false);
    setEditingEvent(null);
    setShowForm(false);
  };

  const handleEdit = (event: Event) => {
    setFormData({
      ...event,
      speakers: event.speakers.map(s => ({ ...s }))
    });
    setUnlimitedSeats(event.seats === null);
    setEditingEvent(event);
    setShowForm(true);
    
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDelete = async (eventId: number) => {
    if (!confirm('Вы уверены, что хотите удалить это событие?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/9a03b227-0396-4821-b715-378637815ee2', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: eventId })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: 'Успешно!',
          description: 'Событие удалено',
        });
        loadEvents();
      } else {
        throw new Error(data.error || 'Ошибка удаления');
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
      const errorMessage = error instanceof Error ? error.message : 'Не удалось удалить событие';
      toast({
        title: 'Ошибка',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSpeaker = () => {
    setFormData({
      ...formData,
      speakers: [...formData.speakers, { name: '', role: '', image: '' }]
    });
  };

  const addSpeakerFromDB = (dbSpeaker: DBSpeaker) => {
    const newSpeaker: Speaker = {
      name: dbSpeaker.name,
      role: dbSpeaker.role,
      image: dbSpeaker.image
    };
    setFormData({
      ...formData,
      speakers: [...formData.speakers, newSpeaker]
    });
    setShowSpeakerPicker(false);
  };

  const handleSpeakerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = 'https://functions.poehali.dev/ac7d58d9-492c-4af9-b8d4-03cd08056a51';
      const method = editingSpeaker ? 'PUT' : 'POST';
      const body = editingSpeaker ? { ...speakerFormData, id: editingSpeaker.id } : speakerFormData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: 'Успешно!',
          description: editingSpeaker ? 'Эксперт обновлён' : 'Эксперт добавлен',
        });
        
        resetSpeakerForm();
        loadSpeakers();
      } else {
        throw new Error(data.error || 'Ошибка сохранения');
      }
    } catch (error) {
      console.error('Failed to save speaker:', error);
      const errorMessage = error instanceof Error ? error.message : 'Не удалось сохранить эксперта';
      toast({
        title: 'Ошибка',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetSpeakerForm = () => {
    setSpeakerFormData({
      name: '',
      role: '',
      image: '',
      bio: '',
      video_url: '',
      display_order: 0,
      is_guest: false
    });
    setEditingSpeaker(null);
    setShowSpeakerForm(false);
  };

  const handleEditSpeaker = (speaker: DBSpeaker) => {
    setSpeakerFormData({
      name: speaker.name,
      role: speaker.role,
      image: speaker.image,
      bio: speaker.bio || '',
      video_url: speaker.video_url || '',
      display_order: speaker.display_order,
      is_guest: speaker.is_guest || false
    });
    setEditingSpeaker(speaker);
    setShowSpeakerForm(true);
  };

  const handleDeleteSpeaker = async (speakerId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этого эксперта?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/ac7d58d9-492c-4af9-b8d4-03cd08056a51', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: speakerId })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: 'Успешно!',
          description: 'Эксперт удалён',
        });
        loadSpeakers();
      } else {
        throw new Error(data.error || 'Ошибка удаления');
      }
    } catch (error) {
      console.error('Failed to delete speaker:', error);
      const errorMessage = error instanceof Error ? error.message : 'Не удалось удалить эксперта';
      toast({
        title: 'Ошибка',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeSpeaker = (index: number) => {
    const newSpeakers = formData.speakers.filter((_, i) => i !== index);
    setFormData({ ...formData, speakers: newSpeakers });
  };

  const updateSpeaker = async (index: number, field: keyof Speaker, value: string) => {
    if (field === 'image' && isCloudUrl(value)) {
      const directUrl = await convertCloudUrl(value);
      const newSpeakers = [...formData.speakers];
      newSpeakers[index] = { ...newSpeakers[index], [field]: directUrl };
      setFormData({ ...formData, speakers: newSpeakers });
      if (directUrl !== value) {
        toast({
          title: 'Ссылка конвертирована',
          description: `${getServiceName(value)} ссылка преобразована в прямую ссылку`,
        });
      }
    } else {
      const newSpeakers = [...formData.speakers];
      newSpeakers[index] = { ...newSpeakers[index], [field]: value };
      setFormData({ ...formData, speakers: newSpeakers });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    try {
      const response = await fetch('https://functions.poehali.dev/94b2cee5-5934-403c-8546-48ae9501e585', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('muse_admin_token', data.token);
        setIsAuthenticated(true);
        loadEvents();
        toast({
          title: 'Вход выполнен',
          description: 'Добро пожаловать в админ-панель!',
        });
      } else {
        toast({
          title: 'Ошибка входа',
          description: 'Неверный пароль',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось войти',
        variant: 'destructive'
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('muse_admin_token');
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-[#1a1a1a] border-[#d4af37]/20 w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#8b7355] mb-2">
                Админ-панель MUSE
              </div>
              <p className="text-sm text-white/60 font-normal">Введите пароль для доступа</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-white/80">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                  placeholder="Введите пароль"
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold py-6 text-lg"
              >
                {isAuthenticating ? 'Вход...' : 'Войти'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black/80 backdrop-blur-md border-b border-[#d4af37]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#8b7355]">
            Админ-панель MUSE
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 px-8 py-6 rounded-xl font-bold"
          >
            Выйти
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 flex gap-3 flex-wrap">
          <Button
            onClick={() => {
              setActiveTab('homepage');
              setShowForm(false);
              setShowSpeakerForm(false);
              setEditingEvent(null);
              setEditingSpeaker(null);
            }}
            variant={activeTab === 'homepage' ? 'default' : 'ghost'}
            className={activeTab === 'homepage' 
              ? 'bg-gradient-to-r from-[#d4af37] to-[#8b7355] text-black font-bold px-8 py-6 text-lg'
              : 'text-white/60 hover:text-[#d4af37] hover:bg-transparent text-lg'
            }
          >
            Главная
          </Button>
          <Button
            onClick={() => {
              setActiveTab('events');
              setShowSpeakerForm(false);
              setEditingSpeaker(null);
            }}
            variant={activeTab === 'events' ? 'default' : 'ghost'}
            className={activeTab === 'events' 
              ? 'bg-gradient-to-r from-[#d4af37] to-[#8b7355] text-black font-bold px-8 py-6 text-lg'
              : 'text-white/60 hover:text-[#d4af37] hover:bg-transparent text-lg'
            }
          >
            События
          </Button>
          <Button
            onClick={() => {
              setActiveTab('speakers');
              setShowForm(false);
              setEditingEvent(null);
            }}
            variant={activeTab === 'speakers' ? 'default' : 'ghost'}
            className={activeTab === 'speakers'
              ? 'bg-gradient-to-r from-[#d4af37] to-[#8b7355] text-black font-bold px-8 py-6 text-lg'
              : 'text-white/60 hover:text-[#d4af37] hover:bg-transparent text-lg'
            }
          >
            Эксперты
          </Button>
          <Button
            onClick={() => {
              setActiveTab('headliners');
              setShowForm(false);
              setShowSpeakerForm(false);
              setEditingEvent(null);
              setEditingSpeaker(null);
            }}
            variant={activeTab === 'headliners' ? 'default' : 'ghost'}
            className={activeTab === 'headliners'
              ? 'bg-gradient-to-r from-[#d4af37] to-[#8b7355] text-black font-bold px-8 py-6 text-lg'
              : 'text-white/60 hover:text-[#d4af37] hover:bg-transparent text-lg'
            }
          >
            Хедлайнеры
          </Button>
          <Button
            onClick={() => {
              setActiveTab('musetv');
              setShowForm(false);
              setShowSpeakerForm(false);
              setEditingEvent(null);
              setEditingSpeaker(null);
            }}
            variant={activeTab === 'musetv' ? 'default' : 'ghost'}
            className={activeTab === 'musetv'
              ? 'bg-gradient-to-r from-[#d4af37] to-[#8b7355] text-black font-bold px-8 py-6 text-lg'
              : 'text-white/60 hover:text-[#d4af37] hover:bg-transparent text-lg'
            }
          >
            MUSE TV
          </Button>
          <Button
            onClick={() => {
              setActiveTab('gallery');
              setShowForm(false);
              setShowSpeakerForm(false);
              setEditingEvent(null);
              setEditingSpeaker(null);
            }}
            variant={activeTab === 'gallery' ? 'default' : 'ghost'}
            className={activeTab === 'gallery'
              ? 'bg-gradient-to-r from-[#d4af37] to-[#8b7355] text-black font-bold px-8 py-6 text-lg'
              : 'text-white/60 hover:text-[#d4af37] hover:bg-transparent text-lg'
            }
          >
            Галерея
          </Button>
          <Button
            onClick={() => {
              setActiveTab('partners');
              setShowForm(false);
              setShowSpeakerForm(false);
              setEditingEvent(null);
              setEditingSpeaker(null);
            }}
            variant={activeTab === 'partners' ? 'default' : 'ghost'}
            className={activeTab === 'partners'
              ? 'bg-gradient-to-r from-[#d4af37] to-[#8b7355] text-black font-bold px-8 py-6 text-lg'
              : 'text-white/60 hover:text-[#d4af37] hover:bg-transparent text-lg'
            }
          >
            Партнеры
          </Button>
        </div>

        {activeTab === 'homepage' && (
          <HomepageSection isLoading={isLoading} setIsLoading={setIsLoading} />
        )}

        {activeTab === 'events' && (
          <>
            <div className="mb-8 flex gap-3">
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {showForm ? 'Отменить' : 'Создать событие'}
              </Button>
              
              <Button
                onClick={loadEvents}
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 px-8 py-6 rounded-xl font-bold"
              >
                Обновить
              </Button>
            </div>
          </>
        )}

        {activeTab === 'speakers' && (
          <>
            <div className="mb-8 flex gap-3">
              <Button
                onClick={() => setShowSpeakerForm(!showSpeakerForm)}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {showSpeakerForm ? 'Отменить' : 'Добавить эксперта'}
              </Button>
              
              <Button
                onClick={loadSpeakers}
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 px-8 py-6 rounded-xl font-bold"
              >
                Обновить
              </Button>
            </div>

            {showSpeakerForm && (
              <Card className="bg-[#1a1a1a] border-[#d4af37]/20 mb-8">
                <CardHeader>
                  <CardTitle className="text-[#d4af37]">
                    {editingSpeaker ? 'Редактировать эксперта' : 'Новый эксперт'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSpeakerSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="speaker-name" className="text-white/80">Имя</Label>
                        <Input
                          id="speaker-name"
                          value={speakerFormData.name}
                          onChange={(e) => setSpeakerFormData({ ...speakerFormData, name: e.target.value })}
                          required
                          className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="speaker-role" className="text-white/80">Роль</Label>
                        <Input
                          id="speaker-role"
                          value={speakerFormData.role}
                          onChange={(e) => setSpeakerFormData({ ...speakerFormData, role: e.target.value })}
                          className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="speaker-image" className="text-white/80">Изображение эксперта</Label>
                      <div className="flex gap-2">
                        <Input
                          id="speaker-image"
                          value={speakerFormData.image}
                          onChange={async (e) => {
                            const url = e.target.value;
                            if (isCloudUrl(url)) {
                              const directUrl = await convertCloudUrl(url);
                              setSpeakerFormData({ ...speakerFormData, image: directUrl });
                              if (directUrl !== url) {
                                toast({
                                  title: 'Ссылка конвертирована',
                                  description: `${getServiceName(url)} ссылка преобразована в прямую ссылку`,
                                });
                              }
                            } else {
                              setSpeakerFormData({ ...speakerFormData, image: url });
                            }
                          }}
                          className="bg-[#0a0a0a] border-[#d4af37]/20 text-white flex-1"
                          placeholder="URL изображения или выберите файл"
                        />
                        <input
                          ref={speakerImageInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            if (file.size > 5 * 1024 * 1024) {
                              toast({
                                title: 'Ошибка',
                                description: 'Размер файла не должен превышать 5 МБ',
                                variant: 'destructive'
                              });
                              return;
                            }

                            setIsUploadingSpeakerImage(true);
                            const formData = new FormData();
                            formData.append('image', file);

                            try {
                              const response = await fetch('https://api.imgbb.com/1/upload?key=4d755673c26a0c615eaedc63bd1fcc2a', {
                                method: 'POST',
                                body: formData
                              });

                              const data = await response.json();
                              if (data.success) {
                                setSpeakerFormData({ ...speakerFormData, image: data.data.url });
                                toast({
                                  title: 'Фото загружено',
                                  description: 'Изображение успешно загружено на ImgBB'
                                });
                              } else {
                                throw new Error('Ошибка загрузки');
                              }
                            } catch (error) {
                              toast({
                                title: 'Ошибка загрузки',
                                description: 'Не удалось загрузить изображение',
                                variant: 'destructive'
                              });
                            } finally {
                              setIsUploadingSpeakerImage(false);
                              if (speakerImageInputRef.current) {
                                speakerImageInputRef.current.value = '';
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => speakerImageInputRef.current?.click()}
                          disabled={isUploadingSpeakerImage}
                          className="bg-[#d4af37] hover:bg-[#8b7355] text-black px-4 whitespace-nowrap"
                        >
                          {isUploadingSpeakerImage ? 'Загрузка...' : 'Выбрать файл'}
                        </Button>
                      </div>
                      <p className="text-xs text-white/50 mt-1">💡 Загрузите файл или вставьте ссылку (ImgBB, Google Drive, Яндекс.Диск)</p>
                      {speakerFormData.image && (
                        <div className="mt-2">
                          <img src={speakerFormData.image} alt="Предпросмотр" className="w-32 h-32 object-cover rounded-lg" />
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="speaker-bio" className="text-white/80">Биография</Label>
                      <Textarea
                        id="speaker-bio"
                        value={speakerFormData.bio}
                        onChange={(e) => setSpeakerFormData({ ...speakerFormData, bio: e.target.value })}
                        className="bg-[#0a0a0a] border-[#d4af37]/20 text-white min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="speaker-video" className="text-white/80">Видео из Кинескоп (для главной страницы)</Label>
                      <Input
                        id="speaker-video"
                        value={speakerFormData.video_url}
                        onChange={(e) => setSpeakerFormData({ ...speakerFormData, video_url: e.target.value })}
                        className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                        placeholder="https://kinescope.io/..."
                      />
                      <p className="text-xs text-white/50 mt-1">💡 Вставьте ссылку на видео из Кинескоп. Видео будет показываться только в блоке "Наши эксперты" на главной странице</p>
                    </div>

                    <div>
                      <Label htmlFor="speaker-order" className="text-white/80">Порядок отображения</Label>
                      <Input
                        id="speaker-order"
                        type="number"
                        value={speakerFormData.display_order}
                        onChange={(e) => setSpeakerFormData({ ...speakerFormData, display_order: parseInt(e.target.value) || 0 })}
                        className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                        placeholder="0"
                      />
                      <p className="text-white/50 text-xs mt-1">Меньшее число = выше в списке</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="speaker-guest"
                        checked={speakerFormData.is_guest}
                        onCheckedChange={(checked) => setSpeakerFormData({ ...speakerFormData, is_guest: checked as boolean })}
                        className="border-[#d4af37]/20 data-[state=checked]:bg-[#d4af37] data-[state=checked]:text-black"
                      />
                      <Label htmlFor="speaker-guest" className="text-white/80 cursor-pointer">
                        Гостевой эксперт (не отображать на главной странице)
                      </Label>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        {isLoading ? 'Сохранение...' : editingSpeaker ? 'Обновить' : 'Добавить'}
                      </Button>
                      
                      <Button
                        type="button"
                        onClick={resetSpeakerForm}
                        variant="outline"
                        className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 px-8 py-6 rounded-xl font-bold"
                      >
                        Отменить
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#d4af37]">Все эксперты</h2>
              {isLoading ? (
                <div className="text-center py-8 text-white/60">Загрузка...</div>
              ) : availableSpeakers.length === 0 ? (
                <div className="text-center py-8 text-white/60">Нет экспертов</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableSpeakers.map((speaker) => (
                    <Card key={speaker.id} className="bg-[#1a1a1a] border-[#d4af37]/20">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {speaker.image && (
                            <img
                              src={speaker.image}
                              alt={speaker.name}
                              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white truncate">{speaker.name}</h3>
                              <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] px-2 py-1 rounded">#{speaker.display_order}</span>
                            </div>
                            <p className="text-sm text-white/60 truncate">{speaker.role}</p>
                            {speaker.bio && (
                              <p className="text-xs text-white/40 mt-2 line-clamp-2">{speaker.bio}</p>
                            )}
                            {speaker.video_url && (
                              <p className="text-xs text-green-400 mt-1">🎥 Видео добавлено</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={() => handleEditSpeaker(speaker)}
                            variant="outline"
                            size="sm"
                            className="flex-1 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 py-5 rounded-lg"
                          >
                            Редактировать
                          </Button>
                          <Button
                            onClick={() => handleDeleteSpeaker(speaker.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 py-5 px-6 rounded-lg"
                          >
                            Удалить
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'headliners' && (
          <>
            <div className="space-y-8">
              <Card className="bg-[#1a1a1a] border-[#d4af37]/20">
                <CardHeader>
                  <CardTitle className="text-[#d4af37]">Контент страницы Хедлайнеры</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContentSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-white/90 font-bold text-lg">Героическая секция</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white/80">Заголовок</Label>
                          <Input
                            value={contentFormData.hero_title}
                            onChange={(e) => setContentFormData({...contentFormData, hero_title: e.target.value})}
                            className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white/80">Подзаголовок</Label>
                          <Input
                            value={contentFormData.hero_subtitle}
                            onChange={(e) => setContentFormData({...contentFormData, hero_subtitle: e.target.value})}
                            className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-white/80">Описание</Label>
                        <Input
                          value={contentFormData.hero_description}
                          onChange={(e) => setContentFormData({...contentFormData, hero_description: e.target.value})}
                          className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-white/80">Мобильное изображение</Label>
                          <Input
                            value={contentFormData.hero_mobile_image}
                            onChange={async (e) => {
                              const url = e.target.value;
                              if (isCloudUrl(url)) {
                                const directUrl = await convertCloudUrl(url);
                                setContentFormData({...contentFormData, hero_mobile_image: directUrl});
                                if (directUrl !== url) {
                                  toast({
                                    title: 'Ссылка конвертирована',
                                    description: `${getServiceName(url)} ссылка преобразована в прямую ссылку`,
                                  });
                                }
                              } else {
                                setContentFormData({...contentFormData, hero_mobile_image: url});
                              }
                            }}
                            className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                            placeholder="https://... или ссылка с ImgBB"
                          />
                          <p className="text-xs text-white/50 mt-1">💡 ImgBB, Google Drive, Яндекс.Диск</p>
                        </div>
                        <div>
                          <Label className="text-white/80">Левое изображение</Label>
                          <Input
                            value={contentFormData.hero_left_image}
                            onChange={async (e) => {
                              const url = e.target.value;
                              if (isCloudUrl(url)) {
                                const directUrl = await convertCloudUrl(url);
                                setContentFormData({...contentFormData, hero_left_image: directUrl});
                                if (directUrl !== url) {
                                  toast({
                                    title: 'Ссылка конвертирована',
                                    description: `${getServiceName(url)} ссылка преобразована в прямую ссылку`,
                                  });
                                }
                              } else {
                                setContentFormData({...contentFormData, hero_left_image: url});
                              }
                            }}
                            className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                            placeholder="https://... или ссылка с ImgBB"
                          />
                          <p className="text-xs text-white/50 mt-1">💡 ImgBB, Google Drive, Яндекс.Диск</p>
                        </div>
                        <div>
                          <Label className="text-white/80">Правое изображение</Label>
                          <Input
                            value={contentFormData.hero_right_image}
                            onChange={async (e) => {
                              const url = e.target.value;
                              if (isCloudUrl(url)) {
                                const directUrl = await convertCloudUrl(url);
                                setContentFormData({...contentFormData, hero_right_image: directUrl});
                                if (directUrl !== url) {
                                  toast({
                                    title: 'Ссылка конвертирована',
                                    description: `${getServiceName(url)} ссылка преобразована в прямую ссылку`,
                                  });
                                }
                              } else {
                                setContentFormData({...contentFormData, hero_right_image: url});
                              }
                            }}
                            className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                            placeholder="https://... или ссылка с ImgBB"
                          />
                          <p className="text-xs text-white/50 mt-1">💡 ImgBB, Google Drive, Яндекс.Диск</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-white/90 font-bold text-lg">Манифест</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white/80">Заголовок манифеста</Label>
                          <Input
                            value={contentFormData.manifesto_title}
                            onChange={(e) => setContentFormData({...contentFormData, manifesto_title: e.target.value})}
                            className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white/80">Подзаголовок манифеста</Label>
                          <Input
                            value={contentFormData.manifesto_subtitle}
                            onChange={(e) => setContentFormData({...contentFormData, manifesto_subtitle: e.target.value})}
                            className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-white/80">Текст манифеста</Label>
                        <Textarea
                          value={contentFormData.manifesto_text}
                          onChange={(e) => setContentFormData({...contentFormData, manifesto_text: e.target.value})}
                          className="bg-[#0a0a0a] border-[#d4af37]/20 text-white min-h-[100px]"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-white/90 font-bold text-lg">Призыв к действию</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white/80">Заголовок CTA</Label>
                          <Input
                            value={contentFormData.cta_title}
                            onChange={(e) => setContentFormData({...contentFormData, cta_title: e.target.value})}
                            className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white/80">Описание CTA</Label>
                          <Input
                            value={contentFormData.cta_description}
                            onChange={(e) => setContentFormData({...contentFormData, cta_description: e.target.value})}
                            className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      {isLoading ? 'Сохранение...' : 'Сохранить контент'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#d4af37]">Видео с Rutube</h2>
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
                    <CardTitle className="text-[#d4af37]">
                      {editingVideo ? 'Редактировать видео' : 'Новое видео'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleVideoSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white/80">ID видео Rutube</Label>
                          <Input
                            value={videoFormData.video_id}
                            onChange={(e) => setVideoFormData({...videoFormData, video_id: e.target.value})}
                            required
                            className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                            placeholder="f5f3f8cbf35a5a5b6f84aa13c4a7df8f"
                          />
                        </div>
                        <div>
                          <Label className="text-white/80">Название</Label>
                          <Input
                            value={videoFormData.title}
                            onChange={(e) => setVideoFormData({...videoFormData, title: e.target.value})}
                            required
                            className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-white/80">Описание</Label>
                        <Textarea
                          value={videoFormData.description}
                          onChange={(e) => setVideoFormData({...videoFormData, description: e.target.value})}
                          className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white/80">Порядок отображения</Label>
                          <Input
                            type="number"
                            value={videoFormData.display_order}
                            onChange={(e) => setVideoFormData({...videoFormData, display_order: parseInt(e.target.value) || 0})}
                            className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                        >
                          {isLoading ? 'Сохранение...' : editingVideo ? 'Обновить' : 'Добавить'}
                        </Button>
                        <Button
                          type="button"
                          onClick={resetVideoForm}
                          variant="outline"
                          className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 px-8 py-6 rounded-xl font-bold"
                        >
                          Отменить
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {rutubeVideos.map((video) => (
                  <Card key={video.id} className="bg-[#1a1a1a] border-[#d4af37]/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-white/90 font-bold text-lg mb-2">{video.title}</h3>
                          <p className="text-white/60 text-sm mb-2">ID: {video.video_id}</p>
                          {video.description && (
                            <p className="text-white/70 text-sm mb-3">{video.description}</p>
                          )}
                          <p className="text-white/50 text-xs">Порядок: {video.display_order}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditVideo(video)}
                            variant="outline"
                            size="sm"
                            className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 py-5 rounded-lg"
                          >
                            Редактировать
                          </Button>
                          <Button
                            onClick={() => handleDeleteVideo(video.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 py-5 px-6 rounded-lg"
                          >
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {showForm && (
          <Card ref={formRef} className="bg-[#1a1a1a] border-[#d4af37]/20 mb-8">
            <CardHeader>
              <CardTitle className="text-[#d4af37]">
                {editingEvent ? 'Редактировать событие' : 'Новое событие'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-white/80">Название</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type" className="text-white/80">Тип</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger className="bg-[#0a0a0a] border-[#d4af37]/20 text-white">
                        <SelectValue placeholder="Выберите тип события" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/20">
                        <SelectItem value="offline" className="text-white hover:bg-[#d4af37]/20">Офлайн</SelectItem>
                        <SelectItem value="online" className="text-white hover:bg-[#d4af37]/20">Онлайн</SelectItem>
                        <SelectItem value="workshop" className="text-white hover:bg-[#d4af37]/20">Мастер-класс</SelectItem>
                        <SelectItem value="guest" className="text-white hover:bg-[#d4af37]/20">Онлайн (гость)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="date" className="text-white/80">Дата</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-white/80">Время</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                      className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-white/80">Место</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                      className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seats" className="text-white/80">Количество мест</Label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={unlimitedSeats}
                          onChange={(e) => {
                            setUnlimitedSeats(e.target.checked);
                            if (e.target.checked) {
                              setFormData({ ...formData, seats: null });
                            } else {
                              setFormData({ ...formData, seats: 20 });
                            }
                          }}
                          className="w-4 h-4 rounded border-[#d4af37]/20 bg-[#0a0a0a] text-[#d4af37] focus:ring-[#d4af37]"
                        />
                        <span className="text-white/80 text-sm">Без ограничений</span>
                      </label>
                      {!unlimitedSeats && (
                        <Input
                          id="seats"
                          type="number"
                          value={formData.seats || ''}
                          onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) || 0 })}
                          required={!unlimitedSeats}
                          className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                          placeholder="Укажите количество мест"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-white/80">Описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="bg-[#0a0a0a] border-[#d4af37]/20 text-white min-h-[100px]"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-white/80">Тип события</Label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="is_paid"
                        checked={!formData.is_paid}
                        onChange={() => setFormData({ ...formData, is_paid: false, price: undefined })}
                        className="w-4 h-4 accent-[#d4af37]"
                      />
                      <span className="text-white/80">Бесплатное</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="is_paid"
                        checked={formData.is_paid}
                        onChange={() => setFormData({ ...formData, is_paid: true })}
                        className="w-4 h-4 accent-[#d4af37]"
                      />
                      <span className="text-white/80">Платное</span>
                    </label>
                  </div>
                  {formData.is_paid && (
                    <div>
                      <Label htmlFor="price" className="text-white/80">Цена (₽)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || undefined })}
                        required={formData.is_paid}
                        className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                        placeholder="1500.00"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white/80">Спикеры</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={() => setShowSpeakerPicker(!showSpeakerPicker)}
                        variant="outline"
                        size="sm"
                        className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 px-6 py-5 rounded-lg"
                      >
                        Выбрать эксперта
                      </Button>
                      <Button
                        type="button"
                        onClick={addSpeaker}
                        variant="outline"
                        size="sm"
                        className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 px-6 py-5 rounded-lg"
                      >
                        Добавить вручную
                      </Button>
                    </div>
                  </div>

                  {showSpeakerPicker && (
                    <div className="bg-[#0a0a0a] rounded-lg border border-[#d4af37]/20 p-4 max-h-96 overflow-y-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {availableSpeakers.map((speaker) => (
                          <button
                            key={speaker.id}
                            type="button"
                            onClick={() => addSpeakerFromDB(speaker)}
                            className="flex items-center gap-3 p-3 bg-black rounded-lg border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-colors text-left"
                          >
                            {speaker.image && (
                              <img
                                src={speaker.image}
                                alt={speaker.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-white font-medium truncate">{speaker.name}</div>
                              <div className="text-white/60 text-sm truncate">{speaker.role}</div>
                            </div>
                            <span className="text-[#d4af37] text-xl flex-shrink-0">+</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.speakers.map((speaker, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#0a0a0a] rounded-lg border border-[#d4af37]/10">
                      <Input
                        placeholder="Имя спикера"
                        value={speaker.name}
                        onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
                        className="bg-black border-[#d4af37]/20 text-white"
                      />
                      <Input
                        placeholder="Роль"
                        value={speaker.role}
                        onChange={(e) => updateSpeaker(index, 'role', e.target.value)}
                        className="bg-black border-[#d4af37]/20 text-white"
                      />
                      <div className="flex-1">
                        <Input
                          placeholder="URL изображения или ссылка с ImgBB"
                          value={speaker.image}
                          onChange={(e) => updateSpeaker(index, 'image', e.target.value)}
                          className="bg-black border-[#d4af37]/20 text-white"
                        />
                        <p className="text-xs text-white/50 mt-1">💡 Поддерживаются ImgBB, Google Drive, Яндекс.Диск</p>
                      </div>
                      <div className="flex gap-2">
                        {formData.speakers.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeSpeaker(index)}
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 px-4 rounded-lg flex-shrink-0"
                          >
                            Удалить
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {editingEvent && (
                  <div className="space-y-2 mb-4 mt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={silentMode}
                        onChange={(e) => setSilentMode(e.target.checked)}
                        className="w-4 h-4 rounded border-[#d4af37]/20 bg-[#0a0a0a] text-[#d4af37] focus:ring-[#d4af37]"
                      />
                      <span className="text-white/80 text-sm">🔕 Тихий режим (обновить без уведомлений в Telegram)</span>
                    </label>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? 'Сохранение...' : editingEvent ? (silentMode ? 'Обновить без уведомлений' : 'Обновить и отправить уведомления') : 'Создать и отправить уведомления'}
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 px-8 py-6 rounded-xl font-bold"
                  >
                    Отменить
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#d4af37]">Все события</h2>
            
            {isLoading && !events.length ? (
              <div className="text-center py-12">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-[#d4af37]/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#d4af37] animate-spin"></div>
                </div>
                <p className="text-white/60">Загрузка...</p>
              </div>
            ) : events.length === 0 ? (
              <Card className="bg-[#1a1a1a] border-[#d4af37]/20">
                <CardContent className="py-16 text-center">
                  <p className="text-white/60 text-lg">Событий пока нет</p>
                </CardContent>
              </Card>
            ) : (
              events.map((event) => (
                <Card key={event.id} className="bg-[#1a1a1a] border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#d4af37] mb-2">{event.title}</h3>
                        <div className="space-y-2 text-sm text-white/70">
                          <p>
                            {event.date} в {event.time}
                          </p>
                          <p>
                            {event.location}
                          </p>
                          <p>
                            {event.seats} мест
                          </p>
                          <p className="text-white/60 mt-2">{event.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(event)}
                          variant="outline"
                          size="sm"
                          className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 px-6 py-5 rounded-lg"
                        >
                          Редактировать
                        </Button>
                        <Button
                          onClick={() => event.id && handleDelete(event.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 px-6 py-5 rounded-lg"
                          disabled={isLoading}
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === 'musetv' && (
          <MuseTvSection isLoading={isLoading} setIsLoading={setIsLoading} />
        )}

        {activeTab === 'gallery' && (
          <MediaGallerySection />
        )}

        {activeTab === 'partners' && (
          <PartnersSection isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
      </div>
    </div>
  );
};

export default Admin;
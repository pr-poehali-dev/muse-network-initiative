import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id?: number;
  title: string;
  date: string;
  time: string;
  description: string;
  type: string;
  location: string;
  seats: number;
  speakers: Speaker[];
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
}

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [availableSpeakers, setAvailableSpeakers] = useState<DBSpeaker[]>([]);
  const [showSpeakerPicker, setShowSpeakerPicker] = useState(false);

  const [formData, setFormData] = useState<Event>({
    title: '',
    date: '',
    time: '18:00',
    description: '',
    type: 'guest',
    location: '',
    seats: 20,
    speakers: [{ name: '', role: '', image: '' }]
  });

  useEffect(() => {
    const authToken = localStorage.getItem('muse_admin_token');
    if (authToken) {
      setIsAuthenticated(true);
      loadEvents();
      loadSpeakers();
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
      const response = await fetch('https://functions.poehali.dev/353c16af-1a5f-4420-8ee0-c0d777318ef4');
      const data = await response.json();
      setAvailableSpeakers(data.speakers || []);
    } catch (error) {
      console.error('Failed to load speakers:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = 'https://functions.poehali.dev/9a03b227-0396-4821-b715-378637815ee2';
      const method = editingEvent ? 'PUT' : 'POST';
      const body = editingEvent ? { ...formData, id: editingEvent.id } : formData;

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
        toast({
          title: 'Успешно!',
          description: editingEvent 
            ? 'Событие обновлено и уведомления отправлены' 
            : 'Событие создано и уведомления отправлены',
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
      speakers: [{ name: '', role: '', image: '' }]
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const handleEdit = (event: Event) => {
    setFormData({
      ...event,
      speakers: event.speakers.map(s => ({ ...s }))
    });
    setEditingEvent(event);
    setShowForm(true);
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

  const removeSpeaker = (index: number) => {
    const newSpeakers = formData.speakers.filter((_, i) => i !== index);
    setFormData({ ...formData, speakers: newSpeakers });
  };

  const updateSpeaker = (index: number, field: keyof Speaker, value: string) => {
    const newSpeakers = [...formData.speakers];
    newSpeakers[index] = { ...newSpeakers[index], [field]: value };
    setFormData({ ...formData, speakers: newSpeakers });
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
                className="w-full bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold"
              >
                <Icon name="Lock" className="w-5 h-5 mr-2" />
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
            className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
          >
            <Icon name="LogOut" className="w-5 h-5 mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6 flex gap-4">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold"
          >
            <Icon name={showForm ? "X" : "Plus"} className="w-5 h-5 mr-2" />
            {showForm ? 'Отменить' : 'Создать событие'}
          </Button>
          
          <Button
            onClick={loadEvents}
            variant="outline"
            className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
          >
            <Icon name="RefreshCw" className="w-5 h-5 mr-2" />
            Обновить
          </Button>
        </div>

        {showForm && (
          <Card className="bg-[#1a1a1a] border-[#d4af37]/20 mb-8">
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
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/20">
                        <SelectItem value="offline">Оффлайн встреча</SelectItem>
                        <SelectItem value="guest">Гостевая встреча</SelectItem>
                        <SelectItem value="workshop">Мастер-класс</SelectItem>
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

                  <div>
                    <Label htmlFor="seats" className="text-white/80">Мест</Label>
                    <Input
                      id="seats"
                      type="number"
                      value={formData.seats}
                      onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                      required
                      className="bg-[#0a0a0a] border-[#d4af37]/20 text-white"
                    />
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
                  <div className="flex items-center justify-between">
                    <Label className="text-white/80">Спикеры</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={() => setShowSpeakerPicker(!showSpeakerPicker)}
                        variant="outline"
                        size="sm"
                        className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
                      >
                        <Icon name="Users" className="w-4 h-4 mr-1" />
                        Выбрать эксперта
                      </Button>
                      <Button
                        type="button"
                        onClick={addSpeaker}
                        variant="outline"
                        size="sm"
                        className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
                      >
                        <Icon name="Plus" className="w-4 h-4 mr-1" />
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
                            <Icon name="Plus" className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
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
                      <div className="flex gap-2">
                        <Input
                          placeholder="URL изображения"
                          value={speaker.image}
                          onChange={(e) => updateSpeaker(index, 'image', e.target.value)}
                          className="bg-black border-[#d4af37]/20 text-white"
                        />
                        {formData.speakers.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeSpeaker(index)}
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:bg-red-500/10"
                          >
                            <Icon name="Trash2" className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold"
                  >
                    <Icon name="Save" className="w-5 h-5 mr-2" />
                    {isLoading ? 'Сохранение...' : editingEvent ? 'Обновить и отправить уведомления' : 'Создать и отправить уведомления'}
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
                  >
                    Отменить
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

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
              <CardContent className="py-12 text-center">
                <Icon name="Calendar" className="w-16 h-16 text-[#d4af37]/50 mx-auto mb-4" />
                <p className="text-white/60">Событий пока нет</p>
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
                        <p className="flex items-center gap-2">
                          <Icon name="Calendar" className="w-4 h-4" />
                          {event.date} в {event.time}
                        </p>
                        <p className="flex items-center gap-2">
                          <Icon name="MapPin" className="w-4 h-4" />
                          {event.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <Icon name="Users" className="w-4 h-4" />
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
                        className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
                      >
                        <Icon name="Edit" className="w-4 h-4 mr-2" />
                        Редактировать
                      </Button>
                      <Button
                        onClick={() => event.id && handleDelete(event.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                        disabled={isLoading}
                      >
                        <Icon name="Trash2" className="w-4 h-4 mr-2" />
                        Удалить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
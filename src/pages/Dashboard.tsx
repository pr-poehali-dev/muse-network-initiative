import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  telegram: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    telegram: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      navigate('/?login=true');
      return;
    }
    setUserEmail(email);
    fetchApplication(email);
  }, [navigate]);

  const fetchApplication = async (email: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://functions.poehali.dev/1abad196-7520-4a04-9c6e-25ad758e03a6?email=${encodeURIComponent(email)}`);
      
      if (response.status === 404) {
        setError('Заявка не найдена. Пожалуйста, заполните форму вступления в клуб.');
        setLoading(false);
        return;
      }
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      
      const data = await response.json();
      setApplication(data);
      setProfileData({
        name: data.name || '',
        phone: data.phone || '',
        telegram: data.telegram || ''
      });
    } catch (err) {
      setError('Не удалось загрузить данные. Попробуйте позже.');
      console.error('Error fetching application:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    if (application) {
      setProfileData({
        name: application.name || '',
        phone: application.phone || '',
        telegram: application.telegram || ''
      });
    }
  };

  const handleSaveProfile = async () => {
    if (!userEmail) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('https://functions.poehali.dev/86d916fc-7e24-4e3d-af36-baf40ce0c304', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          ...profileData
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка сохранения данных');
      }

      await fetchApplication(userEmail);
      setIsEditingProfile(false);
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Не удалось сохранить данные. Попробуйте позже.');
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'rejected':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Одобрена';
      case 'pending':
        return 'На рассмотрении';
      case 'rejected':
        return 'Отклонена';
      default:
        return status;
    }
  };

  return (
    <PageTransition>
      <Layout>
        <div className="min-h-screen bg-black">
          <Header />
          
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90">
                  Личный кабинет
                </h1>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
                >
                  <Icon name="LogOut" className="mr-2 h-4 w-4" />
                  Выйти
                </Button>
              </div>

              {loading && (
                <div className="text-center py-12">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-[#d4af37]/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-[#d4af37] border-r-[#d4af37] border-b-transparent border-l-transparent animate-spin"></div>
                  </div>
                  <p className="text-lg text-[#d4af37]">Загрузка...</p>
                </div>
              )}

              {error && !loading && (
                <Card className="bg-[#1a1a1a] border-red-500/30">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 text-red-400">
                      <Icon name="AlertCircle" className="h-6 w-6" />
                      <p>{error}</p>
                    </div>
                    <Button
                      onClick={() => navigate('/')}
                      className="mt-4 bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42]"
                    >
                      Вернуться на главную
                    </Button>
                  </CardContent>
                </Card>
              )}

              {application && !loading && (
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20">
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#d4af37] flex items-center gap-2">
                        <Icon name="User" className="h-6 w-6" />
                        Профиль
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-end mb-2">
                        {!isEditingProfile ? (
                          <Button
                            onClick={handleEditProfile}
                            variant="outline"
                            className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
                          >
                            <Icon name="Edit" className="mr-2 h-4 w-4" />
                            Редактировать
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              onClick={handleCancelEdit}
                              variant="outline"
                              className="border-white/20 text-white/70 hover:bg-white/10"
                              disabled={isSaving}
                            >
                              Отмена
                            </Button>
                            <Button
                              onClick={handleSaveProfile}
                              className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42]"
                              disabled={isSaving}
                            >
                              {isSaving ? (
                                <>
                                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                                  Сохранение...
                                </>
                              ) : (
                                <>
                                  <Icon name="Save" className="mr-2 h-4 w-4" />
                                  Сохранить
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-white/50 mb-1">Имя</p>
                          {isEditingProfile ? (
                            <input
                              type="text"
                              value={profileData.name}
                              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                              className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]/50"
                              placeholder="Ваше имя"
                            />
                          ) : (
                            <p className="text-white font-medium">{application.name}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-white/50 mb-1">Email</p>
                          <p className="text-white font-medium">{application.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-white/50 mb-1">Телефон</p>
                          {isEditingProfile ? (
                            <input
                              type="tel"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                              className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]/50"
                              placeholder="+7 (999) 123-45-67"
                            />
                          ) : (
                            <p className="text-white font-medium">{application.phone || '—'}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-white/50 mb-1">Telegram</p>
                          {isEditingProfile ? (
                            <input
                              type="text"
                              value={profileData.telegram}
                              onChange={(e) => setProfileData({ ...profileData, telegram: e.target.value })}
                              className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]/50"
                              placeholder="@username"
                            />
                          ) : (
                            <p className="text-white font-medium">{application.telegram || '—'}</p>
                          )}
                        </div>
                      </div>
                      {application.message && (
                        <div>
                          <p className="text-sm text-white/50 mb-1">О себе</p>
                          <p className="text-white/80">{application.message}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20">
                    <CardHeader>
                      <CardTitle className="text-2xl text-[#d4af37] flex items-center gap-2">
                        <Icon name="FileText" className="h-6 w-6" />
                        Статус заявки
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`px-4 py-2 rounded-full border ${getStatusColor(application.status)} border-current`}>
                          <p className="font-semibold">{getStatusText(application.status)}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div>
                          <p className="text-sm text-white/50 mb-1">Дата подачи</p>
                          <p className="text-white font-medium">
                            {new Date(application.created_at).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-white/50 mb-1">Последнее обновление</p>
                          <p className="text-white font-medium">
                            {new Date(application.updated_at).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      {application.status === 'pending' && (
                        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Icon name="Clock" className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-yellow-200 font-medium mb-1">Заявка на рассмотрении</p>
                              <p className="text-sm text-yellow-200/70">
                                Мы свяжемся с вами в ближайшее время. Пожалуйста, следите за уведомлениями в Telegram.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {application.status === 'approved' && (
                        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Icon name="CheckCircle" className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-green-200 font-medium mb-1">Поздравляем!</p>
                              <p className="text-sm text-green-200/70">
                                Ваша заявка одобрена. Добро пожаловать в клуб MUSE!
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </PageTransition>
  );
};

export default Dashboard;
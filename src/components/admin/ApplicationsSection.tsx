import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  telegram: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string | null;
}

interface Subscriber {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  telegram: string | null;
  telegram_chat_id: string | null;
  subscribed_at: string;
  is_active: boolean;
}

const ApplicationsSection = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'applications' | 'subscribers'>('applications');

  useEffect(() => {
    loadApplications();
    loadSubscribers();
  }, []);

  const loadApplications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/1abad196-7520-4a04-9c6e-25ad758e03a6?all=true');
      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error('Failed to load applications:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить заявки',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadSubscribers = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/9af61a9f-f3cc-4dfa-b8e9-555dcc5cf4d2?action=list');
      const data = await response.json();
      setSubscribers(data.subscribers || []);
    } catch (error) {
      console.error('Failed to load subscribers:', error);
    }
  };

  const handleStatusChange = async (id: number, newStatus: 'approved' | 'rejected') => {
    try {
      const response = await fetch('https://functions.poehali.dev/1abad196-7520-4a04-9c6e-25ad758e03a6', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: 'Статус обновлён',
          description: `Заявка ${newStatus === 'approved' ? 'одобрена' : 'отклонена'}`
        });
        loadApplications();
      } else {
        throw new Error(data.error || 'Ошибка обновления');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус',
        variant: 'destructive'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Одобрена';
      case 'rejected':
        return 'Отклонена';
      default:
        return 'Ожидает';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const approvedCount = applications.filter(app => app.status === 'approved').length;
  const activeSubscribers = subscribers.filter(sub => sub.is_active).length;

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <Button
          onClick={() => setActiveTab('applications')}
          variant={activeTab === 'applications' ? 'default' : 'outline'}
          className={activeTab === 'applications' 
            ? "bg-gradient-to-r from-[#d4af37] to-[#8b7355] text-black" 
            : "border-[#d4af37]/30 text-white hover:bg-[#d4af37]/10"
          }
        >
          <Icon name="FileText" className="w-4 h-4 mr-2" />
          Заявки ({applications.length})
        </Button>
        <Button
          onClick={() => setActiveTab('subscribers')}
          variant={activeTab === 'subscribers' ? 'default' : 'outline'}
          className={activeTab === 'subscribers' 
            ? "bg-gradient-to-r from-[#d4af37] to-[#8b7355] text-black" 
            : "border-[#d4af37]/30 text-white hover:bg-[#d4af37]/10"
          }
        >
          <Icon name="Users" className="w-4 h-4 mr-2" />
          Участницы ({subscribers.length})
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-[#1a1a1a] border-[#d4af37]/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Ожидают</p>
                <p className="text-3xl font-bold text-yellow-500">{pendingCount}</p>
              </div>
              <Icon name="Clock" className="w-12 h-12 text-yellow-500/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#d4af37]/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Одобрено</p>
                <p className="text-3xl font-bold text-green-500">{approvedCount}</p>
              </div>
              <Icon name="CheckCircle" className="w-12 h-12 text-green-500/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#d4af37]/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Активных подписок</p>
                <p className="text-3xl font-bold text-[#d4af37]">{activeSubscribers}</p>
              </div>
              <Icon name="Bell" className="w-12 h-12 text-[#d4af37]/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {activeTab === 'applications' ? (
        <Card className="bg-[#1a1a1a] border-[#d4af37]/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Заявки на вступление</span>
              <Button 
                onClick={loadApplications}
                variant="outline"
                size="sm"
                className="border-[#d4af37]/30"
              >
                <Icon name="RefreshCw" className="w-4 h-4 mr-2" />
                Обновить
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-white/60">Загрузка...</div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8 text-white/60">Заявок пока нет</div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-[#0a0a0a] border border-[#d4af37]/10 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{app.name}</h3>
                          <span className={`text-sm font-medium ${getStatusColor(app.status)}`}>
                            {getStatusText(app.status)}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-white/70">
                          <p><Icon name="Mail" className="w-4 h-4 inline mr-2" />{app.email}</p>
                          {app.phone && <p><Icon name="Phone" className="w-4 h-4 inline mr-2" />{app.phone}</p>}
                          {app.telegram && <p><Icon name="MessageCircle" className="w-4 h-4 inline mr-2" />{app.telegram}</p>}
                          {app.message && (
                            <p className="mt-2 p-2 bg-white/5 rounded text-white/80">
                              <Icon name="MessageSquare" className="w-4 h-4 inline mr-2" />
                              {app.message}
                            </p>
                          )}
                        </div>
                        <p className="text-xs text-white/50 mt-2">
                          <Icon name="Calendar" className="w-3 h-3 inline mr-1" />
                          {formatDate(app.created_at)}
                        </p>
                      </div>

                      {app.status === 'pending' && (
                        <div className="flex gap-2 ml-4">
                          <Button
                            onClick={() => handleStatusChange(app.id, 'approved')}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Icon name="Check" className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleStatusChange(app.id, 'rejected')}
                            size="sm"
                            variant="destructive"
                          >
                            <Icon name="X" className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-[#1a1a1a] border-[#d4af37]/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Зарегистрированные участницы</span>
              <Button 
                onClick={loadSubscribers}
                variant="outline"
                size="sm"
                className="border-[#d4af37]/30"
              >
                <Icon name="RefreshCw" className="w-4 h-4 mr-2" />
                Обновить
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscribers.length === 0 ? (
              <div className="text-center py-8 text-white/60">Участниц пока нет</div>
            ) : (
              <div className="space-y-3">
                {subscribers.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-[#0a0a0a] border border-[#d4af37]/10 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-semibold text-white">{sub.name}</h3>
                        {sub.is_active ? (
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">
                            Активна
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-500/20 text-gray-500 px-2 py-1 rounded">
                            Неактивна
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-white/70">
                        {sub.email && <p><Icon name="Mail" className="w-4 h-4 inline mr-2" />{sub.email}</p>}
                        {sub.phone && <p><Icon name="Phone" className="w-4 h-4 inline mr-2" />{sub.phone}</p>}
                        {sub.telegram && <p><Icon name="MessageCircle" className="w-4 h-4 inline mr-2" />{sub.telegram}</p>}
                        {sub.telegram_chat_id && (
                          <p className="text-xs text-green-500/70">
                            <Icon name="Bell" className="w-3 h-3 inline mr-1" />
                            Подписан на бота
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-white/50 mt-2">
                        Зарегистрирован: {formatDate(sub.subscribed_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationsSection;

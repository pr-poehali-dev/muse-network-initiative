import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WebhookSetup() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [webhookInfo, setWebhookInfo] = useState<any>(null);

  const setupWebhook = async () => {
    setLoading(true);
    setStatus('Устанавливаю webhook...');
    
    try {
      const response = await fetch('https://functions.poehali.dev/71437b44-b28b-423c-840b-e9c83267dcb6', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus('✅ Webhook успешно установлен!');
        getWebhookInfo();
      } else {
        setStatus('❌ Ошибка: ' + JSON.stringify(data));
      }
    } catch (error) {
      setStatus('❌ Ошибка: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const getWebhookInfo = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/71437b44-b28b-423c-840b-e9c83267dcb6');
      const data = await response.json();
      setWebhookInfo(data);
    } catch (error) {
      console.error('Error getting webhook info:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Настройка Telegram Webhook</CardTitle>
          <CardDescription>
            Нажмите кнопку ниже, чтобы настроить webhook для Telegram бота
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={setupWebhook} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Настройка...' : 'Установить Webhook'}
          </Button>

          {status && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-mono text-sm">{status}</p>
            </div>
          )}

          <Button 
            onClick={getWebhookInfo} 
            variant="outline"
            className="w-full"
          >
            Проверить статус webhook
          </Button>

          {webhookInfo && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold mb-2">Текущий статус:</p>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(webhookInfo, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

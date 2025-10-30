import { useState } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Настройка Telegram Webhook</h1>
        <p className="text-gray-600 mb-8">
          Нажмите кнопку ниже, чтобы настроить webhook для Telegram бота
        </p>

        <div className="space-y-4">
          <button 
            onClick={setupWebhook} 
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            {loading ? 'Настройка...' : 'Установить Webhook'}
          </button>

          {status && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-mono text-sm">{status}</p>
            </div>
          )}

          <button 
            onClick={getWebhookInfo}
            className="w-full bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            Проверить статус webhook
          </button>

          {webhookInfo && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-bold mb-2">Текущий статус:</p>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(webhookInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
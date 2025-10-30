import os
import urllib.request
import urllib.parse
import json

telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
webhook_url = 'https://functions.poehali.dev/86d916fc-7e24-4e3d-af36-baf40ce0c304'

url = f'https://api.telegram.org/bot{telegram_token}/setWebhook'
data = urllib.parse.urlencode({
    'url': webhook_url,
    'drop_pending_updates': True
}).encode()

try:
    response = urllib.request.urlopen(url, data=data)
    result = json.loads(response.read().decode())
    print(f"✅ Webhook установлен: {result}")
except Exception as e:
    print(f"❌ Ошибка: {e}")

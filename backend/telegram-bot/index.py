import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Telegram bot webhook to handle user subscriptions
    Args: event with httpMethod, body containing Telegram update
    Returns: HTTP response confirming message processing
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        update = json.loads(event.get('body', '{}'))
        print(f"Received update: {update}")
        
        database_url = os.environ.get('DATABASE_URL')
        if not database_url:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json'},
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Database not configured'})
            }
        
        if 'message' in update:
            message = update['message']
            chat_id = message['chat']['id']
            text = message.get('text', '')
            username = message['from'].get('username', '')
            
            print(f"Message from {username} (chat_id: {chat_id}): {text}")
            
            if text.startswith('/start'):
                start_param = text.split(' ')[1] if len(text.split(' ')) > 1 else None
                
                greeting = None
                if start_param:
                    if start_param == 'invite':
                        greeting = "🎉 Привет! Ваша заявка на вступление в клуб MUSE принята!\n\nПодпишитесь на бота, чтобы получать уведомления о мероприятиях ✨"
                    elif start_param == 'event':
                        greeting = "✅ Отлично! Вы зарегистрированы на событие в клубе MUSE!\n\nПодпишитесь на бота, чтобы получать напоминания и важные изменения 📢"
                    elif start_param == 'expert':
                        greeting = "🎓 Здравствуйте! Ваша заявка стать экспертом клуба MUSE принята!\n\nПодпишитесь на бота, чтобы быть в курсе возможностей для экспертов 💫"
                
                conn = psycopg2.connect(database_url)
                cur = conn.cursor()
                
                cur.execute("""
                    SELECT id FROM subscribers 
                    WHERE telegram_chat_id = %s
                """, (chat_id,))
                existing = cur.fetchone()
                
                first_name = message['from'].get('first_name', '')
                
                if existing:
                    cur.execute("""
                        UPDATE subscribers 
                        SET is_active = true
                        WHERE telegram_chat_id = %s
                    """, (chat_id,))
                    if greeting:
                        reply = f"{greeting}\n\n✅ Вы уже подписаны на уведомления!\n\nВы будете получать:\n📢 Анонсы новых мероприятий\n⚡️ Уведомления об изменениях\n✨ Эксклюзивные предложения"
                    else:
                        reply = "✅ Вы уже подписаны на уведомления клуба MUSE!\n\nВы будете получать:\n📢 Анонсы новых мероприятий\n⚡️ Уведомления об изменениях\n✨ Эксклюзивные предложения"
                else:
                    last_name = message['from'].get('last_name', '')
                    full_name = f"{first_name} {last_name}".strip()
                    
                    cur.execute("""
                        INSERT INTO subscribers (telegram, telegram_chat_id, name, is_active)
                        VALUES (%s, %s, %s, %s)
                    """, (f'@{username}' if username else str(chat_id), chat_id, full_name, True))
                    
                    if greeting:
                        reply = f"{greeting}\n\n🎉 Готово, {first_name}! Вы подписались на уведомления.\n\nВы будете получать:\n📢 Анонсы новых мероприятий\n⚡️ Уведомления об изменениях\n✨ Эксклюзивные предложения"
                    else:
                        reply = f"🎉 Добро пожаловать в клуб MUSE, {first_name}!\n\nВы успешно подписались на уведомления.\n\nТеперь вы будете получать:\n📢 Анонсы новых мероприятий\n⚡️ Уведомления об изменениях\n✨ Эксклюзивные предложения"
                
                conn.commit()
                cur.close()
                conn.close()
                
                keyboard = {
                    'inline_keyboard': [[
                        {
                            'text': '🔕 Отписаться',
                            'callback_data': 'unsubscribe'
                        }
                    ]]
                }
                send_message(chat_id, reply, keyboard)
                print(f"Registered/updated chat_id {chat_id} with param: {start_param}")
            
            elif text.startswith('/stop'):
                conn = psycopg2.connect(database_url)
                cur = conn.cursor()
                
                cur.execute("""
                    UPDATE subscribers 
                    SET is_active = false
                    WHERE telegram_chat_id = %s
                """, (chat_id,))
                
                conn.commit()
                cur.close()
                conn.close()
                
                reply = "😔 Вы отписались от уведомлений клуба MUSE.\n\nЧтобы подписаться снова, нажмите кнопку ниже:"
                keyboard = {
                    'inline_keyboard': [[
                        {
                            'text': '✅ Подписаться снова',
                            'callback_data': 'start_bot'
                        }
                    ]]
                }
                send_message(chat_id, reply, keyboard)
                print(f"Unsubscribed chat_id {chat_id}")
            
            elif text.startswith('/status'):
                conn = psycopg2.connect(database_url)
                cur = conn.cursor()
                
                cur.execute("""
                    SELECT is_active FROM subscribers 
                    WHERE telegram_chat_id = %s
                """, (chat_id,))
                
                result = cur.fetchone()
                cur.close()
                conn.close()
                
                if result:
                    status = "✅ активна" if result[0] else "❌ неактивна"
                    reply = f"Ваша подписка: {status}"
                else:
                    reply = "Вы не подписаны. Используйте /start для подписки."
                
                send_message(chat_id, reply)
            
            else:
                reply = "Команды бота MUSE:\n\n/start - Подписаться на уведомления\n/stop - Отписаться\n/status - Проверить статус подписки"
                send_message(chat_id, reply)
        
        elif 'callback_query' in update:
            callback = update['callback_query']
            chat_id = callback['message']['chat']['id']
            callback_data = callback['data']
            username = callback['from'].get('username', '')
            
            print(f"Callback from {username} (chat_id: {chat_id}): {callback_data}")
            
            if callback_data == 'start_bot':
                conn = psycopg2.connect(database_url)
                cur = conn.cursor()
                
                cur.execute("""
                    SELECT id FROM subscribers 
                    WHERE telegram_chat_id = %s
                """, (chat_id,))
                existing = cur.fetchone()
                
                if existing:
                    cur.execute("""
                        UPDATE subscribers 
                        SET is_active = true
                        WHERE telegram_chat_id = %s
                    """, (chat_id,))
                    reply = "✅ Вы уже подписаны на уведомления клуба MUSE!\n\nВы будете получать:\n📢 Анонсы новых мероприятий\n⚡️ Уведомления об изменениях\n✨ Эксклюзивные предложения"
                else:
                    first_name = callback['from'].get('first_name', '')
                    last_name = callback['from'].get('last_name', '')
                    full_name = f"{first_name} {last_name}".strip()
                    
                    cur.execute("""
                        INSERT INTO subscribers (telegram, telegram_chat_id, name, is_active)
                        VALUES (%s, %s, %s, %s)
                    """, (username, chat_id, full_name, True))
                    reply = "🎉 Добро пожаловать в клуб MUSE!\n\nВы успешно подписались на уведомления.\n\nВы будете получать:\n📢 Анонсы новых мероприятий\n⚡️ Уведомления об изменениях\n✨ Эксклюзивные предложения"
                
                conn.commit()
                cur.close()
                conn.close()
                
                keyboard = {
                    'inline_keyboard': [[
                        {
                            'text': '🔕 Отписаться',
                            'callback_data': 'unsubscribe'
                        }
                    ]]
                }
                send_message(chat_id, reply, keyboard)
                
                telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
                if telegram_token:
                    answer_url = f"https://api.telegram.org/bot{telegram_token}/answerCallbackQuery"
                    answer_data = urllib.parse.urlencode({
                        'callback_query_id': callback['id'],
                        'text': '✅ Подписка оформлена!'
                    }).encode()
                    urllib.request.urlopen(answer_url, data=answer_data)
                
                print(f"Subscribed via button: chat_id {chat_id}, username @{username}")
            
            elif callback_data == 'unsubscribe':
                conn = psycopg2.connect(database_url)
                cur = conn.cursor()
                
                cur.execute("""
                    UPDATE subscribers 
                    SET is_active = false
                    WHERE telegram_chat_id = %s
                """, (chat_id,))
                
                conn.commit()
                cur.close()
                conn.close()
                
                reply = "😔 Вы отписались от уведомлений клуба MUSE.\n\nЧтобы подписаться снова, нажмите кнопку ниже:"
                keyboard = {
                    'inline_keyboard': [[
                        {
                            'text': '✅ Подписаться снова',
                            'callback_data': 'start_bot'
                        }
                    ]]
                }
                send_message(chat_id, reply, keyboard)
                
                telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
                if telegram_token:
                    answer_url = f"https://api.telegram.org/bot{telegram_token}/answerCallbackQuery"
                    answer_data = urllib.parse.urlencode({
                        'callback_query_id': callback['id'],
                        'text': '🔕 Вы отписались'
                    }).encode()
                    urllib.request.urlopen(answer_url, data=answer_data)
                
                print(f"Unsubscribed via button: chat_id {chat_id}")
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'ok': True})
        }
    
    except Exception as e:
        print(f"Error processing update: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }


def send_message(chat_id: int, text: str, keyboard: dict = None):
    '''Send message to Telegram user'''
    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    if not telegram_token:
        print("TELEGRAM_BOT_TOKEN not configured")
        return
    
    url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
    
    params = {
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }
    
    if keyboard:
        params['reply_markup'] = json.dumps(keyboard)
    
    data = urllib.parse.urlencode(params).encode()
    
    try:
        urllib.request.urlopen(url, data=data)
        print(f"Sent message to {chat_id}")
    except Exception as e:
        print(f"Failed to send message to {chat_id}: {str(e)}")
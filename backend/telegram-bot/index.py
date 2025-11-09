import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any, Optional
import psycopg2
from pydantic import BaseModel, Field, validator

class ProfileUpdate(BaseModel):
    email: str = Field(..., min_length=1)
    name: Optional[str] = None
    phone: Optional[str] = None
    telegram: Optional[str] = None
    
    @validator('telegram')
    def validate_telegram(cls, v):
        if v and not v.startswith('@'):
            return f'@{v}'
        return v

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Telegram bot webhook to handle user subscriptions AND profile updates
    Args: event with httpMethod, body containing Telegram update OR profile update data
    Returns: HTTP response confirming message processing
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'PUT':
        return handle_profile_update(event)
    
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
                
                first_name = message['from'].get('first_name', '')
                
                cur.execute("""
                    SELECT id FROM subscribers 
                    WHERE telegram_chat_id = %s
                """, (chat_id,))
                existing_by_chat_id = cur.fetchone()
                
                cur.execute("""
                    SELECT id FROM subscribers 
                    WHERE telegram = %s AND telegram_chat_id IS NULL
                """, (f'@{username}',))
                existing_by_username = cur.fetchone()
                
                if existing_by_chat_id:
                    cur.execute("""
                        UPDATE subscribers 
                        SET is_active = true
                        WHERE telegram_chat_id = %s
                    """, (chat_id,))
                    if greeting:
                        reply = f"{greeting}\n\n✅ Вы уже подписаны на уведомления!\n\nВы будете получать:\n📢 Анонсы новых мероприятий\n⚡️ Уведомления об изменениях\n✨ Эксклюзивные предложения"
                    else:
                        reply = "✅ Вы уже подписаны на уведомления клуба MUSE!\n\nВы будете получать:\n📢 Анонсы новых мероприятий\n⚡️ Уведомления об изменениях\n✨ Эксклюзивные предложения"
                elif existing_by_username:
                    cur.execute("""
                        UPDATE subscribers 
                        SET telegram_chat_id = %s, is_active = true
                        WHERE telegram = %s AND telegram_chat_id IS NULL
                    """, (chat_id, f'@{username}'))
                    if greeting:
                        reply = f"{greeting}\n\n🎉 Готово, {first_name}! Вы подписались на уведомления.\n\nВы будете получать:\n📢 Анонсы новых мероприятий\n⚡️ Уведомления об изменениях\n✨ Эксклюзивные предложения"
                    else:
                        reply = f"🎉 Добро пожаловать в клуб MUSE, {first_name}!\n\nВы успешно подписались на уведомления.\n\nТеперь вы будете получать:\n📢 Анонсы новых мероприятий\n⚡️ Уведомления об изменениях\n✨ Эксклюзивные предложения"
                    print(f"Updated existing subscriber by username: {username} -> chat_id: {chat_id}")
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
            
            elif callback_data.startswith('approve_app_') or callback_data.startswith('reject_app_'):
                action = 'approved' if callback_data.startswith('approve_app_') else 'rejected'
                app_id = callback_data.split('_')[-1]
                
                conn = psycopg2.connect(database_url)
                cur = conn.cursor()
                
                cur.execute("""
                    UPDATE club_applications 
                    SET status = %s, updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                    RETURNING name, email, telegram
                """, (action, app_id))
                
                result = cur.fetchone()
                conn.commit()
                cur.close()
                conn.close()
                
                if result:
                    name, email, user_telegram = result
                    status_emoji = '✅' if action == 'approved' else '❌'
                    status_text = 'одобрена' if action == 'approved' else 'отклонена'
                    
                    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
                    if telegram_token:
                        message_id = callback['message']['message_id']
                        edit_url = f"https://api.telegram.org/bot{telegram_token}/editMessageText"
                        
                        updated_text = f"{callback['message']['text']}\n\n{status_emoji} Статус: {status_text.upper()}"
                        
                        edit_data = urllib.parse.urlencode({
                            'chat_id': chat_id,
                            'message_id': message_id,
                            'text': updated_text
                        }).encode()
                        
                        urllib.request.urlopen(edit_url, data=edit_data)
                        
                        answer_url = f"https://api.telegram.org/bot{telegram_token}/answerCallbackQuery"
                        answer_data = urllib.parse.urlencode({
                            'callback_query_id': callback['id'],
                            'text': f'{status_emoji} Заявка {status_text}!'
                        }).encode()
                        urllib.request.urlopen(answer_url, data=answer_data)
                    
                    print(f"Application {app_id} {action} by admin")
                else:
                    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
                    if telegram_token:
                        answer_url = f"https://api.telegram.org/bot{telegram_token}/answerCallbackQuery"
                        answer_data = urllib.parse.urlencode({
                            'callback_query_id': callback['id'],
                            'text': '❌ Заявка не найдена'
                        }).encode()
                        urllib.request.urlopen(answer_url, data=answer_data)
        
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


def handle_profile_update(event: Dict[str, Any]) -> Dict[str, Any]:
    '''Update user profile in subscribers table'''
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    profile = ProfileUpdate(**body_data)
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute("""
        SELECT id, telegram_chat_id, is_active FROM subscribers 
        WHERE email = %s
    """, (profile.email,))
    existing = cur.fetchone()
    
    if not existing:
        cur.close()
        conn.close()
        return {
            'statusCode': 404,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Profile not found'})
        }
    
    subscriber_id = existing[0]
    telegram_chat_id = existing[1]
    is_active = existing[2]
    
    update_fields = []
    params = []
    
    if profile.name is not None:
        update_fields.append('name = %s')
        params.append(profile.name)
    
    if profile.phone is not None:
        update_fields.append('phone = %s')
        params.append(profile.phone)
    
    if profile.telegram is not None:
        update_fields.append('telegram = %s')
        params.append(profile.telegram)
    
    if update_fields:
        params.append(subscriber_id)
        query = f"UPDATE subscribers SET {', '.join(update_fields)} WHERE id = %s"
        cur.execute(query, params)
        conn.commit()
    
    cur.execute("""
        SELECT id, name, email, phone, telegram, telegram_chat_id, is_active
        FROM subscribers
        WHERE id = %s
    """, (subscriber_id,))
    
    result = cur.fetchone()
    
    cur.close()
    conn.close()
    
    profile_data = {
        'id': result[0],
        'name': result[1],
        'email': result[2],
        'phone': result[3],
        'telegram': result[4],
        'has_telegram_notifications': result[5] is not None and result[6]
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'profile': profile_data
        })
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
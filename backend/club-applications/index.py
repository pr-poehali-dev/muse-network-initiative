'''
Business: Управление заявками на вступление в клуб MUSE
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with application data
'''

import json
import os
import psycopg2
import urllib.request
import urllib.parse
from typing import Dict, Any, Optional
from datetime import datetime, timezone, timedelta

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Email',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        name = body_data.get('name')
        email = body_data.get('email')
        phone = body_data.get('phone', '')
        telegram = body_data.get('telegram', '')
        message = body_data.get('message', '')
        
        if not name or not email:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Name and email are required'})
            }
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            "SELECT id FROM club_applications WHERE email = %s",
            (email,)
        )
        existing = cursor.fetchone()
        
        if existing:
            cursor.execute(
                "UPDATE club_applications SET name = %s, phone = %s, telegram = %s, message = %s, updated_at = CURRENT_TIMESTAMP WHERE email = %s RETURNING id, status, created_at",
                (name, phone, telegram, message, email)
            )
        else:
            cursor.execute(
                "INSERT INTO club_applications (name, email, phone, telegram, message) VALUES (%s, %s, %s, %s, %s) RETURNING id, status, created_at",
                (name, email, phone, telegram, message)
            )
        
        result = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        # Send Telegram notification
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        if telegram_token and telegram_chat_id:
            moscow_tz = timezone(timedelta(hours=3))
            timestamp = datetime.now(moscow_tz).strftime('%Y-%m-%d %H:%M:%S')
            
            admin_message = f"""🆕 Новая заявка на вступление в клуб MUSE

👤 Имя: {name}
📧 Email: {email}
📱 Телефон: {phone}
💬 Telegram: {telegram}
📝 Сообщение: {message}

🕐 Время: {timestamp}"""
            
            url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
            
            # Add approve/reject buttons
            keyboard = {
                'inline_keyboard': [[
                    {
                        'text': '✅ Одобрить',
                        'callback_data': f'approve_app_{result[0]}'
                    },
                    {
                        'text': '❌ Отклонить',
                        'callback_data': f'reject_app_{result[0]}'
                    }
                ]]
            }
            
            request_data = {
                'chat_id': telegram_chat_id,
                'text': admin_message,
                'reply_markup': json.dumps(keyboard)
            }
            
            data = urllib.parse.urlencode(request_data).encode()
            
            try:
                response = urllib.request.urlopen(url, data=data)
                print(f"Admin notification sent: {response.read().decode()}")
            except Exception as e:
                print(f"Failed to send admin notification: {str(e)}")
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'success': True,
                'application_id': result[0],
                'status': result[1],
                'created_at': result[2].isoformat()
            })
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        email = params.get('email')
        list_all = params.get('all')
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Return all applications for admin
        if list_all == 'true':
            cursor.execute(
                "SELECT id, name, email, phone, telegram, message, status, created_at, updated_at FROM club_applications ORDER BY created_at DESC"
            )
            
            rows = cursor.fetchall()
            cursor.close()
            conn.close()
            
            applications = []
            for row in rows:
                applications.append({
                    'id': row[0],
                    'name': row[1],
                    'email': row[2],
                    'phone': row[3],
                    'telegram': row[4],
                    'message': row[5],
                    'status': row[6],
                    'created_at': row[7].isoformat(),
                    'updated_at': row[8].isoformat() if row[8] else None
                })
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'applications': applications})
            }
        
        # Get single application by email
        if not email:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Email parameter is required'})
            }
        
        cursor.execute(
            "SELECT id, name, email, phone, telegram, message, status, created_at, updated_at FROM club_applications WHERE email = %s",
            (email,)
        )
        
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if not row:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Application not found'})
            }
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'id': row[0],
                'name': row[1],
                'email': row[2],
                'phone': row[3],
                'telegram': row[4],
                'message': row[5],
                'status': row[6],
                'created_at': row[7].isoformat(),
                'updated_at': row[8].isoformat() if row[8] else None
            })
        }
    
    if method == 'PATCH':
        body_data = json.loads(event.get('body', '{}'))
        application_id = body_data.get('id')
        new_status = body_data.get('status')
        
        if not application_id or not new_status:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'ID and status are required'})
            }
        
        if new_status not in ['pending', 'approved', 'rejected']:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Invalid status'})
            }
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            "UPDATE club_applications SET status = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING name, email, telegram, phone",
            (new_status, application_id)
        )
        
        result = cursor.fetchone()
        conn.commit()
        
        if not result:
            cursor.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Application not found'})
            }
        
        name, email, user_telegram, phone = result
        
        # Send welcome message if approved
        if new_status == 'approved':
            telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
            bot_username = os.environ.get('TELEGRAM_BOT_USERNAME', 'Muse_Club_bot')
            
            if telegram_token and user_telegram:
                # Check if user is subscribed to bot
                cursor.execute(
                    "SELECT telegram_chat_id FROM subscribers WHERE telegram = %s AND is_active = true",
                    (user_telegram,)
                )
                subscriber = cursor.fetchone()
                
                username_clean = user_telegram.replace('@', '').strip()
                
                if subscriber and subscriber[0]:
                    # User is subscribed - send direct message
                    chat_id = subscriber[0]
                    welcome_text = f"""🎉 Поздравляем, {name}!

Ваша заявка на вступление в клуб MUSE одобрена! 

Добро пожаловать в наше сообщество женщин из сферы бизнеса, культуры, науки и искусства.

Что дальше?
✨ Вы будете получать уведомления о всех мероприятиях
🎫 Регистрируйтесь на события первыми
💫 Общайтесь с единомышленницами

До встречи на наших мероприятиях! 🌟"""
                    
                    url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
                    request_data = {
                        'chat_id': chat_id,
                        'text': welcome_text
                    }
                    
                    data = urllib.parse.urlencode(request_data).encode()
                    
                    try:
                        response = urllib.request.urlopen(url, data=data)
                        print(f"Welcome message sent to {name} ({user_telegram}): {response.read().decode()}")
                    except Exception as e:
                        print(f"Failed to send welcome message: {str(e)}")
                else:
                    # User not subscribed - send message to user via username with subscribe button
                    bot_link = f'https://t.me/{bot_username}?start=approved'
                    
                    welcome_text = f"""🎉 Поздравляем, {name}!

Ваша заявка на вступление в клуб MUSE одобрена! 

Добро пожаловать в наше сообщество женщин из сферы бизнеса, культуры, науки и искусства.

Подпишитесь на бота, чтобы получать уведомления о мероприятиях и не пропустить важные события! 🔔"""
                    
                    url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
                    
                    keyboard = {
                        'inline_keyboard': [[
                            {
                                'text': '🔔 Подписаться на уведомления',
                                'url': bot_link
                            }
                        ]]
                    }
                    
                    request_data = {
                        'chat_id': f'@{username_clean}',
                        'text': welcome_text,
                        'reply_markup': json.dumps(keyboard)
                    }
                    
                    data = urllib.parse.urlencode(request_data).encode()
                    
                    try:
                        response = urllib.request.urlopen(url, data=data)
                        print(f"Welcome message with subscribe button sent to {name} (@{username_clean}): {response.read().decode()}")
                    except Exception as e:
                        print(f"Failed to send welcome message to @{username_clean}: {str(e)}")
                        
                        # If failed to send via username, notify admin
                        telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
                        if telegram_chat_id:
                            invite_message = f"🎉 Ваша заявка в клуб MUSE одобрена! Добро пожаловать!\n\nПодпишитесь на бота для уведомлений о мероприятиях:\n{bot_link}"
                            
                            admin_notification = f"""✅ Заявка одобрена: {name}

⚠️ Не удалось отправить приветственное сообщение через @{username_clean}
Возможно, username неверный или пользователь ограничил сообщения.

Пригласите участницу вручную:"""
                            
                            keyboard = {
                                'inline_keyboard': [[
                                    {
                                        'text': '📲 Открыть чат',
                                        'url': f'https://t.me/{username_clean}'
                                    }
                                ]]
                            }
                            
                            request_data = {
                                'chat_id': telegram_chat_id,
                                'text': admin_notification,
                                'reply_markup': json.dumps(keyboard)
                            }
                            
                            data = urllib.parse.urlencode(request_data).encode()
                            
                            try:
                                urllib.request.urlopen(url, data=data)
                                print(f"Admin notification sent about failed message to @{username_clean}")
                            except Exception as e2:
                                print(f"Failed to send admin notification: {str(e2)}")
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'success': True,
                'status': new_status,
                'name': name,
                'email': email
            })
        }
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'})
    }
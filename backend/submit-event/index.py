import json
import os
from datetime import datetime, timezone, timedelta
from typing import Dict, Any
from google.oauth2 import service_account
from googleapiclient.discovery import build
import urllib.request
import urllib.parse
import psycopg2

SPREADSHEET_ID = '1kJpQ3gNX5Ls47gLsd75lFH9MtxSiaigilkzYR_xBVuk'
SHEET_NAME = 'Events'

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Submit event registration to Google Sheets
    Args: event with httpMethod, body
    Returns: HTTP response with success status
    '''
    method: str = event.get('httpMethod', 'GET')
    
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
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    # Проверяем доступность мест в базе данных
    database_url = os.environ.get('DATABASE_URL')
    if database_url:
        try:
            conn = psycopg2.connect(database_url)
            cur = conn.cursor()
            
            # Находим событие по названию и проверяем места
            event_title = body_data.get('event', '')
            cur.execute("""
                SELECT id, seats, registered_count 
                FROM events 
                WHERE title = %s
            """, (event_title,))
            
            result = cur.fetchone()
            if result:
                event_id, total_seats, registered = result
                available_seats = total_seats - (registered or 0)
                
                # Если мест не осталось - отклоняем регистрацию
                if available_seats <= 0:
                    cur.close()
                    conn.close()
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({
                            'error': 'Мест не осталось',
                            'message': 'К сожалению, все места на это событие уже заняты'
                        })
                    }
                
                # Увеличиваем счетчик зарегистрированных
                cur.execute("""
                    UPDATE events 
                    SET registered_count = COALESCE(registered_count, 0) + 1
                    WHERE id = %s
                    RETURNING registered_count
                """, (event_id,))
                
                new_count = cur.fetchone()[0]
                conn.commit()
                print(f"✅ Registered count updated: {new_count}/{total_seats}")
            
            cur.close()
            conn.close()
        except Exception as e:
            print(f"⚠️ Database check failed: {str(e)}")
            # Продолжаем регистрацию даже если проверка БД не удалась
    
    credentials_json = os.environ.get('GOOGLE_SERVICE_ACCOUNT')
    if not credentials_json:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Service account not configured'})
        }
    
    credentials_info = json.loads(credentials_json)
    credentials = service_account.Credentials.from_service_account_info(
        credentials_info,
        scopes=['https://www.googleapis.com/auth/spreadsheets']
    )
    
    service = build('sheets', 'v4', credentials=credentials)
    
    try:
        result = service.spreadsheets().values().get(
            spreadsheetId=SPREADSHEET_ID,
            range=f'{SHEET_NAME}!A1:G1'
        ).execute()
        
        values = result.get('values', [])
        if not values or len(values) == 0:
            headers = [['Дата и время', 'Событие', 'Имя', 'Email', 'Телефон', 'Telegram', 'Сообщение']]
            service.spreadsheets().values().update(
                spreadsheetId=SPREADSHEET_ID,
                range=f'{SHEET_NAME}!A1:G1',
                valueInputOption='RAW',
                body={'values': headers}
            ).execute()
    except Exception as e:
        pass
    
    moscow_tz = timezone(timedelta(hours=3))
    timestamp = datetime.now(moscow_tz).strftime('%Y-%m-%d %H:%M:%S')
    row_data = [
        timestamp,
        body_data.get('event', ''),
        body_data.get('name', ''),
        body_data.get('email', ''),
        body_data.get('phone', ''),
        body_data.get('telegram', ''),
        body_data.get('message', '')
    ]
    
    service.spreadsheets().values().append(
        spreadsheetId=SPREADSHEET_ID,
        range=f'{SHEET_NAME}!A:G',
        valueInputOption='RAW',
        body={'values': [row_data]}
    ).execute()
    
    # Сохраняем подписчика в базу данных и отправляем уведомление
    registered_user_chat_id = None
    if database_url:
        try:
            conn = psycopg2.connect(database_url)
            cur = conn.cursor()
            
            # Проверяем, есть ли пользователь с таким telegram уже в боте
            user_telegram = body_data.get('telegram', '').strip()
            if user_telegram:
                cur.execute(
                    """
                    SELECT telegram_chat_id 
                    FROM subscribers 
                    WHERE telegram = %s AND telegram_chat_id IS NOT NULL 
                    ORDER BY subscribed_at DESC 
                    LIMIT 1
                    """,
                    (user_telegram,)
                )
                result = cur.fetchone()
                if result:
                    registered_user_chat_id = result[0]
                    print(f"✅ Found existing user with chat_id: {registered_user_chat_id}")
            
            cur.execute(
                """
                INSERT INTO subscribers (name, email, phone, telegram, subscribed_at, is_active, event_id)
                VALUES (%s, %s, %s, %s, %s, %s, (SELECT id FROM events WHERE title = %s LIMIT 1))
                ON CONFLICT DO NOTHING
                """,
                (
                    body_data.get('name', ''),
                    body_data.get('email', ''),
                    body_data.get('phone', ''),
                    body_data.get('telegram', ''),
                    datetime.now(timezone(timedelta(hours=3))),
                    True,
                    body_data.get('event', '')
                )
            )
            
            conn.commit()
            cur.close()
            conn.close()
            print("✅ Subscriber saved to database")
        except Exception as e:
            print(f"⚠️ Database save error: {str(e)}")
    
    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    print(f"Telegram token exists: {bool(telegram_token)}")
    print(f"Telegram chat_id: {telegram_chat_id}")
    
    if telegram_token and telegram_chat_id:
        user_telegram = body_data.get('telegram', '').replace('@', '').strip()
        
        user_in_bot = False
        if database_url and user_telegram:
            try:
                conn = psycopg2.connect(database_url)
                cur = conn.cursor()
                
                cur.execute(
                    "SELECT COUNT(*) FROM subscribers WHERE telegram = %s AND telegram_chat_id IS NOT NULL AND is_active = true",
                    (body_data.get('telegram', ''),)
                )
                count = cur.fetchone()[0]
                user_in_bot = count > 0
                
                cur.close()
                conn.close()
                print(f"User {user_telegram} in bot: {user_in_bot}")
            except Exception as e:
                print(f"Error checking user in bot: {str(e)}")
        
        admin_message = f"""🎉 Новая регистрация на событие

📅 Событие: {body_data.get('event', '')}
👤 Имя: {body_data.get('name', '')}
📧 Email: {body_data.get('email', '')}
📱 Телефон: {body_data.get('phone', '')}
💬 Telegram: {body_data.get('telegram', '')}
📝 Сообщение: {body_data.get('message', '')}

🕐 Время: {timestamp}"""
        
        url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
        
        bot_username = os.environ.get('TELEGRAM_BOT_USERNAME', 'Muse_Club_bot')
        bot_link = f'https://t.me/{bot_username}?start=event'
        
        request_data = {
            'chat_id': telegram_chat_id,
            'text': admin_message
        }
        
        if user_telegram and not user_in_bot:
            invite_message = f"Вы зарегистрированы на событие в клубе MUSE! ✅\n\nПодпишитесь на бота для напоминаний:\n{bot_link}"
            
            keyboard = {
                'inline_keyboard': [[
                    {
                        'text': '📲 Пригласить в бот',
                        'url': f'https://t.me/{user_telegram}?text={urllib.parse.quote(invite_message)}'
                    }
                ]]
            }
            
            request_data['reply_markup'] = json.dumps(keyboard)
        
        data = urllib.parse.urlencode(request_data).encode()
        
        try:
            response = urllib.request.urlopen(url, data=data)
            result = response.read().decode()
            print(f"Admin notification sent: {result}")
        except Exception as e:
            print(f"Failed to send admin notification: {str(e)}")
        
        # Отправляем уведомление пользователю, если он уже в боте
        if registered_user_chat_id:
            user_message = f"""✅ Вы успешно зарегистрированы на событие!

📅 Событие: {body_data.get('event', '')}
👤 Имя: {body_data.get('name', '')}
📧 Email: {body_data.get('email', '')}

Мы отправим вам напоминание перед началом события."""
            
            user_request_data = {
                'chat_id': registered_user_chat_id,
                'text': user_message,
                'parse_mode': 'HTML'
            }
            
            data_user = urllib.parse.urlencode(user_request_data).encode()
            
            try:
                response = urllib.request.urlopen(url, data=data_user)
                result = response.read().decode()
                print(f"✅ User notification sent to chat_id {registered_user_chat_id}: {result}")
            except Exception as e:
                print(f"⚠️ Failed to send user notification: {str(e)}")
    else:
        print("Telegram credentials missing!")
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'success': True, 'message': 'Event registration submitted'})
    }
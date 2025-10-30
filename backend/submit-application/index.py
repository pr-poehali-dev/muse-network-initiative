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
SHEET_NAME = 'Invite'

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Submit join club application to Google Sheets
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
    print(f'Received application data: {body_data}')
    
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
            range=f'{SHEET_NAME}!A1:F1'
        ).execute()
        
        values = result.get('values', [])
        if not values or len(values) == 0:
            headers = [['Дата и время', 'Имя', 'Email', 'Телефон', 'Telegram', 'Сообщение']]
            service.spreadsheets().values().update(
                spreadsheetId=SPREADSHEET_ID,
                range=f'{SHEET_NAME}!A1:F1',
                valueInputOption='RAW',
                body={'values': headers}
            ).execute()
    except Exception as e:
        pass
    
    moscow_tz = timezone(timedelta(hours=3))
    timestamp = datetime.now(moscow_tz).strftime('%Y-%m-%d %H:%M:%S')
    row_data = [
        timestamp,
        body_data.get('name', ''),
        body_data.get('email', ''),
        body_data.get('phone', ''),
        body_data.get('telegram', ''),
        body_data.get('message', '')
    ]
    
    try:
        result = service.spreadsheets().values().append(
            spreadsheetId=SPREADSHEET_ID,
            range=f'{SHEET_NAME}!A:F',
            valueInputOption='RAW',
            body={'values': [row_data]}
        ).execute()
        print(f'Successfully added to Google Sheets: {result}')
    except Exception as e:
        print(f'Error writing to Google Sheets: {str(e)}')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Failed to write to Google Sheets: {str(e)}'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if database_url:
        try:
            conn = psycopg2.connect(database_url)
            cur = conn.cursor()
            
            cur.execute(
                """
                INSERT INTO subscribers (name, email, phone, telegram, subscribed_at, is_active)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
                """,
                (
                    body_data.get('name', ''),
                    body_data.get('email', ''),
                    body_data.get('phone', ''),
                    body_data.get('telegram', ''),
                    datetime.now(timezone(timedelta(hours=3))),
                    True
                )
            )
            
            conn.commit()
            cur.close()
            conn.close()
            print("Subscriber saved to database")
        except Exception as e:
            print(f"Database error: {str(e)}")
    
    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    print(f"Telegram token exists: {bool(telegram_token)}")
    print(f"Telegram chat_id: {telegram_chat_id}")
    
    if telegram_token and telegram_chat_id:
        user_telegram = body_data.get('telegram', '').replace('@', '').strip()
        
        bot_username = "Muse_Club_bot"
        bot_link = f"https://t.me/{bot_username}?start=subscribe"
        
        admin_message = f"""🆕 Новая заявка на вступление в клуб MUSE

👤 Имя: {body_data.get('name', '')}
📧 Email: {body_data.get('email', '')}
📱 Телефон: {body_data.get('phone', '')}
💬 Telegram: {body_data.get('telegram', '')}
📝 Сообщение: {body_data.get('message', '')}

🕐 Время: {timestamp}

💡 Отправьте пользователю ссылку для подписки на уведомления:
{bot_link}"""
        
        url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
        data = urllib.parse.urlencode({
            'chat_id': telegram_chat_id,
            'text': admin_message
        }).encode()
        
        try:
            response = urllib.request.urlopen(url, data=data)
            result = response.read().decode()
            print(f"Telegram API response: {result}")
        except Exception as e:
            print(f"Telegram error: {str(e)}")
    else:
        print("Telegram credentials missing!")
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'success': True, 'message': 'Application submitted'})
    }
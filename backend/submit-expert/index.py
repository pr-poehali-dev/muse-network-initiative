import json
import os
from datetime import datetime
from typing import Dict, Any
from google.oauth2 import service_account
from googleapiclient.discovery import build
import urllib.request
import urllib.parse

SPREADSHEET_ID = '1kJpQ3gNX5Ls47gLsd75lFH9MtxSiaigilkzYR_xBVuk'
SHEET_NAME = 'Experts'

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Submit expert application to Google Sheets
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
            headers = [['Дата и время', 'Имя', 'Email', 'Телефон', 'Telegram', 'Экспертиза', 'Сообщение']]
            service.spreadsheets().values().update(
                spreadsheetId=SPREADSHEET_ID,
                range=f'{SHEET_NAME}!A1:G1',
                valueInputOption='RAW',
                body={'values': headers}
            ).execute()
    except Exception as e:
        pass
    
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    row_data = [
        timestamp,
        body_data.get('name', ''),
        body_data.get('email', ''),
        body_data.get('phone', ''),
        body_data.get('telegram', ''),
        body_data.get('expertise', ''),
        body_data.get('message', '')
    ]
    
    service.spreadsheets().values().append(
        spreadsheetId=SPREADSHEET_ID,
        range=f'{SHEET_NAME}!A:G',
        valueInputOption='RAW',
        body={'values': [row_data]}
    ).execute()
    
    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if telegram_token and telegram_chat_id:
        message = f"""👩‍🏫 Новая заявка стать экспертом

👤 Имя: {body_data.get('name', '')}
📧 Email: {body_data.get('email', '')}
📱 Телефон: {body_data.get('phone', '')}
💬 Telegram: {body_data.get('telegram', '')}
🎯 Экспертиза: {body_data.get('expertise', '')}
📝 Сообщение: {body_data.get('message', '')}

🕐 Время: {timestamp}"""
        
        url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
        data = urllib.parse.urlencode({
            'chat_id': telegram_chat_id,
            'text': message,
            'parse_mode': 'HTML'
        }).encode()
        
        try:
            urllib.request.urlopen(url, data=data)
        except Exception as e:
            pass
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'success': True, 'message': 'Expert application submitted'})
    }
'''
Business: Administrative endpoint to clean up database tables (subscribers) and Google Sheets
Args: event - dict with httpMethod, body; context - object with request_id
Returns: HTTP response with cleanup results
'''

import json
import os
import psycopg2
from typing import Dict, Any
from google.oauth2 import service_account
from googleapiclient.discovery import build

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    headers = event.get('headers', {})
    admin_token = headers.get('x-admin-token') or headers.get('X-Admin-Token')
    
    expected_token = os.environ.get('ADMIN_SECRET_TOKEN')
    if not admin_token or admin_token != expected_token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    table = body_data.get('table')
    
    if table not in ['subscribers']:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid table name'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cur = conn.cursor()
    
    schema = 't_p41592697_muse_network_initiat'
    
    cur.execute(f'DELETE FROM {schema}.{table}')
    deleted_count = cur.rowcount
    
    cur.execute(f'ALTER SEQUENCE {schema}.{table}_id_seq RESTART WITH 1')
    
    cur.close()
    conn.close()
    
    sheets_cleaned = []
    
    credentials_json = os.environ.get('GOOGLE_SERVICE_ACCOUNT')
    if credentials_json:
        try:
            credentials_info = json.loads(credentials_json)
            credentials = service_account.Credentials.from_service_account_info(
                credentials_info,
                scopes=['https://www.googleapis.com/auth/spreadsheets']
            )
            
            service = build('sheets', 'v4', credentials=credentials)
            spreadsheet_id = '1kJpQ3gNX5Ls47gLsd75lFH9MtxSiaigilkzYR_xBVuk'
            
            sheet_configs = [
                {'name': 'Events', 'headers': ['Дата и время', 'Имя', 'Email', 'Телефон', 'Telegram', 'Название события']},
                {'name': 'Invite', 'headers': ['Дата и время', 'Имя', 'Email', 'Телефон', 'Telegram', 'Сообщение']},
                {'name': 'Experts', 'headers': ['Дата и время', 'Имя', 'Email', 'Телефон', 'Telegram', 'Сообщение']}
            ]
            
            for config in sheet_configs:
                try:
                    service.spreadsheets().values().clear(
                        spreadsheetId=spreadsheet_id,
                        range=f"{config['name']}!A2:Z"
                    ).execute()
                    
                    service.spreadsheets().values().update(
                        spreadsheetId=spreadsheet_id,
                        range=f"{config['name']}!A1:F1",
                        valueInputOption='RAW',
                        body={'values': [config['headers']]}
                    ).execute()
                    
                    sheets_cleaned.append(config['name'])
                except Exception as sheet_error:
                    print(f"Failed to clean sheet {config['name']}: {sheet_error}")
        except Exception as e:
            print(f"Failed to clean Google Sheets: {e}")
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'deleted': deleted_count,
            'table': table,
            'sheets_cleaned': sheets_cleaned,
            'message': f'Deleted {deleted_count} rows from {table}. Cleaned sheets: {", ".join(sheets_cleaned) if sheets_cleaned else "none"}'
        })
    }
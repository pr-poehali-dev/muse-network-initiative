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
            "UPDATE club_applications SET status = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING name, email",
            (new_status, application_id)
        )
        
        result = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        if not result:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Application not found'})
            }
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'success': True,
                'status': new_status,
                'name': result[0],
                'email': result[1]
            })
        }
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'})
    }
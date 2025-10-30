'''
Business: Subscribe/unsubscribe users to specific events or all events
Args: event with httpMethod, body containing telegram_chat_id and event_id (null = all events)
Returns: HTTP response with subscription status
'''

import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'DATABASE_URL not configured'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        telegram_chat_id = body_data.get('telegram_chat_id')
        event_id = body_data.get('event_id')
        
        print(f"📝 Request: method={method}, chat_id={telegram_chat_id}, event_id={event_id}")
        
        if not telegram_chat_id:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'telegram_chat_id is required'})
            }
        
        print(f"🔌 Connecting to database...")
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        print(f"✅ Connected to database")
        
        if method == 'POST':
            cur.execute("""
                INSERT INTO subscribers (telegram_chat_id, event_id, is_active, created_at)
                VALUES (%s, %s, true, NOW())
                RETURNING id
            """, (telegram_chat_id, event_id))
            
            subscription_id = cur.fetchone()[0]
            conn.commit()
            
            message = 'Подписка на все события активирована' if event_id is None else f'Подписка на событие #{event_id} активирована'
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'message': message,
                    'subscription_id': subscription_id
                })
            }
        
        elif method == 'DELETE':
            cur.execute("""
                INSERT INTO subscribers (telegram_chat_id, event_id, is_active, created_at)
                VALUES (%s, %s, false, NOW())
                RETURNING id
            """, (telegram_chat_id, event_id))
            
            unsub_id = cur.fetchone()[0]
            conn.commit()
            
            message = 'Отписка от всех событий' if event_id is None else f'Отписка от события #{event_id}'
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'message': message
                })
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
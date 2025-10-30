import json
import os
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
                conn = psycopg2.connect(database_url)
                cur = conn.cursor()
                
                cur.execute("""
                    UPDATE subscribers 
                    SET telegram_chat_id = %s 
                    WHERE telegram ILIKE %s AND is_active = true
                """, (chat_id, f'%{username}%'))
                
                updated = cur.rowcount
                conn.commit()
                cur.close()
                conn.close()
                
                print(f"Updated {updated} subscribers with chat_id {chat_id}")
        
        elif 'callback_query' in update:
            callback = update['callback_query']
            chat_id = callback['message']['chat']['id']
            data = callback.get('data', '')
            username = callback['from'].get('username', '')
            
            print(f"Callback from {username} (chat_id: {chat_id}): {data}")
            
            if data == 'subscribe':
                conn = psycopg2.connect(database_url)
                cur = conn.cursor()
                
                cur.execute("""
                    UPDATE subscribers 
                    SET telegram_chat_id = %s, is_active = true
                    WHERE telegram ILIKE %s
                """, (chat_id, f'%{username}%'))
                
                updated = cur.rowcount
                
                if updated == 0:
                    cur.execute("""
                        INSERT INTO subscribers (telegram, telegram_chat_id, is_active)
                        VALUES (%s, %s, %s)
                    """, (f'@{username}', chat_id, True))
                
                conn.commit()
                cur.close()
                conn.close()
                
                print(f"Subscribed user {username} with chat_id {chat_id}")
            
            elif data == 'unsubscribe':
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
                
                print(f"Unsubscribed chat_id {chat_id}")
        
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

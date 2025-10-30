'''
Business: Manage MUSE TV page content
Args: event with httpMethod, body (for POST/PUT)
Returns: HTTP response with MUSE TV content
'''

import json
import os
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
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
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        if method == 'GET':
            cur.execute("SELECT * FROM muse_tv_content ORDER BY id DESC LIMIT 1")
            row = cur.fetchone()
            
            content = None
            if row:
                content = {
                    'id': row[0],
                    'hero_title': row[1],
                    'hero_subtitle': row[2],
                    'hero_description': row[3],
                    'live_stream_enabled': row[4],
                    'live_stream_url': row[5],
                    'live_stream_title': row[6]
                }
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'content': content})
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            content_id = body_data.get('id')
            data = body_data.get('data', {})
            
            cur.execute("""
                UPDATE muse_tv_content SET
                    hero_title = %s,
                    hero_subtitle = %s,
                    hero_description = %s,
                    live_stream_enabled = %s,
                    live_stream_url = %s,
                    live_stream_title = %s,
                    updated_at = NOW()
                WHERE id = %s
            """, (
                data.get('hero_title'),
                data.get('hero_subtitle'),
                data.get('hero_description'),
                data.get('live_stream_enabled'),
                data.get('live_stream_url'),
                data.get('live_stream_title'),
                content_id
            ))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'success': True})
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

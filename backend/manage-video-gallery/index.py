'''
Business: Manage video gallery items (CRUD operations for Kinescope videos)
Args: event with httpMethod, body, queryStringParameters
Returns: HTTP response with video data or operation result
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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        if method == 'GET':
            cur.execute("""
                SELECT id, title, description, kinescope_id, 
                       thumbnail_url, display_order
                FROM video_gallery
                WHERE display_order > 0
                ORDER BY display_order ASC, created_at DESC
            """)
            
            rows = cur.fetchall()
            items = []
            for row in rows:
                items.append({
                    'id': row[0],
                    'title': row[1],
                    'description': row[2],
                    'kinescope_id': row[3],
                    'thumbnail_url': row[4],
                    'display_order': row[5]
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'items': items})
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            cur.execute("""
                INSERT INTO video_gallery 
                (title, description, kinescope_id, thumbnail_url, display_order)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
            """, (
                body_data.get('title', ''),
                body_data.get('description', ''),
                body_data['kinescope_id'],
                body_data.get('thumbnail_url'),
                body_data.get('display_order', 0)
            ))
            
            item_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'success': True, 'id': item_id})
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            item_id = body_data.get('id')
            
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'id is required'})
                }
            
            cur.execute("""
                UPDATE video_gallery
                SET title = %s, description = %s, kinescope_id = %s,
                    thumbnail_url = %s, display_order = %s,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            """, (
                body_data.get('title', ''),
                body_data.get('description', ''),
                body_data['kinescope_id'],
                body_data.get('thumbnail_url'),
                body_data.get('display_order', 0),
                item_id
            ))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'success': True})
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters', {})
            item_id = params.get('id')
            
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'id is required'})
                }
            
            cur.execute("DELETE FROM video_gallery WHERE id = %s", (item_id,))
            conn.commit()
            
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

'''
Business: Manage gallery media items (CRUD operations)
Args: event with httpMethod, body, queryStringParameters
Returns: HTTP response with gallery data or operation result
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
                SELECT id, title, description, media_url, media_type, 
                       thumbnail_url, span_class, display_order
                FROM gallery_items
                ORDER BY display_order ASC, created_at DESC
            """)
            
            rows = cur.fetchall()
            items = []
            for row in rows:
                items.append({
                    'id': row[0],
                    'title': row[1],
                    'description': row[2],
                    'media_url': row[3],
                    'media_type': row[4],
                    'thumbnail_url': row[5],
                    'span_class': row[6],
                    'display_order': row[7]
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
                INSERT INTO gallery_items 
                (title, description, media_url, media_type, thumbnail_url, span_class, display_order)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                body_data.get('title', ''),
                body_data.get('description', ''),
                body_data['media_url'],
                body_data['media_type'],
                body_data.get('thumbnail_url'),
                body_data.get('span_class', 'col-span-1 row-span-1'),
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
                UPDATE gallery_items
                SET title = %s, description = %s, media_url = %s, media_type = %s,
                    thumbnail_url = %s, span_class = %s, display_order = %s,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            """, (
                body_data.get('title', ''),
                body_data.get('description', ''),
                body_data['media_url'],
                body_data['media_type'],
                body_data.get('thumbnail_url'),
                body_data.get('span_class', 'col-span-1 row-span-1'),
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
            
            cur.execute("DELETE FROM gallery_items WHERE id = %s", (item_id,))
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
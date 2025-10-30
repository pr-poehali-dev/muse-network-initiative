'''
Business: CRUD operations for speakers - create, read, update, delete speakers
Args: event - dict with httpMethod, body
      context - object with attributes: request_id, function_name
Returns: HTTP response with speaker data or success status
'''
import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
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
    
    dsn = os.environ.get('DATABASE_URL')
    
    try:
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Database connection failed: {str(e)}'})
        }
    
    # GET - list all speakers
    if method == 'GET':
        cur.execute("SELECT id, name, role, image, bio, display_order FROM speakers ORDER BY display_order, name")
        rows = cur.fetchall()
        
        speakers = []
        for row in rows:
            speakers.append({
                'id': row[0],
                'name': row[1],
                'role': row[2],
                'image': row[3],
                'bio': row[4],
                'display_order': row[5]
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'speakers': speakers})
        }
    
    # POST - create new speaker
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        name = body_data.get('name', '')
        role = body_data.get('role', '')
        image = body_data.get('image', '')
        bio = body_data.get('bio', '')
        display_order = body_data.get('display_order', 0)
        
        if not name:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Name is required'})
            }
        
        cur.execute(
            "INSERT INTO speakers (name, role, image, bio, display_order) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (name, role, image, bio, display_order)
        )
        speaker_id = cur.fetchone()[0]
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
            'body': json.dumps({'success': True, 'id': speaker_id})
        }
    
    # PUT - update speaker
    if method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        
        speaker_id = body_data.get('id')
        if not speaker_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Speaker ID is required'})
            }
        
        name = body_data.get('name', '')
        role = body_data.get('role', '')
        image = body_data.get('image', '')
        bio = body_data.get('bio', '')
        display_order = body_data.get('display_order', 0)
        
        cur.execute(
            "UPDATE speakers SET name = %s, role = %s, image = %s, bio = %s, display_order = %s WHERE id = %s",
            (name, role, image, bio, display_order, speaker_id)
        )
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
    
    # DELETE - remove speaker
    if method == 'DELETE':
        try:
            body_data = json.loads(event.get('body', '{}'))
            
            speaker_id = body_data.get('id')
            if not speaker_id:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Speaker ID is required'})
                }
            
            cur.execute("DELETE FROM event_speakers WHERE speaker_id = %s", (speaker_id,))
            cur.execute("DELETE FROM speakers WHERE id = %s", (speaker_id,))
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
        except Exception as e:
            if 'cur' in locals():
                cur.close()
            if 'conn' in locals():
                conn.close()
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': f'Delete failed: {str(e)}'})
            }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
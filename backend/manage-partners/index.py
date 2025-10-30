'''
Business: Manage club partners (logos for running line)
Args: event with httpMethod, body, queryStringParameters
Returns: HTTP response with partners data
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
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        if method == 'GET':
            cur.execute("SELECT id, name, logo_url, website_url, display_order, is_active FROM partners WHERE is_active = true ORDER BY display_order, id")
            rows = cur.fetchall()
            partners = []
            for row in rows:
                partners.append({
                    'id': row[0],
                    'name': row[1],
                    'logo_url': row[2],
                    'website_url': row[3],
                    'display_order': row[4],
                    'is_active': row[5]
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
                'body': json.dumps({'partners': partners})
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            data = body_data.get('data', {})
            
            cur.execute("""
                INSERT INTO partners (name, logo_url, website_url, display_order, is_active)
                VALUES (%s, %s, %s, %s, %s) RETURNING id
            """, (
                data.get('name'),
                data.get('logo_url'),
                data.get('website_url'),
                data.get('display_order', 0),
                data.get('is_active', True)
            ))
            new_id = cur.fetchone()[0]
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
                'body': json.dumps({'success': True, 'id': new_id})
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            partner_id = body_data.get('id')
            data = body_data.get('data', {})
            
            cur.execute("""
                UPDATE partners SET
                    name = %s,
                    logo_url = %s,
                    website_url = %s,
                    display_order = %s,
                    is_active = %s
                WHERE id = %s
            """, (
                data.get('name'),
                data.get('logo_url'),
                data.get('website_url'),
                data.get('display_order'),
                data.get('is_active'),
                partner_id
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
        
        elif method == 'DELETE':
            body_data = json.loads(event.get('body', '{}'))
            partner_id = body_data.get('id')
            
            cur.execute("DELETE FROM partners WHERE id = %s", (partner_id,))
            
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

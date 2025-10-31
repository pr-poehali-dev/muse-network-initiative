import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage homepage content sections
    Args: event with httpMethod (GET/PUT), body for updates
    Returns: Homepage content sections
    '''
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
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Database connection not configured'})
        }
    
    conn = psycopg2.connect(dsn)
    
    try:
        if method == 'GET':
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute('SELECT section, content FROM homepage_content ORDER BY section')
                rows = cur.fetchall()
                
                result = {}
                for row in rows:
                    result[row['section']] = row['content']
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'content': result})
                }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            section = body_data.get('section')
            content = body_data.get('content')
            
            print(f'PUT request - section: {section}, content: {content}')
            
            if not section or not content:
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Section and content are required'})
                }
            
            with conn.cursor() as cur:
                cur.execute('''
                    INSERT INTO homepage_content (section, content, updated_at)
                    VALUES (%s, %s, CURRENT_TIMESTAMP)
                    ON CONFLICT (section)
                    DO UPDATE SET content = EXCLUDED.content, updated_at = CURRENT_TIMESTAMP
                ''', (section, json.dumps(content)))
                conn.commit()
            
            print(f'Successfully updated section: {section}')
            
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'isBase64Encoded': False,
                'body': json.dumps({'message': 'Content updated successfully'})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    finally:
        conn.close()
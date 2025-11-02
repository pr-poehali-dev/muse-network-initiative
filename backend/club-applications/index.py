'''
Business: Управление заявками на вступление в клуб MUSE
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with application data
'''

import json
import os
import psycopg2
from typing import Dict, Any, Optional
from datetime import datetime

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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
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
        
        if not email:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Email parameter is required'})
            }
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
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
                'updated_at': row[8].isoformat()
            })
        }
    
    return {
        'statusCode': 405,
        'headers': headers,
        'body': json.dumps({'error': 'Method not allowed'})
    }

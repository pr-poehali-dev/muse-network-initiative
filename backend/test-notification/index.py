import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Test notification system by updating event
    Args: event with httpMethod
    Returns: HTTP response with update status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    try:
        url = 'https://functions.poehali.dev/9a03b227-0396-4821-b715-378637815ee2'
        
        event_data = {
            'id': 1,
            'title': 'Мастер-класс по медитации',
            'date': '2025-12-05',
            'time': '20:00',
            'description': 'Приглашаем на вечерний мастер-класс по медитации и осознанности. Практика подойдет как новичкам, так и опытным практикующим.',
            'type': 'workshop',
            'location': 'Студия MUSE, Санкт-Петербург',
            'seats': 25,
            'speakers': []
        }
        
        data = json.dumps(event_data).encode('utf-8')
        
        req = urllib.request.Request(
            url,
            data=data,
            headers={'Content-Type': 'application/json'},
            method='PUT'
        )
        
        response = urllib.request.urlopen(req)
        result = json.loads(response.read().decode())
        
        print(f"✅ Event updated: {result}")
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'message': 'Event updated, notification should be sent',
                'result': result
            })
        }
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }
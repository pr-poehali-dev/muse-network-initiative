"""
Business: Proxy для получения метаданных видео с Rutube
Args: event с httpMethod и queryStringParameters (video_id)
Returns: JSON с метаданными видео (title, description, thumbnail_url, duration, hits)
"""

import json
import urllib.request
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
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
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters', {})
    video_id = params.get('video_id')
    
    if not video_id:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'video_id parameter is required'}),
            'isBase64Encoded': False
        }
    
    rutube_url = f'https://rutube.ru/api/video/{video_id}/'
    
    req = urllib.request.Request(
        rutube_url,
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
    
    result = {
        'title': data.get('title'),
        'description': data.get('description'),
        'thumbnail_url': data.get('thumbnail_url'),
        'duration': data.get('duration'),
        'hits': data.get('hits')
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(result),
        'isBase64Encoded': False
    }

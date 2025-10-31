import json
import re
from typing import Dict, Any
from urllib.request import urlopen, Request
from urllib.parse import unquote

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Parse ImgBB URL to get direct image link
    Args: event with queryStringParameters.url
    Returns: JSON with direct_url
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
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters', {})
    url = params.get('url', '')
    
    if not url or 'ibb.co/' not in url:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Invalid ImgBB URL'})
        }
    
    try:
        req = Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        })
        with urlopen(req, timeout=15) as response:
            html = response.read().decode('utf-8')
        
        og_match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
        if og_match:
            direct_url = og_match.group(1)
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'isBase64Encoded': False,
                'body': json.dumps({'direct_url': direct_url})
            }
        
        img_match = re.search(r'<img[^>]+id="image-viewer-container"[^>]+src="([^"]+)"', html)
        if img_match:
            direct_url = img_match.group(1)
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'isBase64Encoded': False,
                'body': json.dumps({'direct_url': direct_url})
            }
        
        return {
            'statusCode': 404,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Could not find direct image URL in HTML'})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Parser error: {str(e)}'})
        }
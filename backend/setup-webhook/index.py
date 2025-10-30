import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Set up Telegram bot webhook URL
    Args: event with httpMethod
    Returns: HTTP response with webhook setup status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    if not telegram_token:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'TELEGRAM_BOT_TOKEN not configured'})
        }
    
    webhook_url = 'https://functions.poehali.dev/86d916fc-7e24-4e3d-af36-baf40ce0c304'
    
    if method == 'POST':
        try:
            url = f'https://api.telegram.org/bot{telegram_token}/setWebhook'
            data = urllib.parse.urlencode({
                'url': webhook_url,
                'drop_pending_updates': True
            }).encode()
            
            response = urllib.request.urlopen(url, data=data)
            result = json.loads(response.read().decode())
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'message': 'Webhook установлен',
                    'webhook_url': webhook_url,
                    'telegram_response': result
                })
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
    
    elif method == 'GET':
        try:
            url = f'https://api.telegram.org/bot{telegram_token}/getWebhookInfo'
            response = urllib.request.urlopen(url)
            result = json.loads(response.read().decode())
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps(result)
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
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }

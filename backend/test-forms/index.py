import json
import urllib.request
import urllib.parse
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Test all three forms by sending test data
    Args: event with httpMethod
    Returns: HTTP response with test results
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
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    results = {}
    
    test_data_join = {
        'name': 'Тестовая Заявка',
        'email': 'test@example.com',
        'phone': '+7 (999) 123-45-67',
        'telegram': '@testuser',
        'message': 'Тестовое сообщение для проверки формы вступления'
    }
    
    test_data_event = {
        'eventName': 'Тестовое мероприятие',
        'name': 'Тестовый Участник',
        'email': 'event@example.com',
        'phone': '+7 (999) 123-45-67',
        'telegram': '@eventuser',
        'message': 'Тестовая регистрация на событие'
    }
    
    test_data_expert = {
        'name': 'Тест Эксперт',
        'email': 'expert@example.com',
        'phone': '+7 (999) 123-45-67',
        'telegram': '@expertuser',
        'expertise': 'Тестирование форм',
        'message': 'Тестовая заявка стать экспертом'
    }
    
    urls = {
        'join': 'https://functions.poehali.dev/0dd49b02-038f-429e-b3a3-5fa01ff50b67',
        'event': 'https://functions.poehali.dev/facbc5c4-5036-4fe8-921d-4ed1fd70fb47',
        'expert': 'https://functions.poehali.dev/8ab02561-3cbe-42f7-9c3d-42f2c964f007'
    }
    
    test_data = {
        'join': test_data_join,
        'event': test_data_event,
        'expert': test_data_expert
    }
    
    for form_name, url in urls.items():
        try:
            data = json.dumps(test_data[form_name]).encode('utf-8')
            req = urllib.request.Request(
                url,
                data=data,
                headers={'Content-Type': 'application/json'}
            )
            
            response = urllib.request.urlopen(req, timeout=10)
            response_data = response.read().decode('utf-8')
            
            results[form_name] = {
                'status': 'success',
                'code': response.getcode(),
                'response': response_data
            }
            print(f'{form_name} form test: SUCCESS - {response.getcode()}')
            
        except urllib.error.HTTPError as e:
            error_body = e.read().decode('utf-8')
            results[form_name] = {
                'status': 'error',
                'code': e.code,
                'error': error_body
            }
            print(f'{form_name} form test: HTTP ERROR {e.code} - {error_body}')
            
        except Exception as e:
            results[form_name] = {
                'status': 'error',
                'error': str(e)
            }
            print(f'{form_name} form test: ERROR - {str(e)}')
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'message': 'Form tests completed',
            'results': results
        }, ensure_ascii=False)
    }

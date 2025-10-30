import json
import os
from typing import Dict, Any
import psycopg2

EVENTS_DATA = [
    {
        "title": "Off-line завтрак в Малых Корелах",
        "date": "2025-11-03",
        "time": "10:00",
        "description": "Приглашаем на уютный завтрак на природе в музее деревянного зодчества Малые Корелы. Живое общение, вдохновение и северная атмосфера",
        "type": "offline",
        "location": "Малые Корелы, Архангельская область",
        "seats": 30,
        "speakers": [
            {
                "name": "Карина Ляшева",
                "role": "Основательница клуба Muse",
                "image": "https://cdn.poehali.dev/files/aa430451-7e67-4a2d-b073-2c8fc22f6d71.jpg"
            }
        ]
    },
    {
        "title": "Терапевтическая практика в группе",
        "date": "2025-11-14",
        "time": "18:00",
        "description": "Мария Лазарева проведет групповую терапевтическую сессию. Безопасное пространство для работы с эмоциями и самопознания",
        "type": "guest",
        "location": "Психологический центр",
        "seats": 15,
        "speakers": [
            {
                "name": "Мария Лазарева",
                "role": "Психолог, психотерапевт",
                "image": "https://cdn.poehali.dev/files/15652b13-1d93-40d4-b392-b4b4bdaf51cc.jpg"
            }
        ]
    },
    {
        "title": "Как найти свой стиль и интегрировать его в повседневный гардероб",
        "date": "2025-11-28",
        "time": "18:00",
        "description": "Юлия Самсонова расскажет, как определить свой уникальный стиль и создать гардероб, который подчеркнет вашу индивидуальность",
        "type": "guest",
        "location": "Бизнес-лаундж Muse",
        "seats": 25,
        "speakers": [
            {
                "name": "Юлия Самсонова",
                "role": "Стилист",
                "image": "https://cdn.poehali.dev/files/37231f0d-7f2c-44ec-a259-688241e59545.jpg"
            }
        ]
    },
    {
        "title": "Off-line творческий урок рисования",
        "date": "2025-12-12",
        "time": "18:00",
        "description": "Людмила Мерзлая проведет творческий урок рисования. Раскройте свой потенциал и создайте собственный шедевр в приятной компании",
        "type": "workshop",
        "location": "Арт-студия \"Муза\"",
        "seats": 20,
        "speakers": [
            {
                "name": "Людмила Мерзлая",
                "role": "Художница",
                "image": "https://cdn.poehali.dev/files/d43f8002-32ee-4d33-b31a-1522584b8d7a.jpg"
            }
        ]
    },
    {
        "title": "Что посетить в новогодние праздники в регионе? Топ 10 мест",
        "date": "2025-12-26",
        "time": "18:00",
        "description": "Екатерина Кузнецова, руководитель Центра развития туризма и культуры Архангельской области, представит топ-10 мест, которые обязательно стоит посетить в новогодние праздники",
        "type": "guest",
        "location": "Конференц-зал",
        "seats": 40,
        "speakers": [
            {
                "name": "Екатерина Кузнецова",
                "role": "Руководитель",
                "image": "https://cdn.poehali.dev/files/f4f78af3-467b-4528-ac10-d085a6eeb04b.jpg"
            }
        ]
    }
]

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Migrate events from code to database (one-time migration)
    Args: event with httpMethod
    Returns: HTTP response with migration status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
        
        migrated_count = 0
        
        for event_data in EVENTS_DATA:
            cur.execute("""
                SELECT id FROM events 
                WHERE title = %s AND date = %s
            """, (event_data['title'], event_data['date']))
            
            existing = cur.fetchone()
            
            if existing:
                print(f"Event already exists: {event_data['title']}")
                continue
            
            cur.execute("""
                INSERT INTO events (title, date, time, description, type, location, seats)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                event_data['title'],
                event_data['date'],
                event_data['time'],
                event_data['description'],
                event_data['type'],
                event_data['location'],
                event_data['seats']
            ))
            
            event_id = cur.fetchone()[0]
            
            for speaker in event_data.get('speakers', []):
                cur.execute("""
                    SELECT id FROM speakers 
                    WHERE name = %s AND role = %s
                """, (speaker['name'], speaker['role']))
                
                existing_speaker = cur.fetchone()
                
                if existing_speaker:
                    speaker_id = existing_speaker[0]
                else:
                    cur.execute("""
                        INSERT INTO speakers (name, role, image)
                        VALUES (%s, %s, %s)
                        RETURNING id
                    """, (speaker['name'], speaker['role'], speaker['image']))
                    
                    speaker_id = cur.fetchone()[0]
                
                cur.execute("""
                    INSERT INTO event_speakers (event_id, speaker_id)
                    VALUES (%s, %s)
                    ON CONFLICT DO NOTHING
                """, (event_id, speaker_id))
            
            migrated_count += 1
            print(f"Migrated event: {event_data['title']}")
        
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
            'body': json.dumps({
                'success': True,
                'migrated': migrated_count,
                'total': len(EVENTS_DATA)
            })
        }
    
    except Exception as e:
        print(f"Migration error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }

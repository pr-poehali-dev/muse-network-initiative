import json
import os
from datetime import datetime, timezone, timedelta
from typing import Dict, Any, List
import psycopg2
import urllib.request
import urllib.parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage events and send automatic Telegram notifications on changes
    Args: event with httpMethod, body (for POST/PUT), params (for GET/DELETE)
    Returns: HTTP response with event data or notification status
    '''
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
            cur.execute("""
                SELECT 
                    e.id, e.title, e.date, e.time, e.description, 
                    e.type, e.location, e.seats, e.registered_count,
                    e.is_paid, e.price,
                    json_agg(
                        json_build_object(
                            'name', s.name,
                            'role', s.role,
                            'image', s.image
                        )
                    ) FILTER (WHERE s.id IS NOT NULL) as speakers
                FROM events e
                LEFT JOIN event_speakers es ON e.id = es.event_id
                LEFT JOIN speakers s ON es.speaker_id = s.id
                GROUP BY e.id
                ORDER BY e.date ASC
            """)
            
            rows = cur.fetchall()
            events_list = []
            for row in rows:
                total_seats = row[7]
                registered = row[8] or 0
                is_paid = row[9]
                price = float(row[10]) if row[10] else None
                events_list.append({
                    'id': row[0],
                    'title': row[1],
                    'date': row[2].isoformat() if row[2] else None,
                    'time': row[3],
                    'description': row[4],
                    'type': row[5],
                    'location': row[6],
                    'seats': total_seats,
                    'registered_count': registered,
                    'available_seats': total_seats - registered,
                    'is_paid': is_paid,
                    'price': price,
                    'speakers': row[11] if row[11] else []
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
                'body': json.dumps({'events': events_list})
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            cur.execute("""
                INSERT INTO events (title, date, time, description, type, location, seats, is_paid, price)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                body_data.get('title'),
                body_data.get('date'),
                body_data.get('time'),
                body_data.get('description'),
                body_data.get('type'),
                body_data.get('location'),
                body_data.get('seats'),
                body_data.get('is_paid', False),
                body_data.get('price')
            ))
            
            event_id = cur.fetchone()[0]
            
            speakers = body_data.get('speakers', [])
            for speaker in speakers:
                cur.execute("""
                    INSERT INTO speakers (name, role, image)
                    VALUES (%s, %s, %s)
                    RETURNING id
                """, (speaker.get('name'), speaker.get('role'), speaker.get('image')))
                
                speaker_id = cur.fetchone()[0]
                
                cur.execute("""
                    INSERT INTO event_speakers (event_id, speaker_id)
                    VALUES (%s, %s)
                """, (event_id, speaker_id))
            
            cur.execute("""
                INSERT INTO event_changes (event_id, change_type, new_data)
                VALUES (%s, %s, %s)
            """, (event_id, 'created', json.dumps(body_data)))
            
            conn.commit()
            
            send_telegram_notification(
                'created',
                body_data,
                None
            )
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'success': True, 'event_id': event_id})
            }
        
        if method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            event_id = body_data.get('id')
            
            if not event_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Event ID required'})
                }
            
            cur.execute("""
                SELECT id, title, date, time, description, type, location, seats, 
                       created_at, updated_at, registered_count, is_paid, price
                FROM events WHERE id = %s
            """, (event_id,))
            old_event = cur.fetchone()
            
            if not old_event:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Event not found'})
                }
            
            old_data = {
                'title': old_event[1],
                'date': old_event[2].isoformat() if old_event[2] else None,
                'time': old_event[3],
                'location': old_event[6],
                'is_paid': old_event[11],
                'price': float(old_event[12]) if old_event[12] else None
            }
            
            cur.execute("""
                UPDATE events
                SET title = %s, date = %s, time = %s, description = %s,
                    type = %s, location = %s, seats = %s, is_paid = %s, price = %s, updated_at = %s
                WHERE id = %s
            """, (
                body_data.get('title'),
                body_data.get('date'),
                body_data.get('time'),
                body_data.get('description'),
                body_data.get('type'),
                body_data.get('location'),
                body_data.get('seats'),
                body_data.get('is_paid', False),
                body_data.get('price'),
                datetime.now(timezone.utc),
                event_id
            ))
            
            cur.execute("DELETE FROM event_speakers WHERE event_id = %s", (event_id,))
            
            cur.execute("""
                DELETE FROM speakers 
                WHERE id NOT IN (SELECT speaker_id FROM event_speakers)
            """)
            
            speakers = body_data.get('speakers', [])
            for speaker in speakers:
                if speaker.get('name'):
                    cur.execute("""
                        INSERT INTO speakers (name, role, image)
                        VALUES (%s, %s, %s)
                        RETURNING id
                    """, (speaker.get('name'), speaker.get('role'), speaker.get('image')))
                    
                    speaker_id = cur.fetchone()[0]
                    
                    cur.execute("""
                        INSERT INTO event_speakers (event_id, speaker_id)
                        VALUES (%s, %s)
                    """, (event_id, speaker_id))
            
            cur.execute("""
                INSERT INTO event_changes (event_id, change_type, old_data, new_data)
                VALUES (%s, %s, %s, %s)
            """, (event_id, 'updated', json.dumps(old_data), json.dumps(body_data)))
            
            conn.commit()
            
            send_telegram_notification(
                'updated',
                body_data,
                old_data
            )
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'success': True, 'message': 'Event updated and notifications sent'})
            }
        
        elif method == 'DELETE':
            body_data = json.loads(event.get('body', '{}'))
            event_id = body_data.get('id')
            
            if not event_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Event ID is required'})
                }
            
            cur.execute("SELECT * FROM events WHERE id = %s", (event_id,))
            event_row = cur.fetchone()
            
            if not event_row:
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Event not found'})
                }
            
            cur.execute("DELETE FROM event_changes WHERE event_id = %s", (event_id,))
            cur.execute("DELETE FROM event_speakers WHERE event_id = %s", (event_id,))
            cur.execute("DELETE FROM events WHERE id = %s", (event_id,))
            
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
                'body': json.dumps({'success': True, 'message': 'Event deleted'})
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
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }


def send_telegram_notification(change_type: str, new_data: Dict, old_data: Dict = None):
    '''Send Telegram notification to all subscribers'''
    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    database_url = os.environ.get('DATABASE_URL')
    
    if not telegram_token:
        print("⚠️ TELEGRAM_BOT_TOKEN not configured - notifications disabled")
        return
    
    if not database_url:
        print("⚠️ DATABASE_URL not configured")
        return
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        cur.execute("SELECT DISTINCT telegram_chat_id FROM subscribers WHERE is_active = true AND telegram_chat_id IS NOT NULL")
        subscribers = cur.fetchall()
        
        print(f"📬 Found {len(subscribers)} subscribers to notify")
        
        cur.close()
        conn.close()
        
        if change_type == 'created':
            speakers = new_data.get('speakers', [])
            speakers_text = ""
            if speakers:
                speakers_list = []
                for speaker in speakers:
                    name = speaker.get('name', '')
                    role = speaker.get('role', '')
                    if name:
                        speakers_list.append(f"   • <b>{name}</b>" + (f" — {role}" if role else ""))
                if speakers_list:
                    speakers_text = f"\n\n🎤 <b>Спикеры:</b>\n" + "\n".join(speakers_list)
            
            price_text = ""
            if new_data.get('is_paid') and new_data.get('price'):
                price_text = f"\n💰 Стоимость: <b>{new_data.get('price'):.0f} ₽</b>"
            elif not new_data.get('is_paid', False):
                price_text = "\n🎁 <b>Бесплатно</b>"
            
            message = f"""🎉 Новое мероприятие в клубе MUSE!

📌 <b>{new_data.get('title', '')}</b>
📅 Дата: {new_data.get('date', '')} в {new_data.get('time', '')}
📍 Место: {new_data.get('location', '')}
👥 Мест: {new_data.get('seats', '')}{price_text}{speakers_text}

{new_data.get('description', '')}

Регистрируйтесь скорее! ✨"""
        
        elif change_type == 'updated':
            changes = []
            changes_list = []
            
            if old_data.get('title') != new_data.get('title'):
                changes.append(f"📝 Название изменено:\n   <s>{old_data.get('title', '')}</s>\n   → <b>{new_data.get('title', '')}</b>")
                changes_list.append('название')
            
            if old_data.get('date') != new_data.get('date'):
                changes.append(f"📅 Дата изменена:\n   <s>{old_data.get('date', '')}</s>\n   → <b>{new_data.get('date', '')}</b>")
                changes_list.append('дата')
            
            if old_data.get('time') != new_data.get('time'):
                changes.append(f"⏰ Время изменено:\n   <s>{old_data.get('time', '')}</s>\n   → <b>{new_data.get('time', '')}</b>")
                changes_list.append('время')
            
            if old_data.get('location') != new_data.get('location'):
                changes.append(f"📍 Место изменено:\n   <s>{old_data.get('location', '')}</s>\n   → <b>{new_data.get('location', '')}</b>")
                changes_list.append('место')
            
            old_is_paid = old_data.get('is_paid', False)
            new_is_paid = new_data.get('is_paid', False)
            old_price = old_data.get('price')
            new_price = new_data.get('price')
            
            if old_is_paid != new_is_paid or old_price != new_price:
                if not old_is_paid and new_is_paid:
                    changes.append(f"💰 Событие стало платным: <b>{new_price:.0f} ₽</b>")
                    changes_list.append('цена')
                elif old_is_paid and not new_is_paid:
                    changes.append(f"🎁 Событие теперь бесплатное!")
                    changes_list.append('цена')
                elif old_is_paid and new_is_paid and old_price != new_price:
                    changes.append(f"💰 Цена изменена:\n   <s>{old_price:.0f} ₽</s>\n   → <b>{new_price:.0f} ₽</b>")
                    changes_list.append('цена')
            
            change_summary = ", ".join(changes_list) if changes_list else "информация"
            change_text = "\n\n".join(changes) if changes else "Обновлена информация о мероприятии"
            
            speakers = new_data.get('speakers', [])
            speakers_text = ""
            if speakers:
                speakers_list = []
                for speaker in speakers:
                    name = speaker.get('name', '')
                    role = speaker.get('role', '')
                    if name:
                        speakers_list.append(f"   • <b>{name}</b>" + (f" — {role}" if role else ""))
                if speakers_list:
                    speakers_text = f"\n🎤 <b>Спикеры:</b>\n" + "\n".join(speakers_list)
            
            description = new_data.get('description', '')
            description_text = f"\n\n📝 {description}" if description else ""
            
            price_info = ""
            if new_data.get('is_paid') and new_data.get('price'):
                price_info = f"\n💰 Стоимость: <b>{new_data.get('price'):.0f} ₽</b>"
            elif not new_data.get('is_paid', False):
                price_info = "\n🎁 <b>Бесплатно</b>"
            
            message = f"""⚠️ <b>ВАЖНО! Изменения в мероприятии</b>

📌 <b>{new_data.get('title', '')}</b>

🔄 <b>Что изменилось:</b> {change_summary}

{change_text}

━━━━━━━━━━━━━━━━━━━
📋 <b>Актуальная информация:</b>

📅 Дата: <b>{new_data.get('date', '')}</b>
⏰ Время: <b>{new_data.get('time', '')}</b>
📍 Место: <b>{new_data.get('location', '')}</b>
👥 Мест: <b>{new_data.get('seats', '')}</b>{price_info}{speakers_text}{description_text}"""
        
        else:
            return
        
        success_count = 0
        fail_count = 0
        
        for subscriber in subscribers:
            chat_id = subscriber[0]
            if chat_id:
                url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
                data = urllib.parse.urlencode({
                    'chat_id': chat_id,
                    'text': message,
                    'parse_mode': 'HTML'
                }).encode()
                
                try:
                    response = urllib.request.urlopen(url, data=data)
                    result = response.read().decode()
                    print(f"✅ Sent to {chat_id}")
                    success_count += 1
                except Exception as e:
                    print(f"❌ Failed to send to {chat_id}: {str(e)}")
                    fail_count += 1
        
        print(f"📊 Notification results: {success_count} sent, {fail_count} failed")
    
    except Exception as e:
        print(f"Notification error: {str(e)}")
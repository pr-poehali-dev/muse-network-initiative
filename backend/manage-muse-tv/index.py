'''
Business: Manage MUSE TV videos, streams and page content
Args: event with httpMethod, body (for POST/PUT/DELETE), queryStringParameters
Returns: HTTP response with MUSE TV data
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
            params = event.get('queryStringParameters') or {}
            resource = params.get('resource', 'all')
            
            result = {}
            
            if resource in ['all', 'content']:
                cur.execute("SELECT id, hero_title, hero_subtitle, hero_description, live_stream_enabled, live_stream_url, live_stream_title FROM muse_tv_content ORDER BY id DESC LIMIT 1")
                row = cur.fetchone()
                if row:
                    result['content'] = {
                        'id': row[0],
                        'hero_title': row[1],
                        'hero_subtitle': row[2],
                        'hero_description': row[3],
                        'live_stream_enabled': row[4],
                        'live_stream_url': row[5],
                        'live_stream_title': row[6]
                    }
            
            if resource in ['all', 'videos']:
                cur.execute("SELECT id, video_id, title, type, url, embed_url, display_order, thumbnail_url, is_featured FROM muse_tv_videos ORDER BY display_order, id")
                rows = cur.fetchall()
                result['videos'] = []
                for row in rows:
                    result['videos'].append({
                        'id': row[0],
                        'video_id': row[1],
                        'title': row[2],
                        'type': row[3],
                        'url': row[4],
                        'embed_url': row[5],
                        'display_order': row[6],
                        'thumbnail_url': row[7],
                        'is_featured': row[8]
                    })
            
            if resource in ['all', 'streams']:
                cur.execute("SELECT id, title, date, time, category, speaker, display_order FROM muse_tv_streams ORDER BY display_order, id")
                rows = cur.fetchall()
                result['streams'] = []
                for row in rows:
                    result['streams'].append({
                        'id': row[0],
                        'title': row[1],
                        'date': row[2],
                        'time': row[3],
                        'category': row[4],
                        'speaker': row[5],
                        'display_order': row[6]
                    })
            
            if resource in ['all', 'live']:
                cur.execute("SELECT id, stream_url, title, is_active FROM live_stream WHERE is_active = true LIMIT 1")
                row = cur.fetchone()
                if row:
                    result['live_stream'] = {
                        'id': row[0],
                        'stream_url': row[1],
                        'title': row[2],
                        'is_active': row[3]
                    }
                else:
                    result['live_stream'] = None
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps(result)
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            resource = body_data.get('resource')
            data = body_data.get('data', {})
            
            if resource == 'video':
                if data.get('is_featured'):
                    cur.execute("UPDATE muse_tv_videos SET is_featured = FALSE")
                
                cur.execute("""
                    INSERT INTO muse_tv_videos (video_id, title, type, url, embed_url, display_order, thumbnail_url, is_featured)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
                """, (
                    data.get('video_id'),
                    data.get('title'),
                    data.get('type', 'Подкаст'),
                    data.get('url'),
                    data.get('embed_url'),
                    data.get('display_order', 0),
                    data.get('thumbnail_url'),
                    data.get('is_featured', False)
                ))
                new_id = cur.fetchone()[0]
                conn.commit()
                
            elif resource == 'stream':
                cur.execute("""
                    INSERT INTO muse_tv_streams (title, date, time, category, speaker, display_order)
                    VALUES (%s, %s, %s, %s, %s, %s) RETURNING id
                """, (
                    data.get('title'),
                    data.get('date'),
                    data.get('time'),
                    data.get('category'),
                    data.get('speaker'),
                    data.get('display_order', 0)
                ))
                new_id = cur.fetchone()[0]
                conn.commit()
            
            elif resource == 'content':
                cur.execute("""
                    INSERT INTO muse_tv_content (hero_title, hero_subtitle, hero_description, 
                                                 live_stream_enabled, live_stream_url, live_stream_title)
                    VALUES (%s, %s, %s, %s, %s, %s) RETURNING id
                """, (
                    data.get('hero_title'),
                    data.get('hero_subtitle'),
                    data.get('hero_description'),
                    data.get('live_stream_enabled'),
                    data.get('live_stream_url'),
                    data.get('live_stream_title')
                ))
                new_id = cur.fetchone()[0]
                conn.commit()
            
            elif resource == 'live':
                cur.execute("UPDATE live_stream SET is_active = false")
                cur.execute("""
                    INSERT INTO live_stream (stream_url, title, is_active)
                    VALUES (%s, %s, true) RETURNING id
                """, (data.get('stream_url'), data.get('title')))
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
            resource = body_data.get('resource')
            item_id = body_data.get('id')
            data = body_data.get('data', {})
            
            if resource == 'video':
                if data.get('is_featured'):
                    cur.execute("UPDATE muse_tv_videos SET is_featured = FALSE")
                
                cur.execute("""
                    UPDATE muse_tv_videos SET
                        video_id = %s,
                        title = %s,
                        type = %s,
                        url = %s,
                        embed_url = %s,
                        display_order = %s,
                        thumbnail_url = %s,
                        is_featured = %s
                    WHERE id = %s
                """, (
                    data.get('video_id'),
                    data.get('title'),
                    data.get('type'),
                    data.get('url'),
                    data.get('embed_url'),
                    data.get('display_order'),
                    data.get('thumbnail_url'),
                    data.get('is_featured', False),
                    item_id
                ))
                
            elif resource == 'stream':
                cur.execute("""
                    UPDATE muse_tv_streams SET
                        title = %s,
                        date = %s,
                        time = %s,
                        category = %s,
                        speaker = %s,
                        display_order = %s
                    WHERE id = %s
                """, (
                    data.get('title'),
                    data.get('date'),
                    data.get('time'),
                    data.get('category'),
                    data.get('speaker'),
                    data.get('display_order'),
                    item_id
                ))
                
            elif resource == 'content':
                cur.execute("""
                    UPDATE muse_tv_content SET
                        hero_title = %s,
                        hero_subtitle = %s,
                        hero_description = %s,
                        live_stream_enabled = %s,
                        live_stream_url = %s,
                        live_stream_title = %s,
                        updated_at = NOW()
                    WHERE id = %s
                """, (
                    data.get('hero_title'),
                    data.get('hero_subtitle'),
                    data.get('hero_description'),
                    data.get('live_stream_enabled'),
                    data.get('live_stream_url'),
                    data.get('live_stream_title'),
                    item_id
                ))
            
            elif resource == 'live':
                cur.execute("""
                    UPDATE live_stream SET
                        stream_url = %s,
                        title = %s,
                        updated_at = NOW()
                    WHERE id = %s
                """, (data.get('stream_url'), data.get('title'), item_id))
            
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
            resource = body_data.get('resource')
            item_id = body_data.get('id')
            
            if resource == 'video':
                cur.execute("DELETE FROM muse_tv_videos WHERE id = %s", (item_id,))
            elif resource == 'stream':
                cur.execute("DELETE FROM muse_tv_streams WHERE id = %s", (item_id,))
            elif resource == 'live':
                cur.execute("UPDATE live_stream SET is_active = false WHERE id = %s", (item_id,))
            
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
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
'''
Business: Manage headliners page content and Rutube videos
Args: event with httpMethod, body (for POST/PUT), queryStringParameters
Returns: HTTP response with headliners content and videos
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
            
            if resource == 'content':
                cur.execute("SELECT * FROM headliners_content ORDER BY id DESC LIMIT 1")
                row = cur.fetchone()
                if row:
                    content = {
                        'id': row[0],
                        'hero_title': row[1],
                        'hero_subtitle': row[2],
                        'hero_description': row[3],
                        'hero_mobile_image': row[4],
                        'hero_left_image': row[5],
                        'hero_right_image': row[6],
                        'manifesto_title': row[7],
                        'manifesto_subtitle': row[8],
                        'manifesto_text': row[9],
                        'cta_title': row[10],
                        'cta_description': row[11]
                    }
                else:
                    content = None
                
                cur.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'content': content})
                }
            
            elif resource == 'videos':
                cur.execute("""
                    SELECT id, video_id, title, description, thumbnail_url, 
                           duration, display_order, is_active
                    FROM rutube_videos 
                    WHERE is_active = true
                    ORDER BY display_order ASC, created_at DESC
                """)
                
                rows = cur.fetchall()
                videos = []
                for row in rows:
                    videos.append({
                        'id': row[0],
                        'video_id': row[1],
                        'title': row[2],
                        'description': row[3],
                        'thumbnail_url': row[4],
                        'duration': row[5],
                        'display_order': row[6],
                        'is_active': row[7]
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
                    'body': json.dumps({'videos': videos})
                }
            
            else:
                cur.execute("SELECT * FROM headliners_content ORDER BY id DESC LIMIT 1")
                content_row = cur.fetchone()
                content = None
                if content_row:
                    content = {
                        'id': content_row[0],
                        'hero_title': content_row[1],
                        'hero_subtitle': content_row[2],
                        'hero_description': content_row[3],
                        'hero_mobile_image': content_row[4],
                        'hero_left_image': content_row[5],
                        'hero_right_image': content_row[6],
                        'manifesto_title': content_row[7],
                        'manifesto_subtitle': content_row[8],
                        'manifesto_text': content_row[9],
                        'cta_title': content_row[10],
                        'cta_description': content_row[11]
                    }
                
                cur.execute("""
                    SELECT id, video_id, title, description, thumbnail_url, 
                           duration, display_order, is_active
                    FROM rutube_videos 
                    WHERE is_active = true
                    ORDER BY display_order ASC, created_at DESC
                """)
                
                video_rows = cur.fetchall()
                videos = []
                for row in video_rows:
                    videos.append({
                        'id': row[0],
                        'video_id': row[1],
                        'title': row[2],
                        'description': row[3],
                        'thumbnail_url': row[4],
                        'duration': row[5],
                        'display_order': row[6],
                        'is_active': row[7]
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
                    'body': json.dumps({'content': content, 'videos': videos})
                }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            resource = body_data.get('resource')
            
            if resource == 'content':
                data = body_data.get('data', {})
                
                cur.execute("""
                    INSERT INTO headliners_content (
                        hero_title, hero_subtitle, hero_description,
                        hero_mobile_image, hero_left_image, hero_right_image,
                        manifesto_title, manifesto_subtitle, manifesto_text,
                        cta_title, cta_description
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                """, (
                    data.get('hero_title'),
                    data.get('hero_subtitle'),
                    data.get('hero_description'),
                    data.get('hero_mobile_image'),
                    data.get('hero_left_image'),
                    data.get('hero_right_image'),
                    data.get('manifesto_title'),
                    data.get('manifesto_subtitle'),
                    data.get('manifesto_text'),
                    data.get('cta_title'),
                    data.get('cta_description')
                ))
                
                content_id = cur.fetchone()[0]
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
                    'body': json.dumps({'success': True, 'id': content_id})
                }
            
            elif resource == 'video':
                data = body_data.get('data', {})
                
                cur.execute("""
                    INSERT INTO rutube_videos (
                        video_id, title, description, thumbnail_url,
                        duration, display_order, is_active
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                """, (
                    data.get('video_id'),
                    data.get('title'),
                    data.get('description'),
                    data.get('thumbnail_url'),
                    data.get('duration'),
                    data.get('display_order', 0),
                    data.get('is_active', True)
                ))
                
                video_id = cur.fetchone()[0]
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
                    'body': json.dumps({'success': True, 'id': video_id})
                }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            resource = body_data.get('resource')
            
            if resource == 'content':
                content_id = body_data.get('id')
                data = body_data.get('data', {})
                
                cur.execute("""
                    UPDATE headliners_content SET
                        hero_title = %s,
                        hero_subtitle = %s,
                        hero_description = %s,
                        hero_mobile_image = %s,
                        hero_left_image = %s,
                        hero_right_image = %s,
                        manifesto_title = %s,
                        manifesto_subtitle = %s,
                        manifesto_text = %s,
                        cta_title = %s,
                        cta_description = %s,
                        updated_at = NOW()
                    WHERE id = %s
                """, (
                    data.get('hero_title'),
                    data.get('hero_subtitle'),
                    data.get('hero_description'),
                    data.get('hero_mobile_image'),
                    data.get('hero_left_image'),
                    data.get('hero_right_image'),
                    data.get('manifesto_title'),
                    data.get('manifesto_subtitle'),
                    data.get('manifesto_text'),
                    data.get('cta_title'),
                    data.get('cta_description'),
                    content_id
                ))
                
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
            
            elif resource == 'video':
                video_id = body_data.get('id')
                data = body_data.get('data', {})
                
                cur.execute("""
                    UPDATE rutube_videos SET
                        video_id = %s,
                        title = %s,
                        description = %s,
                        thumbnail_url = %s,
                        duration = %s,
                        display_order = %s,
                        is_active = %s,
                        updated_at = NOW()
                    WHERE id = %s
                """, (
                    data.get('video_id'),
                    data.get('title'),
                    data.get('description'),
                    data.get('thumbnail_url'),
                    data.get('duration'),
                    data.get('display_order'),
                    data.get('is_active'),
                    video_id
                ))
                
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
            video_id = body_data.get('id')
            
            if not video_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'error': 'Video ID required'})
                }
            
            cur.execute("DELETE FROM rutube_videos WHERE id = %s", (video_id,))
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

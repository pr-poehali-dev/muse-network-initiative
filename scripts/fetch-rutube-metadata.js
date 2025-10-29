// Script to fetch Rutube metadata and update museTvData.ts
const fetch = require('node-fetch');

const RUTUBE_API = 'https://functions.poehali.dev/2f9b4509-3a9d-47f2-9703-b8ec8b1aa68f';

const videoIds = [
  'a8cb0148230a45ad50421f345c6b153f',
  '67327ef4e3b1c1508f7a36e6a7b5dc35',
  'f1409f3d58f69eb900f5dfe9b705276f',
  '6f1a227c600cea92192642b41af8b403',
  '83775aecaa6ef874975d9d421c587d88',
  '32bd0b77ce3b68dc1b6ecdc962c62b95'
];

async function fetchMetadata(videoId) {
  try {
    const response = await fetch(`${RUTUBE_API}?video_id=${videoId}`);
    if (!response.ok) {
      console.error(`Failed to fetch ${videoId}: ${response.status}`);
      return null;
    }
    const data = await response.json();
    console.log(`✓ ${videoId}: ${data.title} - ${data.duration}s, ${data.hits} views`);
    return {
      videoId,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail_url,
      duration: data.duration,
      views: data.hits
    };
  } catch (error) {
    console.error(`Error fetching ${videoId}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Fetching Rutube metadata...\n');
  
  const results = {};
  for (const videoId of videoIds) {
    const metadata = await fetchMetadata(videoId);
    if (metadata) {
      results[videoId] = metadata;
    }
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log('\n\nMetadata JSON:');
  console.log(JSON.stringify(results, null, 2));
}

main();

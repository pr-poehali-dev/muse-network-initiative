// Script to download expert images from ImgBB
const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  { url: 'https://i.ibb.co/nSTtdnp/photo-2025-10-26-19-03-24.jpg', name: 'expert-1.jpg', expert: 'Ляшева Карина' },
  { url: 'https://i.ibb.co/b5DnF2rq/photo-2025-10-25-21-49-46.jpg', name: 'expert-2.jpg', expert: 'Мерзлая Людмила' },
  { url: 'https://i.ibb.co/G4kvH6gN/photo-2025-10-26-18-48-28.jpg', name: 'expert-3.jpg', expert: 'Христенко Юлия' },
  { url: 'https://i.ibb.co/jPJtZr4v/photo-2025-10-26-18-48-35.jpg', name: 'expert-4.jpg', expert: 'Самсонова Юлия' },
  { url: 'https://i.ibb.co/4wkQf2YV/photo-2025-10-26-18-59-32-2.jpg', name: 'expert-5.jpg', expert: 'Берг Полина' },
  { url: 'https://i.ibb.co/N6HjpXFC/photo-2025-10-25-22-00-430.jpg', name: 'expert-6.jpg', expert: 'Лазарева Мария' },
  { url: 'https://i.ibb.co/Kc864P3N/photo-2025-10-26-18-48-31.jpg', name: 'expert-7.jpg', expert: 'Рябова Тамара' },
  { url: 'https://i.ibb.co/fVp0vK0T/photo-2025-10-26-18-48-15.jpg', name: 'expert-8.jpg', expert: 'Кузнецова Екатерина' }
];

const outputDir = './public/images/experts';

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        https.get(response.headers.location, (redirectResponse) => {
          const filePath = path.join(outputDir, filename);
          const fileStream = fs.createWriteStream(filePath);
          
          redirectResponse.pipe(fileStream);
          
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`✓ Downloaded: ${filename}`);
            resolve();
          });
          
          fileStream.on('error', (err) => {
            fs.unlink(filePath, () => {});
            reject(err);
          });
        }).on('error', reject);
      } else {
        const filePath = path.join(outputDir, filename);
        const fileStream = fs.createWriteStream(filePath);
        
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ Downloaded: ${filename}`);
          resolve();
        });
        
        fileStream.on('error', (err) => {
          fs.unlink(filePath, () => {});
          reject(err);
        });
      }
    }).on('error', reject);
  });
}

async function downloadAll() {
  console.log('Starting download of expert images...\n');
  
  for (const image of images) {
    try {
      await downloadImage(image.url, image.name);
    } catch (error) {
      console.error(`✗ Failed to download ${image.name}:`, error.message);
    }
  }
  
  console.log('\nDownload complete!');
  console.log('\nMapping:');
  images.forEach(img => {
    console.log(`${img.name} (${img.expert}): ${img.url} -> /images/experts/${img.name}`);
  });
}

downloadAll();

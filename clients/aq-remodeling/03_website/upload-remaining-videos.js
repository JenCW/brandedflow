/**
 * Upload remaining 3 videos to Cloudinary
 */

const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Config
const configPath = path.join(__dirname, '..', 'cloudinary-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

cloudinary.config({
  cloud_name: config.cloudName.trim(),
  api_key: config.apiKey.trim(),
  api_secret: config.apiSecret.trim()
});

const videosPath = path.join(__dirname, 'images/Work-pics-and-vids');
const remainingVideos = ['IMG_6770.MOV', 'IMG_6190.MOV', 'IMG_6189.MOV'];

async function uploadVideo(videoFile) {
  const videoPath = path.join(videosPath, videoFile);
  
  if (!fs.existsSync(videoPath)) {
    console.log(`❌ Not found: ${videoFile}`);
    return null;
  }

  const stats = fs.statSync(videoPath);
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n📤 Uploading ${videoFile} (${fileSizeMB} MB)...`);

  try {
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: 'video',
      folder: 'aq-remodeling/testimonials',
      public_id: path.basename(videoFile, path.extname(videoFile)),
      quality: 'auto',
      format: 'mp4',
      chunk_size: 6000000,
      eager: [{ format: 'mp4', quality: 'auto' }],
      timeout: 300000
    });

    console.log(`✅ Uploaded: ${result.secure_url}`);
    return { videoFile, url: result.secure_url };
  } catch (error) {
    if (error.http_code === 413 || error.message.includes('413')) {
      console.log(`❌ File too large (${fileSizeMB} MB). Cloudinary limit is 100MB.`);
      console.log(`💡 Need to compress this video first.`);
    } else {
      console.log(`❌ Error: ${error.message}`);
    }
    return null;
  }
}

async function updateHTML(urlMap) {
  const htmlFile = path.join(__dirname, 'index.html');
  let content = fs.readFileSync(htmlFile, 'utf8');

  for (const [videoFile, cdnUrl] of Object.entries(urlMap)) {
    const pattern = new RegExp(`src=["']images/Work-pics-and-vids/${videoFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi');
    content = content.replace(pattern, `src="${cdnUrl}"`);
    console.log(`✅ Updated HTML for ${videoFile}`);
  }

  fs.writeFileSync(htmlFile, content, 'utf8');
}

async function main() {
  console.log('🚀 Uploading remaining 3 videos...\n');
  
  const urlMap = {};
  
  for (const video of remainingVideos) {
    const result = await uploadVideo(video);
    if (result) {
      urlMap[result.videoFile] = result.url;
    }
  }

  if (Object.keys(urlMap).length > 0) {
    console.log('\n📝 Updating HTML...');
    await updateHTML(urlMap);
    console.log('\n✅ Done!');
  } else {
    console.log('\n⚠️  No videos were uploaded. Check file sizes.');
  }
}

main().catch(console.error);


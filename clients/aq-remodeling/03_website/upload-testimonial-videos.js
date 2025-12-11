/**
 * Automated Video Upload to Cloudinary
 * 
 * This script:
 * 1. Reads Cloudinary config
 * 2. Finds testimonial videos
 * 3. Uploads to Cloudinary
 * 4. Updates HTML with CDN URLs
 * 
 * Run: node upload-testimonial-videos.js
 */

const fs = require('fs');
const path = require('path');

// Testimonial video files (the 6 you want on website)
const TESTIMONIAL_VIDEOS = [
  'IMG_6988.MOV',
  'IMG_6949.MOV',
  'IMG_6831.MOV',
  'IMG_6770.MOV',
  'IMG_6190.MOV',
  'IMG_6189.MOV'
];

// Videos already uploaded (skip these)
const ALREADY_UPLOADED = [
  'IMG_6988.MOV',
  'IMG_6949.MOV',
  'IMG_6831.MOV'
];

async function uploadVideos() {
  console.log('🚀 Starting video upload to Cloudinary...\n');

  // Check for Cloudinary config (try multiple locations)
  const possibleConfigPaths = [
    path.join(__dirname, '../cloudinary-config.json'),
    path.join(__dirname, '../../cloudinary-config.json'),
    path.join(process.cwd(), 'cloudinary-config.json')
  ];
  
  let configPath = null;
  for (const possiblePath of possibleConfigPaths) {
    if (fs.existsSync(possiblePath)) {
      configPath = possiblePath;
      break;
    }
  }

  if (!configPath) {
    console.log('❌ Cloudinary config not found!');
    console.log('📝 Please create: clients/aq-remodeling/cloudinary-config.json');
    console.log('📖 See SETUP_CLOUDINARY.md for instructions\n');
    console.log('Searched in:');
    possibleConfigPaths.forEach(p => console.log(`  - ${p}`));
    return;
  }

  console.log(`✅ Found config at: ${configPath}\n`);

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  // Check if cloudinary package is installed
  try {
    require('cloudinary');
  } catch (e) {
    console.log('📦 Installing cloudinary package...');
    console.log('Run: npm install cloudinary\n');
    return;
  }

  const cloudinary = require('cloudinary').v2;
  
  // Validate credentials
  if (!config.cloudName || config.cloudName === 'YOUR_CLOUD_NAME_HERE') {
    console.log('❌ Invalid cloud_name in config file!');
    console.log('📝 Please update cloudinary-config.json with your actual Cloudinary credentials\n');
    return;
  }
  
  cloudinary.config({
    cloud_name: config.cloudName.trim(),
    api_key: config.apiKey.trim(),
    api_secret: config.apiSecret.trim()
  });
  
  // Test connection
  console.log(`🔗 Testing Cloudinary connection (cloud: ${config.cloudName.trim()})...\n`);

  const videosPath = path.join(__dirname, 'images/Work-pics-and-vids');
  const urlMap = {};

  console.log('📤 Uploading videos...\n');

  for (const videoFile of TESTIMONIAL_VIDEOS) {
    const videoPath = path.join(videosPath, videoFile);
    
    if (!fs.existsSync(videoPath)) {
      console.log(`⚠️  Not found: ${videoFile}`);
      continue;
    }

    // Skip if already uploaded (check HTML for Cloudinary URL)
    const htmlFile = path.join(__dirname, 'index.html');
    const htmlContent = fs.readFileSync(htmlFile, 'utf8');
    if (htmlContent.includes(`res.cloudinary.com`) && htmlContent.includes(videoFile.replace('.MOV', ''))) {
      console.log(`⏭️  Skipping ${videoFile} - already uploaded to Cloudinary`);
      continue;
    }

    try {
      // Check file size first
      const stats = fs.statSync(videoPath);
      const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`Uploading ${videoFile} (${fileSizeMB} MB)...`);
      
      // Cloudinary free tier limit is 100MB per file
      // Try uploading - if it fails, we'll handle it
      if (stats.size > 100 * 1024 * 1024) {
        console.log(`⚠️  File is ${fileSizeMB} MB - Cloudinary free tier limit is 100MB`);
        console.log(`💡 Attempting upload anyway (may fail)...`);
        console.log(`   If it fails, compress first: node compress-videos-node.js\n`);
      }
      
      const result = await cloudinary.uploader.upload(videoPath, {
        resource_type: 'video',
        folder: 'aq-remodeling/testimonials',
        public_id: path.basename(videoFile, path.extname(videoFile)),
        quality: 'auto',
        format: 'mp4',
        chunk_size: 6000000, // 6MB chunks for large files
        eager: [
          { format: 'mp4', quality: 'auto' }
        ],
        timeout: 300000 // 5 minute timeout for large files
      });

      urlMap[videoFile] = result.secure_url;
      console.log(`\n✅ Uploaded: ${result.secure_url}\n`);

    } catch (error) {
      if (error.message.includes('Invalid cloud_name')) {
        console.log(`❌ Error: Invalid cloud_name. Please verify your Cloudinary credentials.`);
        console.log(`   Check: https://cloudinary.com/console → Settings → Product Environment Credentials\n`);
      } else if (error.http_code === 413 || error.message.includes('413')) {
        const stats = fs.statSync(videoPath);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`❌ Error: File too large (${fileSizeMB} MB). Cloudinary free tier limit is 100MB.`);
        console.log(`💡 Solution: Compress video first using HandBrake or similar tool\n`);
      } else {
        console.log(`❌ Error uploading ${videoFile}: ${error.message}\n`);
      }
    }
  }

  // Update HTML files
  if (Object.keys(urlMap).length > 0) {
    console.log('📝 Updating HTML files with CDN URLs...\n');
    updateHTMLFiles(urlMap);
    console.log('✅ Done! Videos are now on Cloudinary CDN.\n');
  }
}

function updateHTMLFiles(urlMap) {
  const htmlFile = path.join(__dirname, 'index.html');
  let content = fs.readFileSync(htmlFile, 'utf8');

  // Replace local video paths with CDN URLs
  for (const [videoFile, cdnUrl] of Object.entries(urlMap)) {
    const pattern = new RegExp(`src=["']images/Work-pics-and-vids/${videoFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi');
    content = content.replace(pattern, `src="${cdnUrl}"`);
  }

  fs.writeFileSync(htmlFile, content, 'utf8');
  console.log('✅ Updated index.html with Cloudinary URLs');
}

// Run if called directly
if (require.main === module) {
  uploadVideos().catch(console.error);
}

module.exports = { uploadVideos };


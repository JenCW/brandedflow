/**
 * Node.js Video Compression Script
 * Uses FFmpeg if available, otherwise provides instructions
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const VIDEOS_DIR = path.join(__dirname, 'images/Work-pics-and-vids');
const BACKUP_DIR = path.join(VIDEOS_DIR, 'backup');

const VIDEOS_TO_COMPRESS = [
  'IMG_6770.MOV',
  'IMG_6190.MOV',
  'IMG_6189.MOV'
];

function checkFFmpeg() {
  try {
    execSync('which ffmpeg', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function compressVideo(videoFile) {
  const videoPath = path.join(VIDEOS_DIR, videoFile);
  const outputPath = path.join(VIDEOS_DIR, `${path.basename(videoFile, path.extname(videoFile))}_compressed.mp4`);
  
  if (!fs.existsSync(videoPath)) {
    console.log(`⚠️  Not found: ${videoFile}`);
    return false;
  }

  const stats = fs.statSync(videoPath);
  const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n📹 Compressing ${videoFile} (${originalSizeMB} MB)...`);

  try {
    // Create backup
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    fs.copyFileSync(videoPath, path.join(BACKUP_DIR, videoFile));
    console.log(`  ✓ Backed up`);

    // Compress with FFmpeg
    const command = `ffmpeg -i "${videoPath}" -crf 28 -preset fast -movflags +faststart -c:v libx264 -c:a aac -b:a 128k -y "${outputPath}"`;
    execSync(command, { stdio: 'inherit' });

    if (fs.existsSync(outputPath)) {
      const newStats = fs.statSync(outputPath);
      const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
      const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);
      
      console.log(`  ✓ Compressed: ${originalSizeMB} MB → ${newSizeMB} MB (${reduction}% reduction)`);
      
      // Replace original
      fs.renameSync(outputPath, videoPath);
      console.log(`  ✓ Replaced original`);
      
      return true;
    }
  } catch (error) {
    console.log(`  ❌ Compression failed: ${error.message}`);
    return false;
  }

  return false;
}

function main() {
  console.log('🎬 Video Compression Script (Node.js)');
  console.log('=====================================\n');

  if (!checkFFmpeg()) {
    console.log('❌ FFmpeg not found!');
    console.log('\n📦 Install FFmpeg:');
    console.log('   brew install ffmpeg');
    console.log('\n💡 Alternative: Use HandBrake (GUI):');
    console.log('   1. Download: https://handbrake.fr');
    console.log('   2. Open each video');
    console.log('   3. Preset: "Fast 1080p30"');
    console.log('   4. Encode and replace original\n');
    return;
  }

  console.log('✅ FFmpeg found\n');
  console.log('📦 Compressing videos...\n');

  let successCount = 0;
  for (const video of VIDEOS_TO_COMPRESS) {
    if (compressVideo(video)) {
      successCount++;
    }
  }

  console.log(`\n✅ Done! ${successCount}/${VIDEOS_TO_COMPRESS.length} videos compressed.`);
  console.log('📝 Run: node upload-testimonial-videos.js\n');
}

if (require.main === module) {
  main();
}

module.exports = { compressVideo, checkFFmpeg };


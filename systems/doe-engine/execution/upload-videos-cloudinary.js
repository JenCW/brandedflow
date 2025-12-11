/**
 * Upload Videos to Cloudinary CDN
 * 
 * This script automatically:
 * 1. Finds video files in client folders
 * 2. Uploads to Cloudinary CDN
 * 3. Returns CDN URLs for use in HTML
 * 4. Updates HTML files with CDN URLs
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

/**
 * Initialize Cloudinary
 */
function initCloudinary(cloudName, apiKey, apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  });
}

/**
 * Upload video to Cloudinary
 */
async function uploadVideo(videoPath, options = {}) {
  const {
    folder = 'client-videos',
    publicId = null,
    quality = 'auto',
    format = 'mp4'
  } = options;

  try {
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: 'video',
      folder: folder,
      public_id: publicId,
      quality: quality,
      format: format,
      eager: [
        { format: 'mp4', quality: 'auto' },
        { format: 'webm', quality: 'auto' }
      ]
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      duration: result.duration,
      width: result.width,
      height: result.height,
      bytes: result.bytes
    };
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
}

/**
 * Find video files in client folder
 */
async function findVideos(clientName, searchPaths = []) {
  const defaultPaths = [
    `clients/${clientName}/00_media-drop/videos/**/*.{MOV,MP4,mov,mp4}`,
    `clients/${clientName}/03_website/images/**/*.{MOV,MP4,mov,mp4}`
  ];

  const paths = searchPaths.length > 0 ? searchPaths : defaultPaths;
  const videoFiles = [];

  for (const pattern of paths) {
    const files = await glob(pattern, { ignore: ['node_modules/**'] });
    videoFiles.push(...files);
  }

  return videoFiles.filter(file => {
    const stats = fs.statSync(file);
    return stats.isFile();
  });
}

/**
 * Update HTML files with CDN URLs
 */
function updateHTMLWithCDNUrls(htmlFiles, urlMap) {
  const updates = [];

  for (const htmlFile of htmlFiles) {
    let content = fs.readFileSync(htmlFile, 'utf8');
    let modified = false;

    // Replace local video paths with CDN URLs
    for (const [localPath, cdnUrl] of Object.entries(urlMap)) {
      const patterns = [
        new RegExp(`src=["']${localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi'),
        new RegExp(`src=["']images/[^"']*${path.basename(localPath)}["']`, 'gi')
      ];

      for (const pattern of patterns) {
        if (pattern.test(content)) {
          content = content.replace(pattern, `src="${cdnUrl}"`);
          modified = true;
        }
      }
    }

    if (modified) {
      fs.writeFileSync(htmlFile, content, 'utf8');
      updates.push(htmlFile);
    }
  }

  return updates;
}

/**
 * Main execution function
 */
async function uploadClientVideos(clientName, cloudinaryConfig, options = {}) {
  try {
    // Initialize Cloudinary
    initCloudinary(
      cloudinaryConfig.cloudName,
      cloudinaryConfig.apiKey,
      cloudinaryConfig.apiSecret
    );

    // Find videos
    console.log(`Finding videos for ${clientName}...`);
    const videoFiles = await findVideos(clientName, options.searchPaths);
    
    if (videoFiles.length === 0) {
      return { error: 'No video files found' };
    }

    console.log(`Found ${videoFiles.length} video(s)`);

    // Upload videos
    const urlMap = {};
    const uploadResults = [];

    for (const videoFile of videoFiles) {
      console.log(`Uploading ${path.basename(videoFile)}...`);
      
      const result = await uploadVideo(videoFile, {
        folder: `clients/${clientName}/videos`,
        publicId: path.basename(videoFile, path.extname(videoFile)),
        ...options.uploadOptions
      });

      urlMap[videoFile] = result.url;
      uploadResults.push({
        file: videoFile,
        url: result.url,
        publicId: result.publicId,
        size: result.bytes
      });

      console.log(`✓ Uploaded: ${result.url}`);
    }

    // Update HTML files
    const htmlFiles = await glob(`clients/${clientName}/03_website/**/*.html`);
    const updatedFiles = updateHTMLWithCDNUrls(htmlFiles, urlMap);

    return {
      success: true,
      videosUploaded: uploadResults.length,
      urls: urlMap,
      htmlFilesUpdated: updatedFiles,
      results: uploadResults
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = {
  uploadClientVideos,
  uploadVideo,
  findVideos,
  updateHTMLWithCDNUrls
};


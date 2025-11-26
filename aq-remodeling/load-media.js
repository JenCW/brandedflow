// AQ Remodeling - Automated Media Loader
// This script scans your media folder and generates portfolio items

const fs = require('fs');
const path = require('path');

// Configuration
const MEDIA_FOLDER = '/Users/jencortez-walters/icloud/work vids and pics';
const OUTPUT_FOLDER = './images';
const PORTFOLIO_HTML = './portfolio.html';

// Supported formats
const IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const VIDEO_FORMATS = ['.mp4', '.mov', '.avi', '.webm'];

// Scan folder for media files
function scanMediaFolder(folderPath) {
    const media = {
        images: [],
        videos: []
    };

    try {
        const files = fs.readdirSync(folderPath);

        files.forEach(file => {
            const ext = path.extname(file).toLowerCase();
            const fullPath = path.join(folderPath, file);

            if (IMAGE_FORMATS.includes(ext)) {
                media.images.push({
                    filename: file,
                    path: fullPath,
                    name: path.basename(file, ext).replace(/[-_]/g, ' ')
                });
            } else if (VIDEO_FORMATS.includes(ext)) {
                media.videos.push({
                    filename: file,
                    path: fullPath,
                    name: path.basename(file, ext).replace(/[-_]/g, ' ')
                });
            }
        });
    } catch (error) {
        console.error('Error scanning folder:', error.message);
    }

    return media;
}

// Copy media to images folder
function copyMedia(media) {
    if (!fs.existsSync(OUTPUT_FOLDER)) {
        fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
    }

    const portfolioFolder = path.join(OUTPUT_FOLDER, 'portfolio');
    if (!fs.existsSync(portfolioFolder)) {
        fs.mkdirSync(portfolioFolder, { recursive: true });
    }

    console.log('Copying media files...');

    [...media.images, ...media.videos].forEach((item, index) => {
        const destPath = path.join(portfolioFolder, item.filename);
        try {
            fs.copyFileSync(item.path, destPath);
            console.log(`✓ Copied: ${item.filename}`);
        } catch (error) {
            console.error(`✗ Failed to copy ${item.filename}:`, error.message);
        }
    });
}

// Generate portfolio HTML
function generatePortfolioHTML(media) {
    let html = '';

    // Generate image items
    media.images.forEach((img, index) => {
        const category = detectCategory(img.name);
        html += `
    <div class="portfolio-item slide-up" data-category="${category}">
        <img src="images/portfolio/${img.filename}" alt="${img.name}" loading="lazy">
        <div class="portfolio-overlay">
            <h3>${capitalizeWords(img.name)}</h3>
            <p>Professional remodeling project</p>
        </div>
    </div>`;
    });

    // Generate video items
    media.videos.forEach((vid, index) => {
        const category = detectCategory(vid.name);
        html += `
    <div class="portfolio-item slide-up" data-category="${category}">
        <video loop muted playsinline>
            <source src="images/portfolio/${vid.filename}" type="video/${path.extname(vid.filename).slice(1)}">
        </video>
        <div class="portfolio-overlay">
            <h3>${capitalizeWords(vid.name)}</h3>
            <p>Professional remodeling project</p>
        </div>
    </div>`;
    });

    return html;
}

// Detect category from filename
function detectCategory(filename) {
    const name = filename.toLowerCase();

    if (name.includes('kitchen')) return 'residential kitchen';
    if (name.includes('bath')) return 'residential bathroom';
    if (name.includes('office')) return 'commercial';
    if (name.includes('commercial')) return 'commercial';
    if (name.includes('residential')) return 'residential';

    // Default to residential
    return 'residential';
}

// Capitalize words
function capitalizeWords(str) {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Update portfolio.html
function updatePortfolioPage(htmlContent) {
    try {
        let content = fs.readFileSync(PORTFOLIO_HTML, 'utf8');

        // Find portfolio grid and replace content
        const gridStart = content.indexOf('<div class="portfolio-grid">');
        const gridEnd = content.indexOf('</div>', gridStart + 100);

        if (gridStart !== -1 && gridEnd !== -1) {
            const before = content.substring(0, gridStart + '<div class="portfolio-grid">'.length);
            const after = content.substring(gridEnd);

            content = before + '\n' + htmlContent + '\n        ' + after;

            fs.writeFileSync(PORTFOLIO_HTML, content);
            console.log('\n✓ Portfolio page updated successfully!');
        }
    } catch (error) {
        console.error('Error updating portfolio:', error.message);
    }
}

// Main execution
console.log('🎬 AQ Remodeling - Media Loader\n');
console.log('Scanning:', MEDIA_FOLDER);

const media = scanMediaFolder(MEDIA_FOLDER);

console.log(`\nFound: ${media.images.length} images, ${media.videos.length} videos\n`);

// Copy files
copyMedia(media);

// Generate HTML
const portfolioHTML = generatePortfolioHTML(media);

// Update portfolio page
updatePortfolioPage(portfolioHTML);

console.log(`\n✨ Done! Your portfolio now has ${media.images.length + media.videos.length} items.`);
console.log('\nNext steps:');
console.log('1. Open portfolio.html in a browser');
console.log('2. Adjust categories if needed');
console.log('3. Deploy your site!\n');

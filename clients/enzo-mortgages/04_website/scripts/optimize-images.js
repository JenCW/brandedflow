#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Optimizes all images in the public directory using sharp
 * - Converts to modern formats (AVIF, WebP)
 * - Compresses with quality optimization
 * - Generates multiple sizes for responsive images
 *
 * Usage: node scripts/optimize-images.js
 */

import sharp from 'sharp'
import { readdir, stat, mkdir } from 'fs/promises'
import { join, extname, basename, dirname } from 'path'
import { existsSync } from 'fs'

const PUBLIC_DIR = './public'
const OUTPUT_DIR = './public/optimized'
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

// Optimization settings
const QUALITY = {
  avif: 60,    // AVIF can achieve great quality at lower settings
  webp: 80,    // WebP quality
  jpeg: 85,    // JPEG fallback quality
}

const SIZES = {
  thumbnail: 256,
  small: 640,
  medium: 1024,
  large: 1920,
  xlarge: 2560,
}

/**
 * Recursively find all image files in a directory
 */
async function findImages(dir, images = []) {
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      // Skip optimized directory to avoid infinite loops
      if (entry.name !== 'optimized' && entry.name !== '.next') {
        await findImages(fullPath, images)
      }
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase()
      if (IMAGE_EXTENSIONS.includes(ext)) {
        images.push(fullPath)
      }
    }
  }

  return images
}

/**
 * Optimize a single image
 */
async function optimizeImage(imagePath) {
  try {
    const ext = extname(imagePath).toLowerCase()
    const name = basename(imagePath, ext)
    const relativeDir = dirname(imagePath).replace(PUBLIC_DIR, '')
    const outputDir = join(OUTPUT_DIR, relativeDir)

    // Create output directory if it doesn't exist
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true })
    }

    console.log(`Optimizing: ${imagePath}`)

    const image = sharp(imagePath)
    const metadata = await image.metadata()

    const optimizations = []

    // Generate AVIF (best compression)
    for (const [sizeName, width] of Object.entries(SIZES)) {
      if (metadata.width && width < metadata.width) {
        optimizations.push(
          image
            .clone()
            .resize(width, null, { withoutEnlargement: true })
            .avif({ quality: QUALITY.avif })
            .toFile(join(outputDir, `${name}-${sizeName}.avif`))
        )
      }
    }

    // Original size AVIF
    optimizations.push(
      image
        .clone()
        .avif({ quality: QUALITY.avif })
        .toFile(join(outputDir, `${name}.avif`))
    )

    // Generate WebP (good compression, wide support)
    for (const [sizeName, width] of Object.entries(SIZES)) {
      if (metadata.width && width < metadata.width) {
        optimizations.push(
          image
            .clone()
            .resize(width, null, { withoutEnlargement: true })
            .webp({ quality: QUALITY.webp })
            .toFile(join(outputDir, `${name}-${sizeName}.webp`))
        )
      }
    }

    // Original size WebP
    optimizations.push(
      image
        .clone()
        .webp({ quality: QUALITY.webp })
        .toFile(join(outputDir, `${name}.webp`))
    )

    // Generate optimized JPEG fallback (if source is not already JPEG)
    if (ext !== '.jpg' && ext !== '.jpeg') {
      optimizations.push(
        image
          .clone()
          .jpeg({ quality: QUALITY.jpeg, mozjpeg: true })
          .toFile(join(outputDir, `${name}.jpg`))
      )
    }

    await Promise.all(optimizations)

    console.log(`✓ Optimized: ${imagePath}`)
  } catch (error) {
    console.error(`✗ Failed to optimize ${imagePath}:`, error.message)
  }
}

/**
 * Main optimization function
 */
async function optimizeAllImages() {
  console.log('🖼️  Image Optimization Script\n')
  console.log(`Searching for images in: ${PUBLIC_DIR}\n`)

  const images = await findImages(PUBLIC_DIR)

  if (images.length === 0) {
    console.log('No images found to optimize.')
    return
  }

  console.log(`Found ${images.length} images to optimize\n`)

  const startTime = Date.now()

  // Optimize images in batches of 5 to avoid overwhelming the system
  const BATCH_SIZE = 5
  for (let i = 0; i < images.length; i += BATCH_SIZE) {
    const batch = images.slice(i, i + BATCH_SIZE)
    await Promise.all(batch.map(optimizeImage))
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2)

  console.log(`\n✅ Optimization complete! (${duration}s)`)
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`)
  console.log('\nNext steps:')
  console.log('1. Update your Next.js Image components to use optimized images')
  console.log('2. Use <picture> elements with srcset for responsive images')
  console.log('3. Consider implementing lazy loading for below-the-fold images')
}

// Run the script
optimizeAllImages().catch((error) => {
  console.error('❌ Optimization failed:', error)
  process.exit(1)
})

import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Mapping for all videos with Swahili subtitles
const subtitleMapping = {
  // Wesleyan Theology videos (Module 16) - Lessons 1-6
  1: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-1-grace-sw_b223d328.vtt',
  2: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-2-sanctification-sw_b49716df.vtt',
  3: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-3-social-holiness-sw_60c5f51b.vtt',
  4: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-4-stewardship-sw_565cf50e.vtt',
  5: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-5-small-groups-sw_02df3329.vtt',
  6: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-6-practical-holiness-sw_9f88204a.vtt',
  
  // Christian Doctrine videos (Module 60001) - Lessons 1-6
  30001: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-1-god-sw_e330c710.vtt',
  30002: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-2-jesus-sw_c019a715.vtt',
  30003: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-3-holy-spirit-sw_8b44d852.vtt',
  30004: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-4-salvation-sw_a92ed069.vtt',
  30005: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-5-church-sw_21c09724.vtt',
  30006: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-6-eternity-sw_1ff1f76e.vtt',
};

try {
  console.log('Adding Swahili subtitles to all 12 course videos...\n');
  
  let addedCount = 0;
  let skippedCount = 0;
  
  for (const [videoId, subtitleUrl] of Object.entries(subtitleMapping)) {
    const vidId = parseInt(videoId);
    
    // Check if subtitle already exists
    const [existing] = await connection.query(
      'SELECT id FROM video_subtitles WHERE videoId = ? AND language = ?',
      [vidId, 'sw']
    );
    
    if (existing.length === 0) {
      // Insert new subtitle record
      await connection.query(
        'INSERT INTO video_subtitles (videoId, language, languageName, subtitleUrl, isDefault) VALUES (?, ?, ?, ?, ?)',
        [vidId, 'sw', 'Kiswahili', subtitleUrl, 0]
      );
      console.log(`✅ Added Swahili subtitle for video ${vidId}`);
      addedCount++;
    } else {
      console.log(`ℹ️  Subtitle already exists for video ${vidId}`);
      skippedCount++;
    }
  }
  
  console.log(`\n✅ Successfully added ${addedCount} Swahili subtitle records`);
  console.log(`ℹ️  Skipped ${skippedCount} videos (subtitles already exist)`);
  
} catch (error) {
  console.error('Error:', error);
} finally {
  await connection.end();
}

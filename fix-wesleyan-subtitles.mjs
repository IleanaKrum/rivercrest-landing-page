import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Mapping for Wesleyan Theology module (ID 30001) - 6 lessons
const wesleyanSubtitles = {
  1: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-1-grace-sw_b223d328.vtt',
  2: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-2-sanctification-sw_b49716df.vtt',
  3: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-3-social-holiness-sw_60c5f51b.vtt',
  4: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-4-stewardship-sw_565cf50e.vtt',
  5: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-5-small-groups-sw_02df3329.vtt',
  6: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-6-practical-holiness-sw_9f88204a.vtt',
};

try {
  console.log('Fetching Wesleyan Theology videos (Module 30001)...\n');
  
  // Get Wesleyan Theology videos
  const [videos] = await connection.query(`
    SELECT id, lessonNumber, title
    FROM module_videos
    WHERE moduleId = 30001
    ORDER BY lessonNumber
  `);
  
  console.log(`Found ${videos.length} Wesleyan Theology videos\n`);
  
  let updatedCount = 0;
  
  for (const video of videos) {
    const subtitleUrl = wesleyanSubtitles[video.lessonNumber];
    
    if (!subtitleUrl) {
      console.log(`⚠️  No subtitle for lesson ${video.lessonNumber}: ${video.title}`);
      continue;
    }
    
    // Check if subtitle already exists
    const [existing] = await connection.query(
      'SELECT id FROM video_subtitles WHERE videoId = ? AND language = ?',
      [video.id, 'sw']
    );
    
    if (existing.length === 0) {
      // Insert new subtitle record
      await connection.query(
        'INSERT INTO video_subtitles (videoId, language, languageName, subtitleUrl, isDefault) VALUES (?, ?, ?, ?, ?)',
        [video.id, 'sw', 'Kiswahili', subtitleUrl, 0]
      );
      console.log(`✅ Added Swahili subtitle for video ${video.id} (Lesson ${video.lessonNumber})`);
      updatedCount++;
    } else {
      console.log(`ℹ️  Subtitle already exists for video ${video.id} (Lesson ${video.lessonNumber})`);
    }
  }
  
  console.log(`\n✅ Successfully updated ${updatedCount} Swahili subtitle records for Wesleyan Theology`);
  
} catch (error) {
  console.error('Error:', error);
} finally {
  await connection.end();
}

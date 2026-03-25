import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Swahili subtitle URLs (from S3 CDN upload)
const subtitleUrls = {
  // Wesleyan Theology Course (6 videos)
  'wesleyan-lesson-1': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-1-grace-sw_b223d328.vtt',
  'wesleyan-lesson-2': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-2-sanctification-sw_b49716df.vtt',
  'wesleyan-lesson-3': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-3-social-holiness-sw_60c5f51b.vtt',
  'wesleyan-lesson-4': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-4-stewardship-sw_565cf50e.vtt',
  'wesleyan-lesson-5': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-5-small-groups-sw_02df3329.vtt',
  'wesleyan-lesson-6': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-6-practical-holiness-sw_9f88204a.vtt',
  
  // Christian Doctrine Course (6 videos)
  'doctrine-lesson-1': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-1-god-sw_e330c710.vtt',
  'doctrine-lesson-2': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-2-jesus-sw_c019a715.vtt',
  'doctrine-lesson-3': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-3-holy-spirit-sw_8b44d852.vtt',
  'doctrine-lesson-4': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-4-salvation-sw_a92ed069.vtt',
  'doctrine-lesson-5': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-5-church-sw_21c09724.vtt',
  'doctrine-lesson-6': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-6-eternity-sw_1ff1f76e.vtt',
};

try {
  console.log('Fetching all module videos...');
  
  // Get all module videos
  const [videos] = await connection.query('SELECT id, title FROM module_videos ORDER BY id');
  
  console.log(`Found ${videos.length} videos in database`);
  
  let insertedCount = 0;
  
  // For each video, try to find matching Swahili subtitle
  for (const video of videos) {
    // Try to match video title to subtitle URL pattern
    let subtitleUrl = null;
    let matchKey = null;
    
    // Check for exact matches in subtitle URLs
    for (const [key, url] of Object.entries(subtitleUrls)) {
      if (video.title.toLowerCase().includes(key.replace('-', ' ')) || 
          key.toLowerCase().includes(video.title.toLowerCase().split(' ')[0])) {
        subtitleUrl = url;
        matchKey = key;
        break;
      }
    }
    
    if (subtitleUrl) {
      console.log(`Linking video ${video.id} (${video.title}) to Swahili subtitles (${matchKey})`);
      
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
        insertedCount++;
      } else {
        console.log(`  → Subtitle already exists for video ${video.id}`);
      }
    } else {
      console.log(`No matching subtitle found for video: ${video.title}`);
    }
  }
  
  console.log(`\n✅ Successfully inserted ${insertedCount} Swahili subtitle records`);
  
} catch (error) {
  console.error('Error:', error);
} finally {
  await connection.end();
}

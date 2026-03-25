import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Precise mapping of module names and lesson numbers to Swahili subtitle URLs
const subtitleMapping = {
  // Wesleyan Theology Course - 6 lessons
  'Wesleyan Theology': {
    1: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-1-grace-sw_b223d328.vtt',
    2: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-2-sanctification-sw_b49716df.vtt',
    3: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-3-social-holiness-sw_60c5f51b.vtt',
    4: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-4-stewardship-sw_565cf50e.vtt',
    5: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-5-small-groups-sw_02df3329.vtt',
    6: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/wesleyan-lesson-6-practical-holiness-sw_9f88204a.vtt',
  },
  
  // Introduction to Christian Doctrine Course - 6 lessons
  'Introduction to Christian Doctrine': {
    1: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-1-god-sw_e330c710.vtt',
    2: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-2-jesus-sw_c019a715.vtt',
    3: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-3-holy-spirit-sw_8b44d852.vtt',
    4: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-4-salvation-sw_a92ed069.vtt',
    5: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-5-church-sw_21c09724.vtt',
    6: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/doctrine-lesson-6-eternity-sw_1ff1f76e.vtt',
  },
};

try {
  console.log('Fetching module and video structure...\n');
  
  // Get all modules with their videos
  const [modules] = await connection.query(`
    SELECT m.id as moduleId, m.title as moduleName, 
           v.id as videoId, v.lessonNumber, v.title as videoTitle
    FROM independent_study_modules m
    LEFT JOIN module_videos v ON m.id = v.moduleId
    ORDER BY m.id, v.lessonNumber
  `);
  
  console.log(`Found ${modules.length} video records\n`);
  
  // Group by module
  const moduleMap = {};
  for (const row of modules) {
    if (!moduleMap[row.moduleId]) {
      moduleMap[row.moduleId] = {
        moduleName: row.moduleName,
        videos: []
      };
    }
    if (row.videoId) {
      moduleMap[row.moduleId].videos.push({
        videoId: row.videoId,
        lessonNumber: row.lessonNumber,
        title: row.videoTitle
      });
    }
  }
  
  console.log('Module Structure:');
  for (const [moduleId, moduleData] of Object.entries(moduleMap)) {
    console.log(`\n  Module ${moduleId}: ${moduleData.moduleName}`);
    moduleData.videos.forEach(v => {
      console.log(`    - Video ${v.videoId}: Lesson ${v.lessonNumber} - ${v.title}`);
    });
  }
  
  console.log('\n\nUpdating Swahili subtitles...\n');
  
  let updatedCount = 0;
  
  // Update subtitles based on module name and lesson number
  for (const [moduleId, moduleData] of Object.entries(moduleMap)) {
    const moduleName = moduleData.moduleName;
    const subtitlesByLesson = subtitleMapping[moduleName];
    
    if (!subtitlesByLesson) {
      console.log(`⚠️  No subtitle mapping found for module: ${moduleName}`);
      continue;
    }
    
    console.log(`Processing module: ${moduleName}`);
    
    for (const video of moduleData.videos) {
      const lessonNum = video.lessonNumber;
      const subtitleUrl = subtitlesByLesson[lessonNum];
      
      if (!subtitleUrl) {
        console.log(`  ⚠️  No subtitle for lesson ${lessonNum}`);
        continue;
      }
      
      // Check if subtitle already exists
      const [existing] = await connection.query(
        'SELECT id FROM video_subtitles WHERE videoId = ? AND language = ?',
        [video.videoId, 'sw']
      );
      
      if (existing.length === 0) {
        // Insert new subtitle record
        await connection.query(
          'INSERT INTO video_subtitles (videoId, language, languageName, subtitleUrl, isDefault) VALUES (?, ?, ?, ?, ?)',
          [video.videoId, 'sw', 'Kiswahili', subtitleUrl, 0]
        );
        console.log(`  ✅ Added Swahili subtitle for video ${video.videoId} (Lesson ${lessonNum})`);
        updatedCount++;
      } else {
        console.log(`  ℹ️  Subtitle already exists for video ${video.videoId} (Lesson ${lessonNum})`);
      }
    }
  }
  
  console.log(`\n✅ Successfully updated ${updatedCount} Swahili subtitle records`);
  
} catch (error) {
  console.error('Error:', error);
} finally {
  await connection.end();
}

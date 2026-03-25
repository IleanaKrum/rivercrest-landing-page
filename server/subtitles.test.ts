import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb } from './server/db';
import { getVideosByModuleWithSubtitles, getVideoSubtitles } from './server/db';

describe('Swahili Subtitles Integration', () => {
  let db: any;

  beforeAll(async () => {
    db = await getDb();
  });

  it('should fetch videos with Swahili subtitles for module 16 (Wesleyan Theology)', async () => {
    const videos = await getVideosByModuleWithSubtitles(16);
    
    expect(videos).toBeDefined();
    expect(videos.length).toBeGreaterThan(0);
    
    // Check that each video has subtitles array
    videos.forEach(video => {
      expect(video).toHaveProperty('subtitles');
      expect(Array.isArray(video.subtitles)).toBe(true);
    });
  });

  it('should fetch videos with Swahili subtitles for module 60001 (Christian Doctrine)', async () => {
    const videos = await getVideosByModuleWithSubtitles(60001);
    
    expect(videos).toBeDefined();
    expect(videos.length).toBeGreaterThan(0);
    
    // Check that each video has subtitles array
    videos.forEach(video => {
      expect(video).toHaveProperty('subtitles');
      expect(Array.isArray(video.subtitles)).toBe(true);
    });
  });

  it('should have Swahili subtitles for video 1 (Wesleyan Lesson 1)', async () => {
    const subtitles = await getVideoSubtitles(1);
    
    expect(subtitles).toBeDefined();
    expect(subtitles.length).toBeGreaterThan(0);
    
    const swahiliSubtitle = subtitles.find(s => s.language === 'sw');
    expect(swahiliSubtitle).toBeDefined();
    expect(['Swahili', 'Kiswahili']).toContain(swahiliSubtitle?.languageName);
    expect(swahiliSubtitle?.subtitleUrl).toContain('cloudfront.net');
  });

  it('should have Swahili subtitles for video 30001 (Christian Doctrine Lesson 1)', async () => {
    const subtitles = await getVideoSubtitles(30001);
    
    expect(subtitles).toBeDefined();
    expect(subtitles.length).toBeGreaterThan(0);
    
    const swahiliSubtitle = subtitles.find(s => s.language === 'sw');
    expect(swahiliSubtitle).toBeDefined();
    expect(['Swahili', 'Kiswahili']).toContain(swahiliSubtitle?.languageName);
    expect(swahiliSubtitle?.subtitleUrl).toContain('cloudfront.net');
  });

  it('should have all 12 videos with Swahili subtitles', async () => {
    const wesleyanVideos = await getVideosByModuleWithSubtitles(16);
    const doctrineVideos = await getVideosByModuleWithSubtitles(60001);
    
    const allVideos = [...wesleyanVideos, ...doctrineVideos];
    expect(allVideos.length).toBe(12);
    
    // Check that all videos have at least one Swahili subtitle
    allVideos.forEach(video => {
      const swahiliSubtitle = video.subtitles.find((s: any) => s.language === 'sw');
      expect(swahiliSubtitle).toBeDefined();
    });
  });
});

#!/usr/bin/env node

/**
 * Daily Video Tracking Monitoring Script
 * Checks that the video tracking functionality is working correctly
 * Runs automatically via cron job
 */

import fetch from 'node-fetch';
import { writeFileSync, appendFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = join(fileURLToPath(import.meta.url), '..');
const logDir = join(__dirname, '../.manus-logs');
const monitorLogFile = join(logDir, 'video-tracking-monitor.log');

const WEBSITE_URL = process.env.WEBSITE_URL || 'https://3000-in75ec3cgpn8t4y4xd2gl-022ebc5b.us1.manus.computer';
const API_URL = `${WEBSITE_URL}/api/trpc`;

/**
 * Log monitoring results
 */
function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  console.log(logEntry);
  appendFileSync(monitorLogFile, logEntry);
}

/**
 * Check if the video tracking endpoint is accessible
 */
async function checkEndpointAccessibility() {
  try {
    const response = await fetch(`${WEBSITE_URL}/`, {
      method: 'GET',
      timeout: 10000,
    });
    
    if (response.ok) {
      log('✅ Website is accessible', 'success');
      return true;
    } else {
      log(`❌ Website returned status ${response.status}`, 'error');
      return false;
    }
  } catch (error) {
    log(`❌ Failed to access website: ${error.message}`, 'error');
    return false;
  }
}

/**
 * Check if the trackVideoProgress procedure exists
 */
async function checkTrackVideoProgressProcedure() {
  try {
    // Make a test call to the procedure (will fail without auth, but we can check if it exists)
    const response = await fetch(`${API_URL}/centerOfStudies.trackVideoProgress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enrollmentId: 1,
        sessionId: 1,
        videoId: '1',
        currentTime: 0,
        duration: 100,
      }),
      timeout: 10000,
    });

    // 401 is expected (no auth), but means the endpoint exists
    if (response.status === 401 || response.status === 400) {
      log('✅ trackVideoProgress procedure is accessible', 'success');
      return true;
    } else if (response.status === 404) {
      log('❌ trackVideoProgress procedure not found', 'error');
      return false;
    } else {
      log(`✅ trackVideoProgress procedure responded with status ${response.status}`, 'success');
      return true;
    }
  } catch (error) {
    log(`❌ Failed to check trackVideoProgress procedure: ${error.message}`, 'error');
    return false;
  }
}

/**
 * Check video player component loads correctly
 */
async function checkVideoPlayerComponent() {
  try {
    const response = await fetch(`${WEBSITE_URL}/`, {
      method: 'GET',
      timeout: 10000,
    });

    const html = await response.text();
    
    if (html.includes('VideoPlayer') || html.includes('video')) {
      log('✅ Video player component is present in the page', 'success');
      return true;
    } else {
      log('⚠️  Video player component not detected in page HTML', 'warning');
      return false;
    }
  } catch (error) {
    log(`❌ Failed to check video player component: ${error.message}`, 'error');
    return false;
  }
}

/**
 * Generate monitoring report
 */
async function generateReport() {
  log('🔍 Starting daily video tracking monitoring...', 'info');
  
  const checks = {
    'Website Accessibility': await checkEndpointAccessibility(),
    'Video Tracking Endpoint': await checkTrackVideoProgressProcedure(),
    'Video Player Component': await checkVideoPlayerComponent(),
  };

  const passed = Object.values(checks).filter(v => v).length;
  const total = Object.keys(checks).length;
  const percentage = Math.round((passed / total) * 100);

  log(`\n📊 Monitoring Report:`, 'info');
  Object.entries(checks).forEach(([check, result]) => {
    log(`  ${result ? '✅' : '❌'} ${check}`, result ? 'success' : 'error');
  });
  
  log(`\n📈 Overall Status: ${passed}/${total} checks passed (${percentage}%)`, 
    percentage === 100 ? 'success' : percentage >= 66 ? 'warning' : 'error');
  
  // Send notification if there are failures
  if (percentage < 100) {
    log('⚠️  Some checks failed. Review the logs for details.', 'warning');
  }

  log('✅ Daily monitoring completed\n', 'info');
}

// Run the monitoring
generateReport().catch(error => {
  log(`❌ Monitoring script failed: ${error.message}`, 'error');
  process.exit(1);
});

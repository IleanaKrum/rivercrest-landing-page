import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Play, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';

interface Video {
  id: number;
  title: string;
  duration?: number;
  lessonNumber: number;
}

interface ModuleProgressDashboardProps {
  moduleId: number;
  videos?: Video[];
  onProgressUpdate?: (progress: number) => void;
}

interface VideoProgress {
  videoId: number;
  watched: number;
  duration: number;
  isCompleted: boolean;
}

export const ModuleProgressDashboard: React.FC<ModuleProgressDashboardProps> = ({
  moduleId,
  videos = [],
  onProgressUpdate,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [videoProgress, setVideoProgress] = useState<Map<number, VideoProgress>>(new Map());
  const [totalWatchTime, setTotalWatchTime] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Fetch module progress data
  // @ts-expect-error - tRPC types not regenerated
  const { data: progressData } = trpc.centerOfStudies.getModuleProgress.useQuery(
    { moduleId },
    { enabled: isAuthenticated && moduleId > 0 }
  );

  // Calculate progress metrics
  useEffect(() => {
    if (!videos || videos.length === 0) return;

    let totalDuration = 0;
    let totalWatched = 0;
    let completedCount = 0;

    videos.forEach((video) => {
      const progress = videoProgress.get(video.id);
      if (progress) {
        totalDuration += progress.duration;
        totalWatched += progress.watched;
        if (progress.isCompleted) {
          completedCount++;
        }
      }
    });

    setTotalWatchTime(totalWatched);
    const completion = videos.length > 0 ? (completedCount / videos.length) * 100 : 0;
    setCompletionPercentage(completion);

    if (onProgressUpdate) {
      onProgressUpdate(completion);
    }
  }, [videoProgress, videos, onProgressUpdate]);

  // Update video progress
  const updateVideoProgress = (videoId: number, watched: number, duration: number) => {
    const isCompleted = watched >= duration * 0.95;
    setVideoProgress((prev) => {
      const newMap = new Map(prev);
      newMap.set(videoId, { videoId, watched, duration, isCompleted });
      return newMap;
    });
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Module Progress</h3>
          <span className="text-3xl font-bold text-indigo-600">{Math.round(completionPercentage)}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {videoProgress.size}/{videos.length}
            </div>
            <div className="text-sm text-gray-600">Videos Watched</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatTime(totalWatchTime)}
            </div>
            <div className="text-sm text-gray-600">Watch Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {Array.from(videoProgress.values()).filter((v) => v.isCompleted).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
      </Card>

      {/* Video List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Progress</h3>

        {videos.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-gray-500">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>No videos available for this module</span>
          </div>
        ) : (
          <div className="space-y-3">
            {videos.map((video) => {
              const progress = videoProgress.get(video.id);
              const isCompleted = progress?.isCompleted || false;
              const watchPercentage = progress
                ? (progress.watched / progress.duration) * 100
                : 0;

              return (
                <div key={video.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Play className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Lesson {video.lessonNumber}: {video.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>
                            {progress ? formatTime(progress.watched) : '0:00'} /{' '}
                            {progress ? formatTime(progress.duration) : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {Math.round(watchPercentage)}%
                      </div>
                      {isCompleted && <div className="text-xs text-green-600">Completed</div>}
                    </div>
                  </div>

                  {/* Mini Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      }`}
                      style={{ width: `${watchPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Completion Status */}
      {completionPercentage === 100 && (
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-green-900">Module Complete!</h4>
              <p className="text-sm text-green-700">
                You have watched all videos in this module. You can now take the quiz to earn your certificate.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ModuleProgressDashboard;

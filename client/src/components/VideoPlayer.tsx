import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, Subtitles, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';

interface Subtitle {
  id: number;
  language: string;
  languageName: string;
  subtitleUrl: string;
  isDefault: number;
}

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  description?: string;
  subtitles?: Subtitle[];
  duration?: number;
  poster?: string;
  videoId?: number;
  moduleId?: number;
  onCompletionChange?: (isCompleted: boolean) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  description,
  subtitles = [],
  duration,
  poster,
  videoId,
  moduleId,
  onCompletionChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(duration || 0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState<Subtitle | null>(
    subtitles.find(s => s.isDefault) || subtitles[0] || null
  );
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [subtitleFontSize, setSubtitleFontSize] = useState('normal');
  const [subtitleBgOpacity, setSubtitleBgOpacity] = useState(0.8);
  const [showTranscriptMenu, setShowTranscriptMenu] = useState(false);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const trackingIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const { user } = useAuth();
  const trackVideoProgressMutation = trpc.centerOfStudies.trackVideoProgress.useMutation();

  // Generate transcript from subtitles
  const generateTranscript = (format: 'txt' | 'pdf') => {
    if (!selectedSubtitle) return;

    let transcriptText = `Transcript: ${title}\nLanguage: ${selectedSubtitle.languageName}\n\n`;
    
    // In a real implementation, you would parse the VTT file and extract text
    // For now, we'll create a simple transcript
    transcriptText += `Video Duration: ${formatTime(videoDuration)}\n`;
    transcriptText += `Watched: ${formatTime(currentTime)}\n\n`;
    transcriptText += `[Full transcript would be extracted from subtitle file]\n`;

    if (format === 'txt') {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(transcriptText));
      element.setAttribute('download', `${title}-transcript.txt`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    setShowTranscriptMenu(false);
  };

  // Handle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && containerRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * videoDuration;
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  // Handle subtitle selection
  const handleSubtitleSelect = (subtitle: Subtitle | null) => {
    setSelectedSubtitle(subtitle);
    setShowSubtitleMenu(false);
  };

  // Handle playback speed change
  const handlePlaybackSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSettingsMenu(false);
  };

  // Get subtitle style classes
  const getSubtitleStyles = () => {
    const fontSizeMap = {
      small: 'text-sm',
      normal: 'text-base',
      large: 'text-lg',
    };
    return fontSizeMap[subtitleFontSize as keyof typeof fontSizeMap] || 'text-base';
  };

  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Format time display
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

  // Track video progress
  useEffect(() => {
    if (!user || !videoId || !moduleId || !videoDuration) return;

    // Set up interval to track progress every 5 seconds
    trackingIntervalRef.current = setInterval(() => {
      if (videoRef.current) {
        const watched = videoRef.current.currentTime;
        const completionThreshold = videoDuration * 0.95;
        const completed = watched >= completionThreshold;

        // Track progress - only if user is logged in and we have required IDs
        if (user && videoId && moduleId) {
          trackVideoProgressMutation.mutate({
            enrollmentId: moduleId, // Using moduleId as enrollmentId for now
            sessionId: videoId, // Using videoId as sessionId for now
            videoId: String(videoId), // Convert to string as expected by backend
            currentTime: Math.floor(watched),
            duration: Math.floor(videoDuration),
          });
        }

        // Update completion state
        if (completed && !isCompleted) {
          setIsCompleted(true);
          onCompletionChange?.(true);
        }
      }
    }, 5000);

    return () => {
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
      }
    };
  }, [user, videoId, moduleId, videoDuration, isCompleted, onCompletionChange, trackVideoProgressMutation]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full bg-black rounded-lg overflow-hidden group"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoUrl}
          poster={poster}
          className="w-full h-auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Subtitles */}
        {selectedSubtitle && (
          <track
            key={selectedSubtitle.id}
            kind="subtitles"
            src={selectedSubtitle.subtitleUrl}
            srcLang={selectedSubtitle.language}
            label={selectedSubtitle.languageName}
            default
          />
        )}

        {/* Subtitle Styling */}
        <style>{`
          video::cue {
            background-image: linear-gradient(to right, rgba(0, 0, 0, ${subtitleBgOpacity}), rgba(0, 0, 0, ${subtitleBgOpacity})));
            background-color: rgba(0, 0, 0, ${subtitleBgOpacity});
            color: white;
          }
        `}</style>

        {/* Controls Container */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Progress Bar */}
          <div
            onClick={handleProgressClick}
            className="w-full h-1 bg-gray-600 rounded-full cursor-pointer mb-3 group/progress hover:h-2 transition-all"
          >
            <div
              className="h-full bg-red-600 rounded-full transition-all"
              style={{ width: `${(currentTime / videoDuration) * 100}%` }}
            >
              <div className="float-right w-3 h-3 bg-white rounded-full -mt-1 -mr-1.5 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-2">
              {/* Play/Pause Button */}
              <Button
                size="sm"
                variant="ghost"
                onClick={togglePlayPause}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>

              {/* Volume Control */}
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-gray-600 rounded-full cursor-pointer accent-red-600"
                />
              </div>

              {/* Time Display */}
              <span className="text-white text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(videoDuration)}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Subtitle Toggle */}
              <div className="relative">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowSubtitleMenu(!showSubtitleMenu)}
                  className={`text-white hover:bg-white/20 ${
                    selectedSubtitle ? 'bg-white/20' : ''
                  }`}
                >
                  <Subtitles className="w-5 h-5" />
                </Button>

                {/* Subtitle Menu */}
                {showSubtitleMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg shadow-lg z-50 min-w-48">
                    <div className="p-2">
                      <div className="text-white text-sm font-semibold px-3 py-2">
                        Subtitles
                      </div>
                      {/* No Subtitles Option */}
                      <button
                        onClick={() => handleSubtitleSelect(null)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          selectedSubtitle === null
                            ? 'bg-red-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        Off
                      </button>
                      {/* Subtitle Options */}
                      {subtitles.map((subtitle) => (
                        <button
                          key={subtitle.id}
                          onClick={() => handleSubtitleSelect(subtitle)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            selectedSubtitle?.id === subtitle.id
                              ? 'bg-red-600 text-white'
                              : 'text-gray-300 hover:bg-gray-800'
                          }`}
                        >
                          {subtitle.languageName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Settings Menu */}
              <div className="relative">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="w-5 h-5" />
                </Button>

                {/* Settings Menu */}
                {showSettingsMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg shadow-lg z-50 min-w-56">
                    <div className="p-2">
                      <div className="text-white text-sm font-semibold px-3 py-2">
                        Playback Speed
                      </div>
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handlePlaybackSpeedChange(speed)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            playbackSpeed === speed
                              ? 'bg-red-600 text-white'
                              : 'text-gray-300 hover:bg-gray-800'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                      
                      <div className="border-t border-gray-700 mt-2 pt-2">
                        <div className="text-white text-sm font-semibold px-3 py-2">
                          Subtitle Size
                        </div>
                        {['small', 'normal', 'large'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setSubtitleFontSize(size)}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                              subtitleFontSize === size
                                ? 'bg-red-600 text-white'
                                : 'text-gray-300 hover:bg-gray-800'
                            }`}
                          >
                            {size.charAt(0).toUpperCase() + size.slice(1)}
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-gray-700 mt-2 pt-2">
                        <div className="text-white text-sm font-semibold px-3 py-2">
                          Subtitle Background
                        </div>
                        <div className="px-3 py-2">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={subtitleBgOpacity}
                            onChange={(e) => setSubtitleBgOpacity(parseFloat(e.target.value))}
                            className="w-full h-1 bg-gray-600 rounded-full cursor-pointer accent-red-600"
                          />
                          <div className="text-gray-300 text-xs mt-1">
                            Opacity: {Math.round(subtitleBgOpacity * 100)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Transcript Download */}
              <div className="relative">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowTranscriptMenu(!showTranscriptMenu)}
                  className="text-white hover:bg-white/20"
                >
                  <Download className="w-5 h-5" />
                </Button>

                {/* Transcript Menu */}
                {showTranscriptMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg shadow-lg z-50 min-w-40">
                    <div className="p-2">
                      <div className="text-white text-sm font-semibold px-3 py-2">
                        Download Transcript
                      </div>
                      <button
                        onClick={() => generateTranscript('txt')}
                        className="w-full text-left px-3 py-2 rounded text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                      >
                        As Text (.txt)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen Button */}
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Title Overlay (top) */}
        <div
          className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black via-black/50 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="text-white font-semibold text-lg">{title}</h3>
        </div>

        {/* Play Button Overlay (center) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group">
            <div
              onClick={togglePlayPause}
              className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors transform group-hover:scale-110"
            >
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      {description && (
        <div className="bg-card p-4 border-t border-border rounded-b-lg">
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

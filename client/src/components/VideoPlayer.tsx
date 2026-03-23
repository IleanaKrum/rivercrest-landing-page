import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  videoUrl: string;
  subtitleUrl?: string;
  title: string;
  description?: string;
}

export function VideoPlayer({
  videoUrl,
  subtitleUrl,
  title,
  description,
}: VideoPlayerProps) {
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg">
      <div className="relative bg-black aspect-video">
        <video
          key={videoUrl}
          className="w-full h-full"
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={videoUrl} type="video/mp4" />
          {subtitleUrl && showSubtitles && (
            <track
              kind="subtitles"
              src={subtitleUrl}
              srcLang="sw"
              label="Swahili"
              default
            />
          )}
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="bg-card p-4 border-t border-border">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {subtitleUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSubtitles(!showSubtitles)}
              className="ml-2 whitespace-nowrap"
            >
              {showSubtitles ? (
                <>
                  <Volume2 className="w-4 h-4 mr-1" />
                  Subtitles On
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 mr-1" />
                  Subtitles Off
                </>
              )}
            </Button>
          )}
        </div>

        {subtitleUrl && (
          <div className="text-xs text-muted-foreground">
            <p>
              🌍 Swahili subtitles available - Click "Subtitles On/Off" to
              toggle
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

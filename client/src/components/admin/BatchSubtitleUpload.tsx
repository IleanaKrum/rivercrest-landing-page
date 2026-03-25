import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface SubtitleFile {
  id: string;
  file: File;
  videoId: number;
  language: string;
  languageName: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface BatchSubtitleUploadProps {
  onUploadComplete?: () => void;
}

export const BatchSubtitleUpload: React.FC<BatchSubtitleUploadProps> = ({ onUploadComplete }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [subtitles, setSubtitles] = useState<SubtitleFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // tRPC mutation for batch upload
  // @ts-expect-error - tRPC types not regenerated
  const batchUploadMutation = trpc.admin.batchUploadSubtitles.useMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newSubtitles: SubtitleFile[] = [];

    files.forEach((file) => {
      // Validate file format
      if (!file.name.match(/\.(vtt|srt)$/i)) {
        console.warn(`Skipping ${file.name}: Invalid format. Only VTT and SRT files are supported.`);
        return;
      }

      newSubtitles.push({
        id: `${Date.now()}-${Math.random()}`,
        file,
        videoId: 0, // Will be set by user
        language: 'sw', // Default to Swahili
        languageName: 'Kiswahili',
        status: 'pending',
      });
    });

    setSubtitles((prev) => [...prev, ...newSubtitles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const updateSubtitle = (id: string, updates: Partial<SubtitleFile>) => {
    setSubtitles((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub))
    );
  };

  const removeSubtitle = (id: string) => {
    setSubtitles((prev) => prev.filter((sub) => sub.id !== id));
  };

  const handleUpload = async () => {
    // Validate all subtitles have required fields
    const invalid = subtitles.filter((sub) => sub.videoId === 0);
    if (invalid.length > 0) {
      alert('Please select a video for all subtitle files');
      return;
    }

    setIsUploading(true);

    try {
      // Upload each subtitle
      for (const subtitle of subtitles) {
        updateSubtitle(subtitle.id, { status: 'uploading' });

        try {
          // Read file as base64
          const reader = new FileReader();
          reader.onload = async (event) => {
            const base64 = (event.target?.result as string)?.split(',')[1];

            // Call upload mutation
            await batchUploadMutation.mutateAsync({
              videoId: subtitle.videoId,
              language: subtitle.language,
              languageName: subtitle.languageName,
              fileName: subtitle.file.name,
              fileContent: base64 || '',
            });

            updateSubtitle(subtitle.id, { status: 'success' });
          };
          reader.readAsDataURL(subtitle.file);
        } catch (error) {
          updateSubtitle(subtitle.id, {
            status: 'error',
            error: error instanceof Error ? error.message : 'Upload failed',
          });
        }
      }

      // Wait for all uploads to complete
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onUploadComplete) {
        onUploadComplete();
      }
    } finally {
      setIsUploading(false);
    }
  };

  const successCount = subtitles.filter((s) => s.status === 'success').length;
  const errorCount = subtitles.filter((s) => s.status === 'error').length;

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch Subtitle Upload</h3>

        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-900 font-medium">Click to select subtitle files</p>
          <p className="text-sm text-gray-600">or drag and drop VTT/SRT files</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".vtt,.srt"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* File List */}
        {subtitles.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-gray-900">Files to Upload ({subtitles.length})</h4>

            {subtitles.map((subtitle) => (
              <div
                key={subtitle.id}
                className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{subtitle.file.name}</div>
                  <div className="flex gap-4 mt-2">
                    <input
                      type="number"
                      placeholder="Video ID"
                      value={subtitle.videoId || ''}
                      onChange={(e) =>
                        updateSubtitle(subtitle.id, { videoId: parseInt(e.target.value) || 0 })
                      }
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <select
                      value={subtitle.language}
                      onChange={(e) => {
                        const lang = e.target.value;
                        const langName = lang === 'sw' ? 'Kiswahili' : lang === 'en' ? 'English' : lang;
                        updateSubtitle(subtitle.id, { language: lang, languageName: langName });
                      }}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="sw">Kiswahili</option>
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {subtitle.status === 'pending' && (
                    <div className="text-sm text-gray-600">Ready</div>
                  )}
                  {subtitle.status === 'uploading' && (
                    <Loader className="w-5 h-5 text-blue-500 animate-spin" />
                  )}
                  {subtitle.status === 'success' && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {subtitle.status === 'error' && (
                    <div title={subtitle.error}>
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                  <button
                    onClick={() => removeSubtitle(subtitle.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <Button
            onClick={handleUpload}
            disabled={subtitles.length === 0 || isUploading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isUploading ? 'Uploading...' : `Upload ${subtitles.length} Files`}
          </Button>
          {subtitles.length > 0 && (
            <Button
              onClick={() => setSubtitles([])}
              variant="outline"
              disabled={isUploading}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Summary */}
        {(successCount > 0 || errorCount > 0) && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex gap-4">
              {successCount > 0 && (
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{successCount} uploaded successfully</span>
                </div>
              )}
              {errorCount > 0 && (
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span>{errorCount} failed</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BatchSubtitleUpload;

import React, { useState } from 'react';
import { Smartphone, Search, Download, ExternalLink, AlertCircle, Loader2, Coins, Play, FileVideo, Music, Youtube } from 'lucide-react';
import { CreditProps } from '../types';

interface VideoOption {
  resolution: string;
  size: string;
  type: 'video' | 'audio';
  format: string;
}

export const YouTubeShortsDownloader: React.FC<CreditProps> = ({ deductCredits }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [options, setOptions] = useState<VideoOption[]>([]);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const COST = 5;

  const extractVideoId = (inputUrl: string) => {
    try {
      // Regex specifically for Shorts URLs
      const regex = /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;
      const match = inputUrl.match(regex);
      if (match && match[1]) {
        return match[1];
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  const handleFetch = async () => {
    if (!url) return;
    
    if (!deductCredits(COST)) {
        setError(`Insufficient credits! You need ${COST} coins to fetch this Short.`);
        return;
    }

    setLoading(true);
    setError('');
    setVideoId(null);
    setOptions([]);

    // Simulate fetch delay and retrieving formats
    setTimeout(() => {
      const id = extractVideoId(url);
      if (id) {
        setVideoId(id);
        // Mock available resolutions
        setOptions([
            { resolution: '1080p HD', size: '18.5 MB', type: 'video', format: 'MP4' },
            { resolution: '720p', size: '9.2 MB', type: 'video', format: 'MP4' },
            { resolution: '480p', size: '4.8 MB', type: 'video', format: 'MP4' },
            { resolution: 'Audio Only', size: '2.1 MB', type: 'audio', format: 'MP3' },
        ]);
      } else {
        setError('Invalid YouTube Shorts URL. Ensure link format is youtube.com/shorts/...');
      }
      setLoading(false);
    }, 1500);
  };

  const handleDownload = (option: VideoOption) => {
    if (downloading) return;
    setDownloading(option.resolution);
    setProgress(0);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
        currentProgress += 5;
        if (currentProgress > 100) currentProgress = 100;
        
        setProgress(currentProgress);

        if (currentProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                setDownloading(null);
                setProgress(0);
                window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
            }, 500);
        }
    }, 100);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-red-600 to-red-500 rounded-xl p-[2px]">
            <div className="bg-black rounded-[10px] p-2">
                <Smartphone className="text-white" size={28} />
            </div>
          </div>
          YouTube Shorts Downloader
        </h2>
        <p className="text-slate-400 text-lg">Paste a YouTube Shorts URL to view and download vertical videos.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="https://www.youtube.com/shorts/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-red-500/50 outline-none transition-all placeholder:text-slate-600"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className="bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-red-600/20 group"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          {loading ? 'Processing...' : 'Fetch Short'}
           {!loading && (
                 <span className="bg-black/20 px-2 py-0.5 rounded text-xs flex items-center gap-1 ml-1 group-hover:bg-black/30 transition-colors">
                    <Coins size={10} className="text-amber-400" /> {COST}
                 </span>
            )}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm animate-shake">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {videoId && (
        <div className="glass-panel rounded-2xl p-6 md:p-8 animate-slide-up grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Preview Section */}
          <div className="space-y-4">
             <div className="flex items-center justify-between mb-2">
                 <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                     <Play size={18} className="text-red-500" /> Video Preview
                 </h3>
                 <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Youtube size={12} /> YouTube Player
                 </span>
             </div>
             
             <div className="rounded-xl overflow-hidden border border-white/10 bg-black flex justify-center shadow-2xl relative group">
                 <div className="relative w-full pb-[177.77%] max-w-[320px] mx-auto bg-black/50">
                    <iframe 
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&controls=1`}
                        title="YouTube Shorts Preview"
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                 </div>
             </div>
             
             <p className="text-center text-xs text-slate-500">
                Previewing content from YouTube servers
             </p>
          </div>

          {/* Download Options */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
                <h3 className="text-2xl font-bold text-white mb-2">Download Options</h3>
                <p className="text-slate-400 text-sm">
                    Select quality to start download. Higher resolution files are larger.
                </p>
            </div>

            <div className="grid gap-3">
                {options.map((opt, idx) => {
                    const isDownloadingThis = downloading === opt.resolution;
                    return (
                        <button 
                            key={idx}
                            onClick={() => handleDownload(opt)}
                            disabled={!!downloading}
                            className={`relative overflow-hidden flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 transition-all group active:scale-[0.98] ${!downloading ? 'hover:bg-white/10 hover:border-red-500/30' : ''}`}
                        >
                            {/* Progress Bar Background */}
                            {isDownloadingThis && (
                                <div 
                                    className="absolute bottom-0 left-0 h-1 bg-red-500 z-20 transition-all duration-100 ease-linear"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            )}

                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`p-3 rounded-lg ${opt.type === 'audio' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-red-500/10 text-red-500'} group-hover:scale-110 transition-transform`}>
                                    {isDownloadingThis ? (
                                        <Loader2 size={24} className="animate-spin" />
                                    ) : opt.type === 'audio' ? (
                                        <Music size={24} />
                                    ) : (
                                        <FileVideo size={24} />
                                    )}
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-white">{opt.resolution}</div>
                                    <div className="text-xs text-slate-400">{opt.format} • {opt.size}</div>
                                </div>
                            </div>
                            
                            <div className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors min-w-[100px] text-center ${isDownloadingThis ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-slate-300 group-hover:bg-red-600 group-hover:text-white'}`}>
                                {isDownloadingThis ? `${progress}%` : 'Download'}
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-200 backdrop-blur-sm flex items-start gap-3">
                <ExternalLink size={16} className="mt-0.5 shrink-0" />
                <p>
                    <span className="font-bold block mb-1">External Download</span>
                    If direct download fails, the video will open in a new tab where you can save it manually.
                </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
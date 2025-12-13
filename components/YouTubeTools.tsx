import React, { useState } from 'react';
import { Search, Download, ExternalLink, Youtube, AlertCircle, Coins } from 'lucide-react';
import { CreditProps } from '../types';

export const YouTubeTools: React.FC<CreditProps> = ({ deductCredits }) => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const COST = 5;

  const extractVideoId = (inputUrl: string) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = inputUrl.match(regExp);
      if (match && match[2].length === 11) {
        setVideoId(match[2]);
        setError('');
      } else {
        setError('Invalid YouTube URL. Please try again.');
        setVideoId(null);
      }
    } catch (e) {
      setError('An error occurred while parsing the URL.');
    }
  };

  const handleFetch = () => {
    if (!url) return;
    
    // Simple fetch doesn't deduct, only downloading should? 
    // Let's just deduct on fetch to "unlock" the video assets
    if (!deductCredits(COST)) {
        setError(`Insufficient credits! You need ${COST} coins to fetch video assets.`);
        return;
    }

    extractVideoId(url);
  };

  const handleDownload = async (imageUrl: string, fileName: string) => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
        window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20">
            <Youtube className="text-red-500" size={32} />
          </div>
          YouTube Asset Grabber
        </h2>
        <p className="text-slate-400 text-lg">Paste a video URL to extract the Ultra HD (MaxRes) thumbnail instantly.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-600"
        />
        <button
          onClick={handleFetch}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 group"
        >
          <Search size={20} />
          <span>Fetch Asset</span>
          <span className="bg-black/20 px-2 py-0.5 rounded text-xs flex items-center gap-1 ml-1 group-hover:bg-black/30 transition-colors">
             <Coins size={10} className="text-amber-400" /> {COST}
          </span>
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm animate-shake">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {videoId && (
        <div className="glass-panel rounded-2xl p-6 md:p-8 animate-slide-up">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/40 mb-8 relative group shadow-2xl border border-white/5">
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Thumbnail"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <span className="text-white font-medium border border-white/30 bg-black/30 px-6 py-2 rounded-full backdrop-blur-md">Preview</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
                onClick={() => handleDownload(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, `thumbnail-${videoId}-max.jpg`)}
                className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white p-4 rounded-xl transition-all font-medium group"
            >
              <Download size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              Download Ultra HD (1080p)
            </button>
            <button 
                onClick={() => handleDownload(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, `thumbnail-${videoId}-hq.jpg`)}
                className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white p-4 rounded-xl transition-all font-medium group"
            >
              <Download size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              Download High Quality (720p)
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-sm text-slate-500">
             <span className="font-mono bg-white/5 px-2 py-1 rounded">ID: {videoId}</span>
             <a 
                href={`https://www.youtube.com/watch?v=${videoId}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-indigo-400 transition-colors"
             >
                Open Video <ExternalLink size={14} />
             </a>
          </div>
        </div>
      )}
    </div>
  );
};
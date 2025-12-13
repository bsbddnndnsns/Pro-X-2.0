import React, { useState } from 'react';
import { Film, Search, Download, ExternalLink, AlertCircle, Loader2, Coins } from 'lucide-react';
import { CreditProps } from '../types';

export const InstagramDownloader: React.FC<CreditProps> = ({ deductCredits }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mediaId, setMediaId] = useState<string | null>(null);

  const COST = 5;

  const extractPostId = (inputUrl: string) => {
    try {
      const regex = /instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/;
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
        setError(`Insufficient credits! You need ${COST} coins to fetch this Reel.`);
        return;
    }

    setLoading(true);
    setError('');
    setMediaId(null);

    setTimeout(() => {
      const id = extractPostId(url);
      if (id) {
        setMediaId(id);
      } else {
        setError('Invalid Instagram URL. Please check the link and try again.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-xl p-[2px]">
            <div className="bg-black rounded-[10px] p-2">
                <Film className="text-white" size={28} />
            </div>
          </div>
          Instagram Reels Downloader
        </h2>
        <p className="text-slate-400 text-lg">Paste an Instagram Reel or Post URL to view and download content.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="https://www.instagram.com/reel/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-pink-500/50 outline-none transition-all placeholder:text-slate-600"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-pink-600/20 group"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          {loading ? 'Processing...' : 'Fetch Reel'}
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

      {mediaId && (
        <div className="glass-panel rounded-2xl p-6 md:p-8 animate-slide-up grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Preview Section */}
          <div className="space-y-4">
             <h3 className="font-semibold text-slate-200 mb-2 flex items-center gap-2">
                 <Film size={18} className="text-pink-400" /> Preview
             </h3>
             <div className="rounded-xl overflow-hidden border border-white/10 bg-black flex justify-center shadow-2xl">
                <iframe 
                    src={`https://www.instagram.com/p/${mediaId}/embed`} 
                    className="w-full min-h-[500px]"
                    frameBorder="0" 
                    scrolling="no" 
                    allowTransparency={true}
                ></iframe>
             </div>
          </div>

          {/* Download Options */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Download</h3>
                <p className="text-slate-400 leading-relaxed">
                    Select a format below. Note: Direct video downloads may be limited by Instagram's browser security policies.
                </p>
            </div>

            <div className="space-y-4">
                <button 
                    onClick={() => window.open(`https://www.instagram.com/p/${mediaId}/`, '_blank')}
                    className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 text-white p-5 rounded-xl transition-all font-medium group border border-white/5 hover:border-pink-500/30"
                >
                    <span className="flex items-center gap-4">
                        <div className="bg-pink-500/10 p-3 rounded-lg text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                            <Film size={24} />
                        </div>
                        <span className="text-lg">Open Original Post</span>
                    </span>
                    <ExternalLink size={20} className="text-slate-500 group-hover:text-white transition-colors" />
                </button>
                
                <button 
                    disabled
                    className="w-full flex items-center justify-between bg-white/5 text-slate-500 p-5 rounded-xl cursor-not-allowed border border-white/5 opacity-60"
                >
                    <span className="flex items-center gap-4">
                        <div className="bg-slate-700/50 p-3 rounded-lg">
                            <Download size={24} />
                        </div>
                        <span className="text-lg">Direct MP4 (Server Required)</span>
                    </span>
                </button>
            </div>

            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-5 text-sm text-indigo-200 backdrop-blur-sm">
                <p className="font-bold mb-2 flex items-center gap-2">
                    <span className="bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider">Tip</span> 
                    Boost your reach
                </p>
                Use the <span className="text-white font-medium">Social Caption AI</span> tool to generate new viral captions for this content after downloading!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
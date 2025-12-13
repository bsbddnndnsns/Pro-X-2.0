import React, { useState } from 'react';
import { Instagram, Copy, Check, Hash, Sparkles, Coins } from 'lucide-react';
import { generateSocialCaptions } from '../services/geminiService';
import { CreditProps } from '../types';

export const SocialGenerator: React.FC<CreditProps> = ({ deductCredits }) => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const COST = 2;

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    if (!deductCredits(COST)) {
        setError(`Insufficient credits! You need ${COST} coins.`);
        setTimeout(() => setError(''), 3000); // Clear error after 3s
        return;
    }

    setLoading(true);
    setError('');
    try {
      const text = await generateSocialCaptions(topic, 'Instagram');
      setResult(text);
    } catch (error) {
      console.error(error);
      setError('Failed to generate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <div className="p-2 bg-pink-500/10 rounded-xl border border-pink-500/20">
            <Instagram className="text-pink-500" size={32} />
          </div>
          Social Caption AI
        </h2>
        <p className="text-slate-400 text-lg">Generate viral captions and hashtags for your next post.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <label className="block text-sm font-medium text-slate-300 mb-3">What is your post about?</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-pink-500/50 outline-none resize-none h-48 placeholder:text-slate-600"
              placeholder="E.g., A photo of my new puppy playing in the park..."
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!topic || loading}
            className={`
              w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg group
              ${!topic || loading 
                ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5' 
                : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-pink-500/25'}
            `}
          >
            {loading ? <Sparkles className="animate-spin" /> : <Hash size={20} />}
            {loading ? 'Generating...' : 'Generate Captions'}
            {!loading && (
                 <span className="bg-black/20 px-2 py-0.5 rounded text-xs flex items-center gap-1 ml-1 group-hover:bg-black/30 transition-colors">
                    <Coins size={10} className="text-amber-400" /> {COST}
                 </span>
            )}
          </button>
          
          {error && (
            <p className="text-red-300 text-sm text-center bg-red-500/10 p-3 rounded-xl border border-red-500/20 backdrop-blur-sm animate-shake">{error}</p>
          )}
        </div>

        <div className="glass-panel rounded-2xl p-6 relative min-h-[400px] flex flex-col border border-white/10">
           <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
              <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" /> Generated Content
              </h3>
              {result && (
                <button 
                  onClick={handleCopy}
                  className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors border border-transparent hover:border-white/10"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              )}
           </div>

           <div className="flex-1 bg-black/20 rounded-xl p-6 overflow-y-auto max-h-[500px] whitespace-pre-wrap text-slate-300 text-sm leading-relaxed border border-white/5 shadow-inner">
             {result ? result : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <Instagram size={24} className="opacity-50" />
                    </div>
                    <span className="italic">Your captions will appear here...</span>
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};
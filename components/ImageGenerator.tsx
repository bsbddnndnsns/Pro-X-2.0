import React, { useState } from 'react';
import { Palette, Sparkles, Download, RefreshCw, Loader2, Image as ImageIcon, Coins } from 'lucide-react';
import { generateImageFromText } from '../services/geminiService';
import { CreditProps } from '../types';

export const ImageGenerator: React.FC<CreditProps> = ({ deductCredits }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const COST = 10;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    if (!deductCredits(COST)) {
        setError(`Insufficient credits! You need ${COST} coins. Earn more in the Earn tab.`);
        return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await generateImageFromText(prompt);
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "A futuristic city with flying cars at sunset, cyberpunk style",
    "A cute robot painting a canvas in a sunlit studio, high detail",
    "A majestic lion made of crystals, dark background, 8k resolution"
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <div className="p-2 bg-teal-500/10 rounded-xl border border-teal-500/20">
            <Palette className="text-teal-500" size={32} />
          </div>
          AI Image Generator
        </h2>
        <p className="text-slate-400 text-lg">Transform your imagination into reality with AI-generated visuals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <label className="block text-sm font-medium text-slate-300 mb-3">Image Description</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-teal-500/50 outline-none resize-none h-40 placeholder:text-slate-600"
              placeholder="Describe the image you want to create in detail..."
            />
            
            <div className="mt-4">
              <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">Try these prompts:</p>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(p)}
                    className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/30 hover:text-teal-400 text-slate-400 px-4 py-2 rounded-full transition-colors text-left"
                  >
                    {p.length > 35 ? p.substring(0, 35) + '...' : p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt || loading}
            className={`
              w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg group
              ${!prompt || loading 
                ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5' 
                : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/25'}
            `}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            {loading ? 'Creating Masterpiece...' : 'Generate Image'}
             {!loading && (
                 <span className="bg-black/20 px-2 py-0.5 rounded text-xs flex items-center gap-1 ml-1 group-hover:bg-black/30 transition-colors">
                    <Coins size={10} className="text-amber-400" /> {COST}
                 </span>
            )}
          </button>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-xl text-sm backdrop-blur-sm animate-shake">
              {error}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col h-[600px] lg:h-auto border border-white/10">
          <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <ImageIcon size={18} className="text-teal-400" /> Generated Result
          </h3>
          
          <div className="flex-1 bg-black/30 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden relative group">
            {generatedImage ? (
              <>
                <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain shadow-2xl" />
                <a 
                  href={generatedImage} 
                  download={`generated-image-${Date.now()}.png`}
                  className="absolute bottom-6 right-6 bg-teal-600 hover:bg-teal-500 text-white p-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0"
                >
                  <Download size={24} />
                </a>
              </>
            ) : (
              <div className="text-slate-500 text-center p-6">
                {loading ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-teal-500 blur-xl opacity-20 animate-pulse"></div>
                            <Loader2 className="animate-spin text-teal-500 relative z-10" size={48} />
                        </div>
                        <p className="animate-pulse text-slate-300">Dreaming up your image...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-slate-600 mb-2 border border-white/5">
                            <Sparkles size={32} />
                        </div>
                        <p>Enter a prompt and hit generate</p>
                    </div>
                )}
              </div>
            )}
          </div>
          
          {generatedImage && (
             <div className="mt-4 flex justify-end">
                <button 
                    onClick={() => setGeneratedImage(null)}
                    className="text-slate-400 hover:text-white flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                    <RefreshCw size={14} /> Clear Result
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
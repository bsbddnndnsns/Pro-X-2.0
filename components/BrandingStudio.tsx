import React, { useState } from 'react';
import { PenTool, Image as ImageIcon, Download, RefreshCw, Loader2, Monitor, LayoutTemplate, Coins } from 'lucide-react';
import { generateImageFromText } from '../services/geminiService';
import { CreditProps } from '../types';

export const BrandingStudio: React.FC<CreditProps> = ({ deductCredits }) => {
  const [mode, setMode] = useState<'banner' | 'logo'>('banner');
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const COST = 25;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    if (!deductCredits(COST)) {
        setError(`Insufficient credits! You need ${COST} coins.`);
        return;
    }

    setLoading(true);
    setError('');
    
    try {
      let enhancedPrompt = prompt;
      if (mode === 'banner') {
          enhancedPrompt = `Create a professional YouTube Channel Art Banner (Aspect Ratio 16:9). Theme: ${prompt}. High quality, 4k, digital art, suitable for channel header.`;
      } else {
          enhancedPrompt = `Create a professional, minimalist vector logo. Concept: ${prompt}. Simple background, scalable vector style, high quality brand identity design.`;
      }

      const result = await generateImageFromText(enhancedPrompt);
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate branding asset');
    } finally {
      setLoading(false);
    }
  };

  const templates = {
    banner: [
        "Gaming channel, neon cyber city theme, futuristic",
        "Lifestyle vlog, pastel colors, cozy aesthetic, floral",
        "Tech review channel, sleek dark mode, circuit patterns"
    ],
    logo: [
        "Wolf mascot, esports style, aggressive, red and black",
        "Minimalist coffee cup, monoline style, elegant",
        "Abstract letter 'A' logo, tech startup, blue gradient"
    ]
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20">
            <PenTool className="text-orange-500" size={32} />
          </div>
          Branding Studio
        </h2>
        <p className="text-slate-400 text-lg">Create professional YouTube banners and brand logos instantly with AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                <button 
                    onClick={() => { setMode('banner'); setGeneratedImage(null); }}
                    className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all ${mode === 'banner' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <Monitor size={18} /> YouTube Banner
                </button>
                <button 
                    onClick={() => { setMode('logo'); setGeneratedImage(null); }}
                    className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all ${mode === 'logo' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <LayoutTemplate size={18} /> Logo Creator
                </button>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
                <label className="block text-sm font-medium text-slate-300 mb-3">
                    {mode === 'banner' ? 'Channel Theme & Style' : 'Logo Concept & Vibe'}
                </label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500/50 outline-none resize-none h-32 placeholder:text-slate-600"
                    placeholder={mode === 'banner' ? "E.g., Tech channel, dark mode, futuristic circuits..." : "E.g., Minimalist fox head, geometric style, orange..."}
                />
                
                <div className="mt-4">
                    <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">Templates:</p>
                    <div className="flex flex-wrap gap-2">
                        {templates[mode].map((t, i) => (
                            <button
                                key={i}
                                onClick={() => setPrompt(t)}
                                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 text-slate-400 px-3 py-1.5 rounded-full transition-colors text-left"
                            >
                                {t.substring(0, 30)}...
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
                        : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-orange-500/25'}
                `}
            >
                {loading ? <Loader2 className="animate-spin" /> : <PenTool size={20} />}
                {loading ? 'Designing Asset...' : `Generate ${mode === 'banner' ? 'Banner' : 'Logo'}`}
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

        {/* Output */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col h-[500px] border border-white/10">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                    <ImageIcon size={18} className="text-orange-400" /> Result Preview
                </h3>
                {generatedImage && (
                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-slate-400">
                        {mode === 'banner' ? '16:9 Aspect Ratio' : '1:1 Aspect Ratio'}
                    </span>
                )}
             </div>

             <div className={`flex-1 bg-black/30 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden relative group ${mode === 'banner' ? 'p-2' : 'p-8'}`}>
                {generatedImage ? (
                    <>
                        <img 
                            src={generatedImage} 
                            alt="Generated Asset" 
                            className={`shadow-2xl ${mode === 'banner' ? 'w-full h-auto aspect-video object-cover rounded-lg' : 'w-64 h-64 object-contain rounded-full bg-white/5 p-4'}`} 
                        />
                        <a 
                            href={generatedImage} 
                            download={`pro-x-${mode}-${Date.now()}.png`}
                            className="absolute bottom-6 right-6 bg-orange-600 hover:bg-orange-500 text-white p-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0"
                        >
                            <Download size={24} />
                        </a>
                    </>
                ) : (
                    <div className="text-slate-500 text-center p-6">
                        {loading ? (
                            <div className="flex flex-col items-center gap-4">
                                <Loader2 className="animate-spin text-orange-500" size={48} />
                                <p className="animate-pulse text-slate-300">AI is designing your {mode}...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <PenTool size={32} className="opacity-20" />
                                <p>Enter requirements to generate</p>
                            </div>
                        )}
                    </div>
                )}
             </div>
        </div>
      </div>
    </div>
  );
};
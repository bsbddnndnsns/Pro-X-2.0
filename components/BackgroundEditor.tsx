import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Wand2, Loader2, Download, RefreshCw, Sparkles, Coins } from 'lucide-react';
import { editImageBackground } from '../services/geminiService';
import { CreditProps } from '../types';

export const BackgroundEditor: React.FC<CreditProps> = ({ deductCredits }) => {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('Remove the background and place the subject on a pure white background.');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const COST = 15;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { 
        setError("File is too large. Please upload an image under 4MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setProcessedImage(null);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!image) return;
    
    // Credit Check
    if (!deductCredits(COST)) {
        setError(`Insufficient credits! You need ${COST} coins to process this image. Earn more in the Earn tab.`);
        return;
    }

    setLoading(true);
    setError('');
    
    try {
      const base64Data = image.split(',')[1];
      const result = await editImageBackground(base64Data, prompt);
      setProcessedImage(result);
    } catch (err: any) {
      setError(err.message || 'Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <Wand2 className="text-indigo-500" size={32} />
          </div>
          AI Background Studio
        </h2>
        <p className="text-slate-400 text-lg">Upload an image and use Gemini to remove or swap the background.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative h-80 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300
              ${image ? 'border-indigo-500/50 bg-black/20' : 'border-white/10 hover:border-indigo-500/30 hover:bg-white/5'}
            `}
          >
            {image ? (
              <img src={image} alt="Original" className="h-full w-full object-contain rounded-xl p-2" />
            ) : (
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 border border-white/5">
                  <Upload size={32} />
                </div>
                <p className="font-medium text-slate-200 text-lg">Click to upload image</p>
                <p className="text-sm text-slate-500 mt-2">JPG, PNG (Max 4MB)</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <label className="block text-sm font-medium text-slate-300 mb-3">Edit Instruction</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none resize-none h-24 placeholder:text-slate-600"
              placeholder="Describe how you want to change the background..."
            />
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  'Remove background and place on pure white background',
                  'Place subject in a neon cyber city street at night',
                  'Place subject on a tropical beach at sunset',
                  'Add a studio lighting effect dark background'
                ].map((preset, i) => (
                   <button 
                      key={i}
                      onClick={() => setPrompt(preset)}
                      className="text-xs bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 whitespace-nowrap text-slate-300 transition-colors"
                  >
                      {preset.split(' ').slice(0, 3).join(' ')}...
                  </button>
                ))}
            </div>
          </div>

          <button
            onClick={handleProcess}
            disabled={!image || loading}
            className={`
              w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg relative overflow-hidden group
              ${!image || loading 
                ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40'}
            `}
          >
            {loading ? (
                <Loader2 className="animate-spin" />
            ) : (
                <>
                    <Wand2 size={20} />
                    <span>Generate New Background</span>
                    <span className="bg-black/20 px-2 py-0.5 rounded text-xs flex items-center gap-1 ml-1 group-hover:bg-black/30 transition-colors">
                        <Coins size={10} className="text-amber-400" /> {COST}
                    </span>
                </>
            )}
          </button>
          
          {error && (
            <p className="text-red-300 text-sm text-center bg-red-500/10 p-3 rounded-xl border border-red-500/20 backdrop-blur-sm animate-shake">{error}</p>
          )}
        </div>

        {/* Output Section */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col h-[600px] lg:h-auto">
          <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <ImageIcon size={18} className="text-indigo-400" /> Result
          </h3>
          
          <div className="flex-1 bg-black/30 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden relative group">
            {processedImage ? (
              <>
                <img src={processedImage} alt="Processed" className="max-w-full max-h-full object-contain shadow-2xl" />
                <a 
                  href={processedImage} 
                  download="edited-image.png"
                  className="absolute bottom-6 right-6 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0"
                >
                  <Download size={24} />
                </a>
              </>
            ) : (
              <div className="text-slate-500 text-center">
                {loading ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse"></div>
                            <Loader2 className="animate-spin text-indigo-400 relative z-10" size={48} />
                        </div>
                        <p className="text-slate-300">AI is reimagining your image...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                       <Sparkles className="text-slate-700 mb-2" size={48} />
                       <p>Processed image will appear here</p>
                    </div>
                )}
              </div>
            )}
          </div>
          
          {processedImage && (
             <div className="mt-4 flex justify-end">
                <button 
                    onClick={() => setProcessedImage(null)}
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
import React from 'react';
import { ArrowRight, Coins, Crown, Sparkles, Zap, Smartphone, Image as ImageIcon, Film } from 'lucide-react';
import { TOOLS, APP_NAME } from '../constants';
import { ToolType } from '../types';

interface DashboardProps {
  onNavigate: (tool: ToolType) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="text-center lg:text-left space-y-4 pt-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {APP_NAME}
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          Empower your content creation workflow with our suite of AI-powered tools. 
          Edit images, grab assets, and generate copy in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.filter(t => t.id !== 'dashboard').map((tool) => {
          const Icon = tool.icon;
          return (
            <div 
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className="group relative overflow-hidden glass-panel rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center mb-5 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-all duration-300">
                  <Icon size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-100 mb-3">{tool.label}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">{tool.description}</p>
                
                <div className="flex items-center text-indigo-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                  Open Tool <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 glass-panel rounded-2xl p-8 bg-slate-900/40">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full block"></span>
          Latest Updates
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* New Tool Update - Shorts */}
           <div 
            className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
            onClick={() => onNavigate('youtube-shorts')}
           >
            <div className="p-2 bg-red-500/10 rounded-lg text-red-400 mt-1 border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
               <Smartphone size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 group-hover:text-white transition-colors">New: Shorts Downloader</h4>
              <p className="text-sm text-slate-400 mt-1">
                Download viral YouTube Shorts in HD. Extract audio or video instantly. <span className="text-red-400 font-bold ml-1 text-xs">TRY NOW &rarr;</span>
              </p>
            </div>
          </div>

          {/* Background Studio Update */}
          <div 
            className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
            onClick={() => onNavigate('background')}
          >
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 mt-1 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
               <ImageIcon size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 group-hover:text-white">Background Studio 2.0</h4>
              <p className="text-sm text-slate-400 mt-1">
                Now powered by Gemini 2.5 Flash. Processing is 2x faster with improved edge detection.
              </p>
            </div>
          </div>

          {/* Instagram Reels Update */}
          <div 
            className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
            onClick={() => onNavigate('instagram-reels')}
          >
            <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400 mt-1 border border-pink-500/20 group-hover:bg-pink-500/20">
               <Film size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 group-hover:text-white">Instagram Tools</h4>
              <p className="text-sm text-slate-400 mt-1">
                Download Reels seamlessly and generate viral captions in one place.
              </p>
            </div>
          </div>

          {/* Boosted Rewards Update */}
          <div 
            className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
            onClick={() => onNavigate('earn')}
          >
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 mt-1 border border-amber-500/20 group-hover:bg-amber-500/20">
               <Coins size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 group-hover:text-white">Daily Rewards</h4>
              <p className="text-sm text-slate-400 mt-1">
                Don't forget to claim your daily login bonus. New streak rewards available! <span className="text-amber-400 font-bold ml-1 text-xs">CLAIM &rarr;</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
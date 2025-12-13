import React from 'react';
import { ArrowRight, Coins, Crown, Sparkles, Zap } from 'lucide-react';
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
          
          {/* Earning System Update */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 mt-1 border border-amber-500/20">
               <Coins size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">New Earning System</h4>
              <p className="text-sm text-slate-400 mt-1">
                Complete daily tasks and invite friends to earn free credits. Check your balance in the <span className="text-amber-400 cursor-pointer hover:underline" onClick={() => onNavigate('earn')}>Earn tab</span>.
              </p>
            </div>
          </div>

          {/* Subscription Update */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 mt-1 border border-indigo-500/20">
               <Crown size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Pocket-Friendly Pro Plans</h4>
              <p className="text-sm text-slate-400 mt-1">
                Unlock unlimited power starting at just <span className="text-white font-bold">₹49/month</span>. Perfect for creators on a budget.
              </p>
            </div>
          </div>

          {/* Visual Update */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 mt-1 border border-purple-500/20">
               <Sparkles size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Visual Overhaul</h4>
              <p className="text-sm text-slate-400 mt-1">Experience our new high-tech sharp grid background for a cleaner, modern look that reduces eye strain.</p>
            </div>
          </div>

           {/* Core Update */}
           <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-400 mt-1 border border-green-500/20">
               <Zap size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200">Faster Generation</h4>
              <p className="text-sm text-slate-400 mt-1">Optimized Gemini 2.5 Flash integration for 2x faster image processing and caption generation.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
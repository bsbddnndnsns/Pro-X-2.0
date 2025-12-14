import React from 'react';
import { User, CreditProps } from '../types';
import { Shield, Coins, Calendar, BarChart, Settings, Mail, Award, Clock, ArrowRight, Zap } from 'lucide-react';

interface ProfileProps {
  user: User;
  credits: number;
}

export const Profile: React.FC<ProfileProps> = ({ user, credits }) => {
  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Upper Side Section - Quick Stats & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 glass-panel p-6 rounded-2xl flex items-center justify-between border border-white/10 bg-gradient-to-r from-indigo-900/40 to-slate-900/40">
             <div>
                <h2 className="text-xl font-bold text-white mb-1">Welcome back, {user.name.split(' ')[0]}!</h2>
                <p className="text-slate-400 text-sm">You have <span className="text-white font-bold">{credits.toLocaleString()}</span> credits available.</p>
             </div>
             <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-indigo-600/20">
                Get More
             </button>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-center">
             <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Zap size={14} className="text-yellow-400" /> Current Plan
             </div>
             <div className="text-2xl font-bold text-white">{user.plan}</div>
          </div>
      </div>

      {/* Main Profile Card */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
                {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-indigo-500/30 shadow-2xl" />
                ) : (
                    <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-4xl font-bold text-white border-4 border-indigo-400/30">
                        {user.name.charAt(0)}
                    </div>
                )}
                <div className="absolute bottom-0 right-0 bg-slate-900 rounded-full p-2 border border-white/10">
                    <Shield className="text-green-400 w-5 h-5" fill="currentColor" fillOpacity={0.2} />
                </div>
            </div>

            <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                    {user.plan !== 'Starter' && (
                        <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                            <Award size={12} /> {user.plan} Member
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 text-slate-400 mb-6 justify-center md:justify-start">
                    <Mail size={16} />
                    <span>{user.email}</span>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-2 flex items-center gap-3">
                        <div className="bg-amber-500/10 p-2 rounded-lg text-amber-400">
                            <Coins size={20} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-bold">Balance</div>
                            <div className="text-xl font-bold text-white">{credits.toLocaleString()}</div>
                        </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-2 flex items-center gap-3">
                        <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 uppercase font-bold">Joined</div>
                            <div className="text-xl font-bold text-white">Oct 2023</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Stats & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart className="text-pink-400" /> Usage Statistics
            </h3>
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Image Generations</span>
                        <span className="text-white font-bold">124 / 500</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                        <div className="bg-pink-500 h-2 rounded-full w-[25%] shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Background Edits</span>
                        <span className="text-white font-bold">45</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                        <div className="bg-indigo-500 h-2 rounded-full w-[45%] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">YouTube Downloads</span>
                        <span className="text-white font-bold">892</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full w-[70%] shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="text-slate-400" /> Account Settings
            </h3>
            
            <div className="space-y-3">
                <button className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors flex justify-between items-center group">
                    <span className="text-slate-300">Manage Subscription</span>
                    <span className="text-xs bg-indigo-500 text-white px-2 py-1 rounded group-hover:bg-indigo-400">Active</span>
                </button>
                <button className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors flex justify-between items-center">
                    <span className="text-slate-300">Notification Preferences</span>
                </button>
                <button className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors flex justify-between items-center text-red-400 hover:text-red-300">
                    <span>Delete Account Data</span>
                </button>
            </div>
        </div>
      </div>

      {/* Recent Activity "Seen" Log */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
         <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="text-teal-400" /> Recent Activity
         </h3>
         <div className="space-y-4">
            {[
                { action: 'Generated YouTube Banner', time: '2 mins ago', cost: '-25', icon: '🎨' },
                { action: 'Downloaded 4K Thumbnail', time: '1 hour ago', cost: '-5', icon: '📺' },
                { action: 'Daily Check-in Bonus', time: '5 hours ago', cost: '+500', icon: '📅' },
                { action: 'Generated AI Image', time: 'Yesterday', cost: '-10', icon: '🖼️' },
            ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                            <div className="font-semibold text-white">{item.action}</div>
                            <div className="text-xs text-slate-500">{item.time}</div>
                        </div>
                    </div>
                    <div className={`font-bold ${item.cost.startsWith('+') ? 'text-green-400' : 'text-slate-400'}`}>
                        {item.cost}
                    </div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Coins, PlayCircle, Calendar, Zap, CheckCircle2, Loader2, Trophy } from 'lucide-react';
import { CreditProps } from '../types';

export const Earn: React.FC<CreditProps> = ({ credits, addCredits }) => {
  const [activeAd, setActiveAd] = useState<number | null>(null);
  // Simulate Mon, Tue claimed. Wed (index 2) is today.
  const [claimedDays, setClaimedDays] = useState([true, true, false, false, false, false, false]); 

  // Simulation of coin usage costs
  const rates = [
    { action: 'Image Generation', cost: 10 },
    { action: 'Pro Background Edit', cost: 15 },
    { action: '4K Video Download', cost: 5 },
  ];

  const handleClaimDay = (index: number) => {
    // Logic: Can only claim 'today' (index 2 in this demo) if not already claimed
    if (index === 2 && !claimedDays[2]) { 
        const newClaimed = [...claimedDays];
        newClaimed[index] = true;
        setClaimedDays(newClaimed);
        addCredits(100);
    }
  };

  const handleWatchAd = (id: number, reward: number) => {
    setActiveAd(id);
    // Simulate ad duration (e.g., 3 seconds)
    setTimeout(() => {
        addCredits(reward);
        setActiveAd(null);
        // In a real app, you would mark this specific ad slot as 'completed' for the day
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
                <p className="text-slate-400 text-sm font-medium mb-1">Available Balance</p>
                <div className="flex items-center gap-3">
                    <Coins className="text-amber-400" size={36} />
                    <span className="text-5xl font-bold text-white tracking-tight">{credits.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs text-amber-400/80 bg-amber-500/10 w-fit px-3 py-1 rounded-full border border-amber-500/20">
                    <Zap size={12} fill="currentColor" />
                    <span>Can generate ~{Math.floor(credits / 10)} AI Images</span>
                </div>
            </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
            <h3 className="text-slate-200 font-semibold mb-3">Usage Rates</h3>
            <div className="space-y-3">
                {rates.map((rate, i) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                        <span className="text-slate-400">{rate.action}</span>
                        <span className="font-mono text-white">{rate.cost} coins</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Daily Check-in */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                <Calendar className="text-indigo-400" size={24} /> Daily Check-in
            </h3>
            <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded">Resets in 14h 20m</span>
        </div>
        
        <div className="grid grid-cols-7 gap-2 md:gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const isToday = i === 2; // Wed
                const isClaimed = claimedDays[i];
                const isFuture = i > 2;
                
                return (
                    <button
                        key={day}
                        disabled={isFuture || isClaimed}
                        onClick={() => handleClaimDay(i)}
                        className={`
                            flex flex-col items-center justify-center p-3 rounded-xl border transition-all relative overflow-hidden
                            ${isClaimed 
                                ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                                : isToday 
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20 scale-105 z-10' 
                                    : 'bg-white/5 border-white/5 text-slate-500 opacity-50'}
                        `}
                    >
                        <span className="text-[10px] uppercase font-bold tracking-wider mb-1">{day}</span>
                        {isClaimed ? (
                            <CheckCircle2 size={20} />
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-sm">+{100 + (i * 10)}</span>
                                <Coins size={12} className="text-amber-400 mt-1" />
                            </div>
                        )}
                        {isToday && !isClaimed && (
                            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-xl pointer-events-none"></div>
                        )}
                    </button>
                );
            })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Watch Ads Section */}
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                <PlayCircle className="text-pink-400" size={24} /> Watch & Earn
            </h3>
            
            {[1, 2].map((adNum) => (
                <div key={adNum} className="glass-panel p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors border border-white/10 group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                            <PlayCircle size={24} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-200">Watch Daily Ad #{adNum}</h4>
                            <span className="text-xs text-slate-400">30 seconds • +50 Coins</span>
                        </div>
                    </div>
                    <button
                        onClick={() => handleWatchAd(adNum, 50)}
                        disabled={activeAd !== null}
                        className={`
                            px-4 py-2 rounded-lg text-sm font-bold transition-all min-w-[100px] flex justify-center
                            ${activeAd === adNum
                                ? 'bg-white/10 text-slate-400 cursor-wait'
                                : 'bg-white/10 hover:bg-white/20 text-white hover:scale-105 border border-white/10'}
                        `}
                    >
                        {activeAd === adNum ? <Loader2 className="animate-spin" size={18} /> : 'Watch'}
                    </button>
                </div>
            ))}
        </div>

        {/* Weekly/Monthly Goals */}
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                <Trophy className="text-yellow-400" size={24} /> Bonus Goals
            </h3>
            
            {/* Weekly */}
            <div className="glass-panel p-4 rounded-xl border border-white/10 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-slate-200">Weekly Streak</h4>
                        <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">+500 Coins</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]" style={{ width: '42%' }}></div>
                    </div>
                    <p className="text-xs text-slate-400">3 / 7 Days Active</p>
                </div>
            </div>

            {/* Monthly */}
            <div className="glass-panel p-4 rounded-xl border border-white/10 relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-slate-200">Monthly Master</h4>
                        <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded border border-purple-400/20">+2000 Coins</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]" style={{ width: '80%' }}></div>
                    </div>
                    <p className="text-xs text-slate-400">24 / 30 Days Active</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
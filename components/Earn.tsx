import React, { useState, useEffect } from 'react';
import { Coins, PlayCircle, Calendar, Zap, CheckCircle2, Loader2, Trophy, ArrowRight, Star } from 'lucide-react';
import { CreditProps } from '../types';

export const Earn: React.FC<CreditProps> = ({ credits, addCredits }) => {
  const [activeAd, setActiveAd] = useState<number | null>(null);
  const [claimedDays, setClaimedDays] = useState([true, true, false, false, false, false, false]); 
  
  // Spin Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinRotation, setSpinRotation] = useState(0);
  const [canSpin, setCanSpin] = useState(true);
  const [spinResult, setSpinResult] = useState<number | null>(null);

  const spinValues = [500, 5, 200, 50, 600, 100]; // Corresponding segments on the wheel
  // Colors for segments: Indigo, Pink, Amber, Purple, Cyan, Emerald
  
  const handleSpin = () => {
    if (!canSpin || isSpinning) return;
    
    setIsSpinning(true);
    setSpinResult(null);

    // Randomize result
    const randomIndex = Math.floor(Math.random() * spinValues.length);
    const resultValue = spinValues[randomIndex];
    
    // Calculate rotation: 
    // 6 segments = 60deg each.
    // Index 0 (Top) needs 0 rotation adjustment conceptually, but let's just spin lots of times + offset
    // To land on index `i`, we rotate to `- i * 60`. 
    // Add extra spins (5 * 360) for effect.
    const segmentAngle = 360 / spinValues.length;
    // Align the pointer (top) to the center of the segment
    const offset = 360 - (randomIndex * segmentAngle); 
    const totalRotation = spinRotation + 1800 + offset; // 5 full spins + offset

    setSpinRotation(totalRotation);

    setTimeout(() => {
        setIsSpinning(false);
        setSpinResult(resultValue);
        addCredits(resultValue);
        setCanSpin(false); // Disable spin after use (simulate daily limit)
    }, 4000); // 4s animation
  };

  const handleClaimDay = (index: number) => {
    if (index === 2 && !claimedDays[2]) { 
        const newClaimed = [...claimedDays];
        newClaimed[index] = true;
        setClaimedDays(newClaimed);
        addCredits(500 + (index * 100));
    }
  };

  const handleWatchAd = (id: number, reward: number) => {
    setActiveAd(id);
    setTimeout(() => {
        addCredits(reward);
        setActiveAd(null);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Hero Section */}
      <div className="relative rounded-3xl overflow-hidden glass-panel p-8 border border-white/10">
         <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -ml-10 -mb-10"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">Earn Free Credits</h1>
                <p className="text-slate-400 max-w-lg text-lg">
                    Complete daily tasks, watch ads, and spin the wheel to earn thousands of coins for your creations.
                </p>
                <div className="mt-6 flex items-center gap-4">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2 flex items-center gap-3">
                         <Coins className="text-amber-400" size={24} />
                         <div>
                             <p className="text-xs text-slate-400 font-bold uppercase">Your Balance</p>
                             <p className="text-2xl font-bold text-white">{credits.toLocaleString()}</p>
                         </div>
                    </div>
                </div>
            </div>
            
            {/* Daily Spin Wheel Widget */}
            <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/10 flex flex-col items-center">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Star className="text-yellow-400" fill="currentColor" /> Daily Spin
                </h3>
                
                <div className="relative w-48 h-48 mb-6">
                     {/* The Wheel */}
                     <div 
                        className="w-full h-full rounded-full border-4 border-slate-800 shadow-xl relative overflow-hidden transition-transform duration-[4000ms] cubic-bezier(0.1, 0.7, 0.1, 1)"
                        style={{ 
                            transform: `rotate(${spinRotation}deg)`,
                            background: `conic-gradient(
                                #6366f1 0deg 60deg, 
                                #ec4899 60deg 120deg, 
                                #f59e0b 120deg 180deg, 
                                #8b5cf6 180deg 240deg, 
                                #06b6d4 240deg 300deg, 
                                #10b981 300deg 360deg
                            )`
                        }}
                     >
                        {/* Lines to separate segments visually */}
                        {[0, 60, 120, 180, 240, 300].map(deg => (
                            <div 
                                key={deg} 
                                className="absolute w-full h-0.5 bg-slate-900/20 top-1/2 left-0 -translate-y-1/2" 
                                style={{ transform: `rotate(${deg}deg)` }} 
                            />
                        ))}
                        
                        {/* Values - Positioned nicely */}
                        {spinValues.map((val, i) => (
                             <div 
                                key={i}
                                className="absolute top-1/2 left-1/2 text-white font-bold text-xs"
                                style={{
                                    transform: `rotate(${i * 60 + 30}deg) translate(0, -60px) rotate(-${i * 60 + 30}deg) translate(-50%, -50%)`,
                                    textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                                }}
                             >
                                {val}
                             </div>
                        ))}
                     </div>
                     
                     {/* Center Cap */}
                     <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg z-10 flex items-center justify-center border-2 border-slate-200">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                     </div>

                     {/* Pointer */}
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                         <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-white drop-shadow-md"></div>
                     </div>
                </div>

                {spinResult !== null ? (
                    <div className="text-center animate-in zoom-in">
                        <p className="text-sm text-slate-400">You won</p>
                        <p className="text-2xl font-bold text-green-400">+{spinResult} Coins!</p>
                        <p className="text-xs text-slate-500 mt-1">Come back tomorrow</p>
                    </div>
                ) : (
                    <button
                        onClick={handleSpin}
                        disabled={!canSpin}
                        className={`
                            px-6 py-2 rounded-full font-bold text-sm transition-all
                            ${canSpin 
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:scale-105 shadow-lg shadow-orange-500/20' 
                                : 'bg-white/10 text-slate-500 cursor-not-allowed'}
                        `}
                    >
                        {canSpin ? 'Spin Now' : 'Spun Today'}
                    </button>
                )}
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
                                <span className="font-bold text-sm">+{500 + (i * 100)}</span>
                                <Coins size={12} className="text-amber-400 mt-1" />
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Watch Ads */}
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
                            <span className="text-xs text-slate-400">30 seconds • +500 Coins</span>
                        </div>
                    </div>
                    <button
                        onClick={() => handleWatchAd(adNum, 500)}
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

        {/* Goals */}
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                <Trophy className="text-yellow-400" size={24} /> Bonus Goals
            </h3>
            
            <div className="glass-panel p-4 rounded-xl border border-white/10">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-slate-200">Weekly Streak</h4>
                    <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">+5000</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
                <p className="text-xs text-slate-400">3 / 7 Days Active</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-white/10">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-slate-200">Monthly Master</h4>
                    <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded border border-purple-400/20">+25000</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-xs text-slate-400">24 / 30 Days Active</p>
            </div>
        </div>
      </div>
    </div>
  );
};
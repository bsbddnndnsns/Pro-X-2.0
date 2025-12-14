import React, { useState } from 'react';
import { Sparkles, Facebook, Mail, ShieldCheck, Loader2, Lock } from 'lucide-react';
import { APP_NAME } from '../constants';
import { AuthProps } from '../types';

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    setLoading(provider);
    // Simulate network delay for realistic online authentication feel
    setTimeout(() => {
      onLogin(provider);
      setLoading(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-slate-900/60 glass-panel rounded-3xl overflow-hidden shadow-2xl animate-fade-in border border-white/10">
        
        {/* Left Side - Visuals */}
        <div className="relative p-10 flex flex-col justify-between overflow-hidden bg-indigo-900/20">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 opacity-50" />
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xl mb-8">
              <Sparkles size={24} />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{APP_NAME}</span>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Login to Access <br />
              <span className="text-indigo-400">Pro X Cloud</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Your centralized hub for AI tools. Sync your credits, history, and downloads across all devices.
            </p>
          </div>
          
          <div className="relative z-10 mt-12 space-y-4">
            <div className="flex items-center gap-3 text-slate-400 text-sm bg-black/20 p-3 rounded-xl backdrop-blur-sm border border-white/5">
                <ShieldCheck className="text-green-400" size={18} />
                <span>Secure Cloud Authentication</span>
            </div>
            <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-500/20 flex items-center justify-center text-[10px] text-white font-bold backdrop-blur-md">
                       AI
                    </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">
                    +1k
                </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-10 flex flex-col justify-center bg-black/40 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
               <Lock className="text-indigo-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Google Account Required</h3>
            <p className="text-slate-400">Sign in with your Google Email to access the app.</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={!!loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 rounded-xl transition-all group relative overflow-hidden shadow-lg hover:shadow-xl"
            >
              {loading === 'google' ? (
                <Loader2 className="animate-spin text-slate-900" />
              ) : (
                <>
                  <Mail className="text-red-600" size={24} />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={!!loading}
              className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl shadow-blue-900/20"
            >
              {loading === 'facebook' ? (
                 <Loader2 className="animate-spin text-white" />
              ) : (
                <>
                   <Facebook size={24} fill="currentColor" />
                   <span>Continue with Facebook</span>
                </>
              )}
            </button>
            
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mt-6">
                <p className="text-yellow-200 text-xs text-center">
                    Note: A valid Google Account is required to sync your Credits and Generation History.
                </p>
            </div>
          </div>
          
          <p className="mt-8 text-center text-xs text-slate-600">
            By connecting, you agree to the Pro X 2.0 <span className="underline cursor-pointer">Terms of Service</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
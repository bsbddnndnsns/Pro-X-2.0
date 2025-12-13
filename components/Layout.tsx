import React, { useState } from 'react';
import { Menu, X, Sparkles, Coins, LogOut, User as UserIcon } from 'lucide-react';
import { TOOLS, APP_NAME } from '../constants';
import { ToolType, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentTool: ToolType;
  onNavigate: (tool: ToolType) => void;
  credits: number;
  user: User;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentTool, onNavigate, credits, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex font-sans selection:bg-indigo-500/30">
      {/* Mobile Header - Glass */}
      <div className="lg:hidden fixed w-full z-50 flex items-center justify-between p-4 glass-panel border-b-0 border-b-white/5 bg-slate-900/80">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-400">
          <Sparkles size={24} />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{APP_NAME}</span>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 text-sm font-bold">
                <Coins size={14} />
                {credits.toLocaleString()}
            </div>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Sidebar - Glass */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-out
        glass-panel border-y-0 border-l-0 border-r border-white/5 bg-slate-900/60
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        flex flex-col h-full
      `}>
        <div className="h-full flex flex-col">
          <div className="hidden lg:flex items-center justify-between p-6 font-bold text-2xl text-indigo-400">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Sparkles size={24} />
                </div>
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-lg">{APP_NAME}</span>
            </div>
          </div>
          
          <div className="px-4 mb-4 hidden lg:block">
            <div 
                onClick={() => onNavigate('earn')}
                className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-amber-400/50 transition-colors group"
            >
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-500 rounded-lg text-black">
                        <Coins size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Credits</span>
                        <span className="text-white font-bold">{credits.toLocaleString()}</span>
                    </div>
                </div>
                <div className="text-amber-400 text-xs font-bold group-hover:underline">GET +</div>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-2 mt-14 lg:mt-0 overflow-y-auto">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isActive = currentTool === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    onNavigate(tool.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                    ${isActive 
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                    }
                  `}
                >
                  <Icon size={20} className={`${isActive ? 'text-indigo-400' : 'group-hover:text-indigo-400 transition-colors'}`} />
                  <span className="font-medium relative z-10">{tool.label}</span>
                  {isActive && <div className="absolute inset-0 bg-indigo-500/10 blur-xl" />}
                </button>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 mb-2">
                {user.avatar ? (
                    <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full border border-white/10" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                    </div>
                )}
                <div className="flex-1 overflow-hidden">
                    <h4 className="text-sm font-semibold text-white truncate">{user.name}</h4>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
            </div>
            
            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
            >
                <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-20 lg:pt-0 min-h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
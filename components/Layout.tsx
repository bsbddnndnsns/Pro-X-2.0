import React, { useState } from 'react';
import { Menu, X, Sparkles, Coins, LogOut, Bell, Search, User as UserIcon, ChevronDown, CheckCheck, Clock } from 'lucide-react';
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
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'New Tool: Shorts Downloader', desc: 'Download YouTube Shorts instantly in HD. Try it now!', time: 'Just now', type: 'new', link: 'youtube-shorts' as ToolType },
    { id: 2, title: 'Daily Reward Available', desc: 'Don\'t forget to claim your daily login bonus of 500 coins.', time: '2 hours ago', type: 'success', link: 'earn' as ToolType },
    { id: 3, title: 'System Update', desc: 'Background removal tool is now 2x faster with Gemini 2.5 Flash.', time: '1 day ago', type: 'info', link: 'background' as ToolType },
    { id: 4, title: 'Welcome to Pro X', desc: 'Thanks for joining! We\'ve added 5,500 credits to your balance.', time: '2 days ago', type: 'success', link: 'dashboard' as ToolType }
  ];

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const onNotificationItemClick = (tool: ToolType) => {
    onNavigate(tool);
    setShowNotifications(false);
  };

  return (
    <div className="min-h-screen flex font-sans selection:bg-indigo-500/30 bg-[#030712] text-slate-50">
      {/* Sidebar - Desktop */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-out
        glass-panel border-y-0 border-l-0 border-r border-white/5 bg-slate-900/60
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        flex flex-col h-full
      `}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-6 font-bold text-2xl text-indigo-400">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Sparkles size={24} />
                </div>
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-lg">{APP_NAME}</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                <X size={24} />
            </button>
          </div>
          
          <div className="px-4 mb-2 lg:hidden">
             {/* Mobile Credit Display in Sidebar */}
             <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-3 flex items-center gap-3">
                <div className="p-1.5 bg-amber-500 rounded-lg text-black">
                    <Coins size={16} />
                </div>
                <span className="text-white font-bold">{credits.toLocaleString()}</span>
             </div>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
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

          <div className="p-4 border-t border-white/5">
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/5">
                <p className="text-xs text-indigo-200 font-medium mb-2">Pro Plan</p>
                <p className="text-xs text-slate-400 mb-3">Get unlimited access to all AI tools.</p>
                <button 
                    onClick={() => onNavigate('subscription')}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors"
                >
                    Upgrade Now
                </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header - "Extra section profile for upper side" */}
        <header className="h-20 border-b border-white/5 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 z-40 sticky top-0">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsSidebarOpen(true)} 
                    className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400"
                >
                    <Menu size={24} />
                </button>
                
                {/* Search Bar (Visual Only) */}
                <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all">
                    <Search size={16} className="text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search tools..." 
                        className="bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-500 w-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
                {/* Credits Widget */}
                <button 
                    onClick={() => onNavigate('earn')}
                    className="hidden sm:flex items-center gap-3 bg-slate-800/50 hover:bg-slate-800 border border-white/10 rounded-full pl-2 pr-4 py-1.5 transition-all group"
                >
                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-slate-900 p-1.5 rounded-full">
                        <Coins size={16} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Credits</span>
                        <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{credits.toLocaleString()}</span>
                    </div>
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button 
                        onClick={handleNotificationClick}
                        className={`relative p-2 rounded-full transition-colors ${showNotifications ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
                    </button>
                    
                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-slate-900 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200">
                                <div className="p-3 border-b border-white/5 bg-white/5 flex justify-between items-center">
                                    <p className="text-sm font-bold text-white pl-1">Notifications</p>
                                    <button className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-500/10">
                                        <CheckCheck size={12} /> Mark all read
                                    </button>
                                </div>
                                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                    {notifications.map(n => (
                                        <div 
                                            key={n.id} 
                                            onClick={() => onNotificationItemClick(n.link)}
                                            className="p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h5 className={`text-sm font-semibold ${n.type === 'new' ? 'text-indigo-400' : 'text-slate-200'} group-hover:text-white transition-colors`}>
                                                    {n.title}
                                                </h5>
                                                <span className="text-[10px] text-slate-500 flex items-center gap-1 whitespace-nowrap ml-2">
                                                    <Clock size={10} /> {n.time}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300">{n.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 border-t border-white/5 bg-white/[0.02]">
                                    <button className="w-full text-center text-xs text-slate-500 hover:text-white py-1 transition-colors">
                                        View All Activity
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button 
                        onClick={handleProfileClick}
                        className={`flex items-center gap-3 rounded-full p-1 pr-3 transition-colors border ${showProfileMenu ? 'bg-white/5 border-white/10' : 'border-transparent hover:bg-white/5 hover:border-white/5'}`}
                    >
                        {user.avatar ? (
                            <img src={user.avatar} alt="User" className="w-9 h-9 rounded-full border border-white/10" />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0)}
                            </div>
                        )}
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-semibold text-white leading-none">{user.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{user.plan || 'Free Plan'}</p>
                        </div>
                        <ChevronDown size={14} className={`text-slate-500 hidden md:block transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {showProfileMenu && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
                            <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200">
                                <div className="p-3 border-b border-white/5 bg-white/5">
                                    <p className="text-sm font-bold text-white">Signed in as</p>
                                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                </div>
                                <div className="p-1">
                                    <button 
                                        onClick={() => { onNavigate('profile'); setShowProfileMenu(false); }}
                                        className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white rounded-lg flex items-center gap-2"
                                    >
                                        <UserIcon size={16} /> My Profile
                                    </button>
                                    <button 
                                        onClick={() => { onNavigate('earn'); setShowProfileMenu(false); }}
                                        className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white rounded-lg flex items-center gap-2"
                                    >
                                        <Coins size={16} /> Earn Coins
                                    </button>
                                </div>
                                <div className="p-1 border-t border-white/5">
                                    <button 
                                        onClick={onLogout}
                                        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2"
                                    >
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {children}
            </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
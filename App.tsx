import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { YouTubeTools } from './components/YouTubeTools';
import { BackgroundEditor } from './components/BackgroundEditor';
import { SocialGenerator } from './components/SocialGenerator';
import { ImageGenerator } from './components/ImageGenerator';
import { InstagramDownloader } from './components/InstagramDownloader';
import { YouTubeShortsDownloader } from './components/YouTubeShortsDownloader';
import { Subscription } from './components/Subscription';
import { Earn } from './components/Earn';
import { Dashboard } from './components/Dashboard';
import { Auth } from './components/Auth';
import { BrandingStudio } from './components/BrandingStudio';
import { Profile } from './components/Profile';
import { ToolType, User } from './types';

const App: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolType>('dashboard');
  const [credits, setCredits] = useState<number>(5500);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for persisted user session
    const storedUser = localStorage.getItem('pro_x_user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const addCredits = (amount: number) => {
    setCredits(prev => prev + amount);
  };

  const deductCredits = (amount: number): boolean => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      return true;
    }
    return false;
  };

  const handleLogin = (provider: 'google' | 'facebook') => {
    let newUser: User;
    
    if (provider === 'google') {
        newUser = {
            id: 'g_12345',
            name: 'Alex Creator',
            email: 'alex.creator@gmail.com',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
            provider: 'google',
            plan: 'Starter'
        };
    } else {
        // Facebook
        newUser = {
            id: 'fb_67890',
            name: 'Alex Studio',
            email: 'alex@facebook.com',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
            provider: 'facebook',
            plan: 'Starter'
        };
    }

    setUser(newUser);
    localStorage.setItem('pro_x_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pro_x_user');
    setCurrentTool('dashboard');
  };

  const handleUpgrade = (planName: string) => {
    if (user) {
        const updatedUser = { ...user, plan: planName };
        setUser(updatedUser);
        localStorage.setItem('pro_x_user', JSON.stringify(updatedUser));
        
        // Add instant bonus credits based on plan
        const bonus = planName === 'Agency' ? 50000 : 10000;
        addCredits(bonus);
    }
  };

  const renderTool = () => {
    const creditProps = { credits, addCredits, deductCredits };

    switch (currentTool) {
      case 'youtube':
        return <YouTubeTools {...creditProps} />;
      case 'youtube-shorts':
        return <YouTubeShortsDownloader {...creditProps} />;
      case 'background':
        return <BackgroundEditor {...creditProps} />;
      case 'instagram':
        return <SocialGenerator {...creditProps} />;
      case 'image-gen':
        return <ImageGenerator {...creditProps} />;
      case 'instagram-reels':
        return <InstagramDownloader {...creditProps} />;
      case 'branding':
        return <BrandingStudio {...creditProps} />;
      case 'subscription':
        return <Subscription onUpgrade={handleUpgrade} />;
      case 'earn':
        return <Earn {...creditProps} />;
      case 'profile':
        return user ? <Profile user={user} credits={credits} /> : null;
      case 'dashboard':
      default:
        return <Dashboard onNavigate={setCurrentTool} />;
    }
  };

  if (loading) return null; // Or a loading spinner

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Layout 
        currentTool={currentTool} 
        onNavigate={setCurrentTool} 
        credits={credits}
        user={user}
        onLogout={handleLogout}
    >
      {renderTool()}
    </Layout>
  );
};

export default App;
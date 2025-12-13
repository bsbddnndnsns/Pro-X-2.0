import React from 'react';

export type ToolType = 'dashboard' | 'youtube' | 'background' | 'instagram' | 'image-gen' | 'instagram-reels' | 'subscription' | 'earn';

export interface NavItem {
  id: ToolType;
  label: string;
  icon: React.ComponentType<any>;
  description?: string;
}

export interface YouTubeThumbnailData {
  url: string;
  resolution: string;
  width: number;
  height: number;
}

export interface GeneratedContent {
  text?: string;
  image?: string;
  error?: string;
}

export interface CreditProps {
  credits: number;
  addCredits: (amount: number) => void;
  deductCredits: (amount: number) => boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'facebook' | 'email';
}

export interface AuthProps {
  onLogin: (provider: 'google' | 'facebook') => void;
}
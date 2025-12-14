import { LayoutDashboard, Image, Youtube, Instagram, Palette, Film, Crown, Coins, PenTool, Smartphone } from 'lucide-react';
import { NavItem } from './types';

export const APP_NAME = "Pro X 2.0";

export const TOOLS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview of all available tools'
  },
  {
    id: 'subscription',
    label: 'Pro Plans',
    icon: Crown,
    description: 'Upgrade for unlimited access and faster speeds'
  },
  {
    id: 'earn',
    label: 'Earn Credits',
    icon: Coins,
    description: 'Complete tasks and refer friends to earn free credits'
  },
  {
    id: 'branding',
    label: 'Branding Studio',
    icon: PenTool,
    description: 'Create YouTube Banners and Professional Logos'
  },
  {
    id: 'image-gen',
    label: 'AI Image Generator',
    icon: Palette,
    description: 'Turn text into stunning visuals using AI'
  },
  {
    id: 'background',
    label: 'AI Background Studio',
    icon: Image,
    description: 'Remove or replace image backgrounds using Gemini Vision'
  },
  {
    id: 'instagram-reels',
    label: 'Reels Downloader',
    icon: Film,
    description: 'Download Instagram Reels and Videos'
  },
  {
    id: 'youtube-shorts',
    label: 'Shorts Downloader',
    icon: Smartphone,
    description: 'Download viral YouTube Shorts videos'
  },
  {
    id: 'youtube',
    label: 'Thumbnail Downloader',
    icon: Youtube,
    description: 'Download Ultra HD thumbnails from any YouTube video'
  },
  {
    id: 'instagram',
    label: 'Social Caption AI',
    icon: Instagram,
    description: 'Generate viral captions and hashtags for your posts'
  }
];

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash';
export const GEMINI_MODEL_IMAGE = 'gemini-2.5-flash-image';
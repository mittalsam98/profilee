import { SocialMediaData } from '@/types/types';
import { Facebook, Github, Instagram, Linkedin, Twitch, Twitter, Youtube } from 'lucide-react';
import {
  BsDiscord,
  BsMedium,
  BsPinterest,
  BsSnapchat,
  BsTelegram,
  BsVimeo,
  BsWhatsapp
} from 'react-icons/bs';

export const socialMediaDataByName: Record<string, SocialMediaData> = {
  Twitter: {
    name: 'Twitter',
    color: '#1DA1F2',
    icon: <Twitter size={24} className='text-[#1DA1F2]' />
  },
  Facebook: {
    name: 'Facebook',
    color: '#1877F2',
    icon: <Facebook size={24} className='text-[#1877F2]' />
  },
  Instagram: {
    name: 'Instagram',
    color: '#C13584',
    icon: <Instagram size={24} className='text-[#C13584]' />
  },
  LinkedIn: {
    name: 'LinkedIn',
    color: '#0A66C2',
    icon: <Linkedin size={24} className='text-[#0A66C2]' />
  },
  YouTube: {
    name: 'YouTube',
    color: '#FF0000',
    icon: <Youtube size={24} className='text-[#FF0000]' />
  },
  Pinterest: {
    name: 'Pinterest',
    color: '#BD081C',
    icon: <BsPinterest size={24} className='text-[#BD081C]' />
  },
  Snapchat: {
    name: 'Snapchat',
    color: '#FFFC00',
    icon: <BsSnapchat size={24} className='text-[#FFFC00]' />
  },
  WhatsApp: {
    name: 'WhatsApp',
    color: '#25D366',
    icon: <BsWhatsapp size={24} className='text-[#25D366]' />
  },
  Discord: {
    name: 'Discord',
    color: '#5865F2',
    icon: <BsDiscord size={24} className='text-[#5865F2]' />
  },
  Twitch: {
    name: 'Twitch',
    color: '#6441A5',
    icon: <Twitch size={24} className='text-[#6441A5]' />
  },
  Telegram: {
    name: 'Telegram',
    color: '#0088CC',
    icon: <BsTelegram size={24} className='text-[#0088CC]' />
  },
  Medium: {
    name: 'Medium',
    color: '#00AB6C',
    icon: <BsMedium size={24} className='text-[#00AB6C]' />
  },
  GitHub: {
    name: 'GitHub',
    color: '#181717',
    icon: <Github size={24} className='text-[#181717]' />
  },
  Vimeo: {
    name: 'Vimeo',
    color: '#1AB7EA',
    icon: <BsVimeo size={24} className='text-[#1AB7EA]' />
  }
};

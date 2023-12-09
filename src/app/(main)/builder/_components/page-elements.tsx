import { SocialMediaData } from '@/types/types';
import { YoutubeLinkElement } from './elements/youtube';
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

export type ElementsType = 'Youtube';

export const socialMediaData: SocialMediaData[] = [
  {
    name: 'Twitter',
    color: '#1DA1F2',
    icon: <Twitter size={24} className='text-[#1DA1F2]' />
  },
  {
    name: 'Facebook',
    color: '#1877F2',
    icon: <Facebook size={24} className='text-[#1877F2]' />
  },
  {
    name: 'Instagram',
    color: '#C13584',
    icon: <Instagram size={24} className='text-[#C13584]' />
  },
  {
    name: 'LinkedIn',
    color: '#0A66C2',
    icon: <Linkedin size={24} className='text-[#0A66C2]' />
  },
  {
    name: 'YouTube',
    color: '#FF0000',
    icon: <Youtube size={24} className='text-[#FF0000]' />
  },
  {
    name: 'Pinterest',
    color: '#BD081C',
    icon: <BsPinterest size={24} className='text-[#BD081C]' />
  },
  {
    name: 'Snapchat',
    color: '#FFFC00',
    icon: <BsSnapchat size={24} className='text-[#FFFC00]' />
  },
  {
    name: 'WhatsApp',
    color: '#25D366',
    icon: <BsWhatsapp size={24} className='text-[#25D366]' />
  },
  {
    name: 'Discord',
    color: '#5865F2',
    icon: <BsDiscord size={24} className='text-[#5865F2]' />
  },
  {
    name: 'Twitch',
    color: '#6441A5',
    icon: <Twitch size={24} className='text-[#6441A5]' />
  },
  {
    name: 'Telegram',
    color: '#0088CC',
    icon: <BsTelegram size={24} className='text-[#0088CC]' />
  },
  {
    name: 'Medium',
    color: '#00AB6C',
    icon: <BsMedium size={24} className='text-[#00AB6C]' />
  },
  {
    name: 'GitHub',
    color: '#181717',
    icon: <Github size={24} className='text-[#181717]' />
  },
  {
    name: 'Vimeo',
    color: '#1AB7EA',
    icon: <BsVimeo size={24} className='text-[#1AB7EA]' />
  }
];

// Example usage

export type PageElement = {
  type: ElementsType;

  construct: (id: string) => PageElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC;
  formComponent: React.FC;

  propertiesComponent: React.FC;
};

export type PageElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};
export const PageElements = {
  Youtube: YoutubeLinkElement
};

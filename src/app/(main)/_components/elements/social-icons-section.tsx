import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import React from 'react';
import { BiLogoSnapchat } from 'react-icons/bi';
import { AiOutlineYoutube } from 'react-icons/ai';
import { FaFacebook, FaXTwitter } from 'react-icons/fa6';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsGithub, BsInstagram, BsLinkedin, BsTelegram, BsWhatsapp } from 'react-icons/bs';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import SocialIconsPopover from '../popovers/social-icons-popover';

export default function SocialIconsSection() {
  return (
    <Card>
      <CardTitle className='flex'>
        Social Icons
        <SocialIconsPopover />
      </CardTitle>
    </Card>
  );
}

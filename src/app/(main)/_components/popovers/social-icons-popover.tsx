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

export default function SocialIconsPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <AiFillPlusCircle className='text-2xl text-black hover:scale-125' />
      </PopoverTrigger>

      <PopoverContent className='' align='start'>
        <div className='flex gap-4 flex-wrap '>
          <AiOutlineYoutube className='text-2xl hover:scale-125' />
          <BsInstagram className='text-2xl hover:scale-125' />
          <FaXTwitter className='text-2xl hover:scale-125' />
          <BsLinkedin className='text-2xl hover:scale-125' />
          <BiLogoSnapchat className='text-2xl hover:scale-125' />
          <BsGithub className='text-2xl hover:scale-125' />
          <BsTelegram className='text-2xl hover:scale-125' />
          <BsWhatsapp className='text-2xl hover:scale-125' />
          <FaFacebook className='text-2xl hover:scale-125' />
        </div>
      </PopoverContent>
    </Popover>
  );
}

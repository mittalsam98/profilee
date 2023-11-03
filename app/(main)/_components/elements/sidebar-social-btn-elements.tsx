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
import { BsGithub, BsInstagram, BsLinkedin, BsTelegram, BsWhatsapp } from 'react-icons/bs';

export default function SidebarSocialBtnElements() {
  return (
    <div className='my-2'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>Social Icons</CardTitle>
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
        </CardHeader>
      </Card>
    </div>
  );
}

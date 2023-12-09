import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import React from 'react';
import { BiLogoSnapchat } from 'react-icons/bi';
import { AiOutlineYoutube } from 'react-icons/ai';
import { FaFacebook, FaXTwitter } from 'react-icons/fa6';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsGithub, BsInstagram, BsLinkedin, BsTelegram, BsWhatsapp } from 'react-icons/bs';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import SocialLinkDialog from '../dialogs/social-icons-dialog';
import { Github, Instagram, Linkedin, Twitch, Twitter, Youtube } from 'lucide-react';
import { socialMediaData } from '../page-elements';
import SocialIcon from '@/app/(main)/builder/_components/elements/social-icon';

export default function SocialIconsPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <AiFillPlusCircle className='text-2xl text- ml-2' />
      </PopoverTrigger>
      <PopoverContent className='' align='start'>
        <div className='flex gap-4 flex-wrap '>
          <>
            {socialMediaData.map((data, index) => {
              return <SocialIcon data={data} key={data.name} />;
            })}
          </>
        </div>
      </PopoverContent>
    </Popover>
  );
}

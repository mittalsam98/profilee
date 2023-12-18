import useDesigner from '@/hooks/use-designer';
import { preview } from '@/types/types';
import Image from 'next/image';
import React, { useState } from 'react';
import SocialIcon from '../elements/social-icon';
import { socialMediaDataByName } from '../page-elements';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function Webpage() {
  const { profileImg, title, bio, socialLinks, adhocLinks } = useDesigner();
  console.log(profileImg);

  return (
    <div className='flex flex-col items-center'>
      {profileImg && (
        <Image
          key={profileImg}
          src={profileImg}
          alt='Profile pic'
          width={150}
          height={150}
          className='flex h-[120px] w-[120px]  rounded-full border border-border hover:cursor-pointer bg-background/50 '
        />
      )}
      <div className='font-medium text-xl py-2'>{title}</div>
      <div className='font-normal text-sm'>{bio}</div>
      {Object.entries(socialLinks).length > 0 && (
        <div className='flex gap-3 flex-wrap justify-center py-3'>
          {Object.entries(socialLinks).map(([platform, value]) => (
            <Link href={value} key={platform} target='_blank'>
              {socialMediaDataByName[platform]?.icon}
            </Link>
          ))}
        </div>
      )}
      {adhocLinks.map((link) => {
        return link.isActive ? (
          <Link className='w-full py-2' key={link.id} href={link.link} target='_blank'>
            <Card className='w-full py-3'>{link.name}</Card>
          </Link>
        ) : null;
      })}
    </div>
  );
}

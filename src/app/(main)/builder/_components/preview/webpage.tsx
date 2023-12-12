import useDesigner from '@/hooks/use-designer';
import { preview } from '@/types/types';
import Image from 'next/image';
import React, { useState } from 'react';
import SocialIcon from '../elements/social-icon';
import { socialMediaDataByName } from '../page-elements';
import Link from 'next/link';

export default function Webpage() {
  const { profileImg, title, bio, links } = useDesigner();
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
      <div className='font-normal'>{bio}</div>
      {Object.entries(links).length > 0 && (
        <div className='flex gap-3 flex-wrap justify-center mt-3'>
          {Object.entries(links).map(([platform, value]) => (
            <Link href={value} target='_blank'>
              {socialMediaDataByName[platform]?.icon}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

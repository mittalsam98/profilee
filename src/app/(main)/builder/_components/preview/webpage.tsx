import useDesigner from '@/hooks/use-designer';
import { preview } from '@/types/types';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Webpage() {
  const { profileImg, title, bio } = useDesigner();
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
    </div>
  );
}

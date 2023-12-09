import Image from 'next/image';
import React from 'react';
import { SocialMediaData } from '@/types/types';
import SocialLinkDialog from '../dialogs/social-icons-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type SocialMediaProps = {
  data: SocialMediaData;
};

const SocialIcon = (props: SocialMediaProps) => {
  const { name, color, icon } = props.data;
  //   || {
  //     color: '#000',
  //     icon: (
  //       <Image
  //         src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`}
  //         alt={'dd'}
  //         width={24}
  //         height={24}
  //         className='rounded-md'
  //       />
  //     )
  //   };

  return (
    <SocialLinkDialog name={name}>
      <Tooltip>
        <TooltipTrigger>
          <div className='hover:cursor-pointer'>{icon}</div>
        </TooltipTrigger>
        <TooltipContent>{name}</TooltipContent>
      </Tooltip>
    </SocialLinkDialog>
  );
};
export default SocialIcon;

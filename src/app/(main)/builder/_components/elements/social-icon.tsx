import React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';

import SocialLinkDialog from '../dialogs/social-icons-dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { socialMediaDataByName } from '../page-elements';
import { MinusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import useDesigner from '@/hooks/use-designer';
import { useSortable } from '@dnd-kit/sortable';
const SocialIcon = ({
  data,
  value,
  triggerPopover
}: {
  data: string;
  value?: string;
  triggerPopover?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <SocialLinkDialog name={data} value={value} triggerPopover={triggerPopover}>
      <Tooltip>
        <TooltipTrigger>
          <div className='relative hover:cursor-pointer p-1'>
            {socialMediaDataByName[data]?.icon}
          </div>
        </TooltipTrigger>
        <TooltipContent>{socialMediaDataByName[data]?.name}</TooltipContent>
      </Tooltip>
    </SocialLinkDialog>
  );
};
export default SocialIcon;

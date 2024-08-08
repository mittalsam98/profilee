import React, { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { socialMediaDataByName } from '../page-elements';
import SocialIcon from '@/app/(main)/builder/_components/links/social-icon';
import useDesigner from '@/hooks/use-designer';

export default function SocialIconsPopover() {
  const { state } = useDesigner();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <MdAddCircle className='text-slate-400 text-2xl' />
      </PopoverTrigger>
      <PopoverContent className='' align='start'>
        <div className='flex gap-4 flex-wrap '>
          {Object.keys(socialMediaDataByName)
            .filter((data) => !state.socialLinks[data])
            .map((data) => {
              return <SocialIcon data={data} key={data} triggerPopover={setOpen} />;
            })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

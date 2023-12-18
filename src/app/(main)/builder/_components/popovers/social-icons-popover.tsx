import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { socialMediaDataByName } from '../page-elements';
import SocialIcon from '@/app/(main)/builder/_components/elements/social-icon';
import useDesigner from '@/hooks/use-designer';

export default function SocialIconsPopover() {
  const { socialLinks } = useDesigner();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <AiFillPlusCircle className='ml-2' />
      </PopoverTrigger>
      <PopoverContent className='' align='start'>
        <div className='flex gap-4 flex-wrap '>
          {Object.keys(socialMediaDataByName)
            .filter((data) => !socialLinks[data])
            .map((data) => {
              return (
                <span>
                  <SocialIcon data={data} key={data} triggerPopover={setOpen} />
                </span>
              );
            })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

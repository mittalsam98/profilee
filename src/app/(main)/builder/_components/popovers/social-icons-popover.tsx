import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { socialMediaDataByName } from '../page-elements';
import SocialIcon from '@/app/(main)/builder/_components/elements/social-icon';
import useDesigner from '@/hooks/use-designer';

export default function SocialIconsPopover() {
  const { links } = useDesigner();
  return (
    <Popover>
      <PopoverTrigger>
        <AiFillPlusCircle className='ml-2' />
      </PopoverTrigger>
      <PopoverContent className='' align='start'>
        <div className='flex gap-4 flex-wrap '>
          {Object.keys(socialMediaDataByName)
            .filter((data) => !links[data])
            .map((data) => {
              return <SocialIcon data={data} key={data} />;
            })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

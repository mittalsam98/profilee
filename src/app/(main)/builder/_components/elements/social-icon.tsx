import React from 'react';
import SocialLinkDialog from '../dialogs/social-icons-dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { socialMediaDataByName } from '../page-elements';
import { MinusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import useDesigner from '@/hooks/use-designer';
const SocialIcon = ({ data, value }: { data: string; value?: string }) => {
  const { setLinks } = useDesigner();

  return (
    <SocialLinkDialog name={data} value={value}>
      <Tooltip>
        <TooltipTrigger>
          <div className='relative hover:cursor-pointer p-1'>
            {socialMediaDataByName[data]?.icon}
            {value && (
              <div className={cn('absolute right-0 top-0 bg-white rounded-full ')}>
                <MinusCircle
                  onClick={() => {
                    setLinks((prevLinks) => {
                      const linksCopy = { ...prevLinks };
                      delete linksCopy[data];
                      return linksCopy;
                    });
                  }}
                  size={12}
                  className='text-[#D11A2A]'
                />
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>{socialMediaDataByName[data]?.name}</TooltipContent>
      </Tooltip>
    </SocialLinkDialog>
  );
};
export default SocialIcon;

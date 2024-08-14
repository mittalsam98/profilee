import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Dispatch, SetStateAction } from 'react';
import SocialLinkDialog from '../../dialogs/social-icons-dialog';
import { socialMediaDataByName } from '../../page-elements';

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

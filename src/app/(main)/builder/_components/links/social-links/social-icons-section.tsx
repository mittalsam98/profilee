import { Card } from '@/components/ui/card';
import useDesigner from '@/hooks/use-designer';
import { SortableContext } from '@dnd-kit/sortable';
import { IoShareSocialSharp } from 'react-icons/io5';
import SocialIconsPopover from '../../popovers/social-icons-popover';
import SocialIconDrag from './social-icon-drag';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function SocialIconsSection() {
  const { state } = useDesigner();

  return (
    <TooltipProvider>
      <Card className='p-4'>
        <div className='flex w-full items-center justify-between '>
          <p className='text-sm font-semibold flex items-center '>
            <IoShareSocialSharp className='text-slate-400 text-2xl mr-2' />
            Social Icons
          </p>
          <SocialIconsPopover />
        </div>
        {Object.entries(state.socialLinks).length > 0 && (
          <div className='flex gap-4 flex-wrap mt-3 ml-2'>
            <SortableContext id='social-icon' items={Object.keys(state.socialLinks)}>
              {Object.entries(state.socialLinks).map(([platform, value]) => (
                <SocialIconDrag data={platform} key={platform} value={value} />
              ))}
            </SortableContext>
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
}

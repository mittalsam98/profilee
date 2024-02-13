import { Card, CardTitle } from '@/components/ui/card';
import useDesigner from '@/hooks/use-designer';
import { SortableContext } from '@dnd-kit/sortable';
import SocialIconsPopover from '../popovers/social-icons-popover';
import SocialIconDrag from './social-icon-drag';
import { IoShareSocialSharp } from 'react-icons/io5';

export default function SocialIconsSection() {
  const { socialLinks } = useDesigner();

  return (
    <Card className='p-4'>
      <div className='flex w-full items-center justify-between '>
        <p className='text-sm font-semibold flex items-center '>
          <IoShareSocialSharp className='text-slate-400 text-2xl mr-2' />
          Social Icons
        </p>
        <SocialIconsPopover />
      </div>
      {Object.entries(socialLinks).length > 0 && (
        <div className='flex gap-4 flex-wrap mt-3 ml-2'>
          <SortableContext id='social-icon' items={Object.keys(socialLinks)}>
            {Object.entries(socialLinks).map(([platform, value]) => (
              <SocialIconDrag data={platform} key={platform} value={value} />
            ))}
          </SortableContext>
        </div>
      )}
    </Card>
  );
}

import { Card, CardTitle } from '@/components/ui/card';
import React from 'react';
import SocialIconsPopover from '../popovers/social-icons-popover';
import useDesigner from '@/hooks/use-designer';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import SocialIconDrag from './social-icon-drag';

export default function SocialIconsSection() {
  const { socialLinks } = useDesigner();

  return (
    <Card className='p-4'>
      <CardTitle className='flex text-xl'>
        Social Icons
        <SocialIconsPopover />
      </CardTitle>
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

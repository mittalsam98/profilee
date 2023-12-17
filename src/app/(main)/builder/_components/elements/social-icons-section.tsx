import { Card, CardTitle } from '@/components/ui/card';
import React from 'react';
import SocialIconsPopover from '../popovers/social-icons-popover';
import useDesigner from '@/hooks/use-designer';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import SocialIconDrag from './social-icon-drag';
import { useDndMonitor } from '@dnd-kit/core';

export default function SocialIconsSection() {
  const { socialLinks, setSocialLinks } = useDesigner();
  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;

      setSocialLinks((items) => {
        const oldIndex = Object.keys(items).indexOf(active.id.toString());
        const newIndex = Object.keys(items).indexOf(over.id.toString());

        return Object.fromEntries(arrayMove(Object.entries(socialLinks), oldIndex, newIndex));
      });
    }
  });
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

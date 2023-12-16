import { Card, CardTitle } from '@/components/ui/card';
import React from 'react';
import useDesigner from '@/hooks/use-designer';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import SocialIconDrag from './social-icon-drag';
import { useDndMonitor } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';

export default function AdhocLinks() {
  const { links, setLinks } = useDesigner();
  useDndMonitor({
    onDragEnd: (event) => {}
  });
  return (
    <div className='pt-4'>
      <span className='text-xs font-semibold bg-black text-white px-4 p-2 rounded-full'>
        Add New Links
      </span>
      <div className='flex items-center gap-1 mt-4'>
        <GripVertical size={20} />
        <Card className=' w-full py-2 px-5'>
          <div className='text-sm font-medium leading-6'>Hello Usefuile Link</div>
          <div className='text-xs leading-5'>Hello Usefuile Link</div>
        </Card>
      </div>
    </div>
  );
}

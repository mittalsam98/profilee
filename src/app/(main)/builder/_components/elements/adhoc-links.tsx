import { Card, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import useDesigner from '@/hooks/use-designer';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SocialIconDrag from './social-icon-drag';
import { GripVertical, MoreHorizontal } from 'lucide-react';
import AdhocLinkDrag from './adhoc-links-drag';
import { Dialog } from '@/components/ui/dialog';
import AdhocLinksDialog from '../dialogs/adhoc-links-dialog';

export default function AdhocLinks() {
  const { adhocLinks } = useDesigner();
  const [open, setOpen] = useState(false);

  return (
    <div className='pt-4'>
      <span
        onClick={() => {
          setOpen(true);
        }}
        className='text-xs font-semibold bg-black text-white px-4 p-2 rounded-full hover:cursor-pointer'
      >
        Add New Links
      </span>
      <div className='flex justify-between text-xs text-slate-600 pl-8 mt-5	items-center'>
        <div className='flex'>
          Drag
          <span>
            <GripVertical size={16} />
          </span>
          to sort
        </div>
        <div className='flex'>
          Tap
          <span className='px-1'>
            <MoreHorizontal size={16} />
          </span>
          to edit
        </div>
      </div>
      <SortableContext strategy={verticalListSortingStrategy} id='adhoc-links' items={adhocLinks}>
        {adhocLinks.map((link, value) => (
          <AdhocLinkDrag data={link} key={link.id} />
        ))}
      </SortableContext>
      <AdhocLinksDialog open={open} setOpen={setOpen} />
    </div>
  );
}

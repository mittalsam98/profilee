import { Card, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import useDesigner from '@/hooks/use-designer';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { useDndMonitor } from '@dnd-kit/core';
import { Edit2, EyeIcon, EyeOffIcon, GripVertical, MoreHorizontal, Trash2Icon } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';
import { AdhocLinks } from '@/types/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AdhocLinksDialog from '../dialogs/adhoc-links-dialog';

export default function AdhocLinkDrag({ data }: { data: AdhocLinks }) {
  const { setAdhocLinks } = useDesigner();
  const [open, setOpen] = useState(false);

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({
      id: data.id
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleDelete = () => {
    setAdhocLinks((prevState) => {
      const prevStateCopy = [...prevState];
      const deleteIndex = prevState.findIndex((val) => val.id == data.id);
      prevStateCopy.splice(deleteIndex, 1);
      return prevStateCopy;
    });
  };
  const handleShowHide = () => {
    setAdhocLinks((prevState) => {
      const prevStateCopy = [...prevState];
      const editIndex = prevState.findIndex((val) => val.id === data.id);

      if (editIndex !== -1 && prevStateCopy[editIndex]) {
        const editedItem = prevStateCopy[editIndex];
        if (
          editedItem &&
          editedItem.name !== undefined &&
          editedItem.link !== undefined &&
          editedItem.id !== undefined
        ) {
          prevStateCopy[editIndex] = {
            ...editedItem,
            isActive: !editedItem.isActive
          };
        }
      }

      return prevStateCopy;
    });
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className='relative flex items-center gap-1 mt-2'
    >
      <span {...listeners} ref={setActivatorNodeRef}>
        <GripVertical size={20} />
      </span>
      <Card className={cn('w-full py-2 px-5', !data.isActive ? 'opacity-40' : '')}>
        <div className='flex flex-row justify-between	items-center'>
          <div>
            <div className='text-sm font-medium leading-6'>{data.name}</div>
            <div className='text-xs leading-5'>{data.link}</div>
          </div>
          <div className='flex flex-row gap-2'>
            <div onClick={handleShowHide}>
              {data.isActive ? <EyeIcon className='h-6 w-6' /> : <EyeOffIcon className='h-6 w-6' />}
            </div>
            <Trash2Icon onClick={handleDelete} className='h-6 w-6' />
            <MoreHorizontal
              onClick={(e) => {
                setOpen(true);
              }}
              className='h-6 w-6'
            />
          </div>
        </div>
      </Card>
      <AdhocLinksDialog open={open} setOpen={setOpen} data={data} />
    </div>
  );
}

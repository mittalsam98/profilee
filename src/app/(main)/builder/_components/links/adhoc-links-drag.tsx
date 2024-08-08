import { Card } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import useDesigner from '@/hooks/use-designer';
import { cn } from '@/lib/utils';
import { AdhocLinks } from '@/types/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  EyeIcon,
  EyeOffIcon,
  GripVertical,
  MoreHorizontal,
  Paintbrush,
  Trash2Icon
} from 'lucide-react';
import { useState } from 'react';
import { MdDashboardCustomize } from 'react-icons/md';
import AdhocLinksDialog from '../dialogs/adhoc-links-dialog';
import ToolTipForTextAndIcon from '@/components/tooltip-icon-text';
import EditAppearance from './toggle-group-items/edit-appearance';
import EditLink from './toggle-group-items/edit-link';

export default function AdhocLinkDrag({
  data,
  outOfOverlay
}: {
  data: AdhocLinks;
  outOfOverlay?: boolean;
}) {
  const [editItem, setEditItem] = useState('');
  const { dispatch, state } = useDesigner();
  const [open, setOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    over
  } = useSortable({
    id: data.id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleDelete = () => {
    const prevStateCopy = [...state.adhocLinks];
    const deleteIndex = state.adhocLinks.findIndex((val) => val.id == data.id);
    prevStateCopy.splice(deleteIndex, 1);
    dispatch({
      type: 'UPDATE_ADHOC_LINK',
      payload: prevStateCopy
    });
  };

  const handleShowHide = () => {
    const prevStateCopy = [...state.adhocLinks];
    const editIndex = state.adhocLinks.findIndex((val) => val.id === data.id);

    if (editIndex !== -1 && prevStateCopy[editIndex]) {
      const editedItem = prevStateCopy[editIndex];
      if (
        editedItem?.name !== undefined &&
        editedItem?.link !== undefined &&
        editedItem?.id !== undefined
      ) {
        prevStateCopy[editIndex] = {
          ...editedItem,
          isActive: !editedItem.isActive
        };
      }
    }
    dispatch({
      type: 'UPDATE_ADHOC_LINK',
      payload: prevStateCopy
    });
  };

  const onValueChangeToggleGrp = (e: string) => {
    console.log(e);
    setEditItem(e);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={cn(
        'relative flex items-center gap-1 mt-2',
        isDragging && over ? 'opacity-20' : ''
      )}
    >
      <span
        {...listeners}
        ref={setActivatorNodeRef}
        className={cn('hover:cursor-all-scroll', outOfOverlay ? 'hover:cursor-not-allowed' : '')}
      >
        <GripVertical size={20} />
      </span>
      <Card
        className={cn(
          'w-full py-2 px-5',
          !data.isActive ? 'opacity-40' : '',
          outOfOverlay ? 'bg-red-300 opacity-100' : '',
          isDragging ? 'border border-gray-500 shadow-lg' : ''
        )}
      >
        <div className='flex flex-row justify-between	items-center'>
          <div>
            <div className='text-sm font-medium leading-6'>Title: {data.name}</div>
            <div className='text-xs leading-5'>Url: {data.link}</div>
          </div>
          <div className='flex flex-row gap-2'>
            {/* <div onClick={handleShowHide}>
              {data.isActive ? <EyeIcon className='h-6 w-6' /> : <EyeOffIcon className='h-6 w-6' />}
            </div> */}
            {/* <Trash2Icon onClick={handleDelete} className='h-6 w-6' /> */}
            <MoreHorizontal
              onClick={() => {
                setOpen(true);
              }}
              className='h-6 w-6'
            />
          </div>
        </div>
        <ToggleGroup
          type='single'
          size={'sm'}
          className='mt-4 flex flex-row items-center justify-between'
          onValueChange={onValueChangeToggleGrp}
        >
          <div>
            <ToolTipForTextAndIcon text={'Edit Appearance'}>
              <ToggleGroupItem value='EDIT_APPEARANCE'>
                <Paintbrush />
              </ToggleGroupItem>
            </ToolTipForTextAndIcon>
            {/* <ToolTipForTextAndIcon text={'Edit Link'}>
              <ToggleGroupItem value='EDIT_LINK'>
              <TypeOutline />
              </ToggleGroupItem>
            </ToolTipForTextAndIcon> */}
          </div>
          <div>
            <ToolTipForTextAndIcon text={`${data.isActive ? 'Hide' : 'Show'}`}>
              <ToggleGroupItem value='HIDE_AND_SHOW'>
                <div onClick={handleShowHide}>{data.isActive ? <EyeIcon /> : <EyeOffIcon />}</div>
              </ToggleGroupItem>
            </ToolTipForTextAndIcon>
            <ToolTipForTextAndIcon text={`Delete this link`}>
              <ToggleGroupItem value='DELETE'>
                <Trash2Icon onClick={handleDelete} />
              </ToggleGroupItem>
            </ToolTipForTextAndIcon>
          </div>
        </ToggleGroup>
        {editItem == 'EDIT_APPEARANCE' && <EditAppearance data={data} />}
        {editItem == 'EDIT_LINK' && <EditLink />}
      </Card>
      <AdhocLinksDialog open={open} setOpen={setOpen} data={data} />
    </div>
  );
}

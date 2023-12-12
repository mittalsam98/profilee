import React from 'react';
import SocialLinkDialog from '../dialogs/social-icons-dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { socialMediaDataByName } from '../page-elements';
import { GripVertical, MinusCircle, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import useDesigner from '@/hooks/use-designer';
import { useSortable } from '@dnd-kit/sortable';
import useHexToRGBA from '@/hooks/use-hex-to-rgba';
import { CSS } from '@dnd-kit/utilities';
const SocialIconDrag = ({ data, value }: { data: string; value?: string }) => {
  const { color, name, icon } = socialMediaDataByName[data]!;
  const { setLinks } = useDesigner();
  const rgbaColor1 = useHexToRGBA(color!, 0.08);
  const rgbaColor2 = useHexToRGBA(color!, 0.2);

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({
      id: data
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className='relative hover:cursor-pointer p-1'
    >
      <div
        className={`flex items-center border rounded-sm `}
        style={{ backgroundColor: rgbaColor1, borderColor: rgbaColor2 }}
      >
        <span {...listeners} ref={setActivatorNodeRef} className='p-1 '>
          <GripVertical size={16} />
        </span>
        <div className='flex w-24 items-center p-2'>
          <span className='pr-1'>{icon}</span>
          <span className='pr-1 text-sm'>{name}</span>
        </div>
        <span className='p-1'>
          <SocialLinkDialog name={data} value={value}>
            <Pencil size={12} className='mr-2' />
          </SocialLinkDialog>
        </span>
      </div>
      {value && (
        <div className={cn('absolute right-0 top-0  bg-white rounded-full ')}>
          <MinusCircle
            onClick={() => {
              setLinks((prevLinks) => {
                const linksCopy = { ...prevLinks };
                delete linksCopy[data];
                return linksCopy;
              });
            }}
            size={16}
            className='text-[#D11A2A]'
          />
        </div>
      )}
    </div>
  );
};
export default SocialIconDrag;

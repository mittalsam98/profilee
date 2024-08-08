import useDesigner from '@/hooks/use-designer';
import useHexToRGBA from '@/hooks/use-hex-to-rgba';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, MinusCircle, Pencil } from 'lucide-react';
import SocialLinkDialog from '../dialogs/social-icons-dialog';
import { socialMediaDataByName } from '../page-elements';

const SocialIconDrag = ({
  data,
  value,
  outOfOverlay
}: {
  data: string;
  value?: string;
  outOfOverlay?: boolean;
}) => {
  const { color, name, icon } = socialMediaDataByName[data]!;
  const { dispatch, state } = useDesigner();
  const rgbaColor1 = useHexToRGBA(color!, 0.08);
  const rgbaColor2 = useHexToRGBA(color!, 0.2);
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
      className={cn('relative p-1 ', isDragging && over ? 'opacity-20' : '')}
    >
      <div
        className={cn(
          `flex items-center border rounded-sm `,
          outOfOverlay ? 'border border-gray-500 bg-red-300' : '',
          isDragging ? 'shadow-lg ring-black	' : ''
        )}
        style={{ backgroundColor: `${outOfOverlay ? '' : rgbaColor1}`, borderColor: rgbaColor2 }}
      >
        <span
          {...listeners}
          ref={setActivatorNodeRef}
          className={cn(
            'p-1 hover:cursor-all-scroll',
            outOfOverlay ? 'hover:cursor-not-allowed' : ''
          )}
        >
          <GripVertical size={16} />
        </span>
        <SocialLinkDialog name={data} value={value}>
          <div className='flex  items-center p-2'>
            <span className='pr-1'>{icon}</span>
            <span className='pr-1 text-sm'>{name}</span>
            <span className='p-1'>
              <Pencil size={12} className='mr-2' />
            </span>
          </div>
        </SocialLinkDialog>
      </div>
      {value && (
        <div className={cn('absolute right-0 top-0  bg-white rounded-full')}>
          <MinusCircle
            onClick={() => {
              const linksCopy = { ...state.socialLinks };
              delete linksCopy[data];
              dispatch({
                type: 'UPDATE_SOCIAL_LINK',
                payload: linksCopy
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

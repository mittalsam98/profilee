// import React from 'react';
// import { useDraggable } from '@dnd-kit/core';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { PageElement } from './page-elements';

// function SidebarBtnElement({ pageElement }: { pageElement: PageElement }) {
//   const { label, icon: Icon } = pageElement.designerBtnElement;
//   const draggable = useDraggable({
//     id: `designer-btn-${pageElement.type}`,
//     data: {
//       type: pageElement.type,
//       isDesignerBtnElement: true
//     }
//   });

//   return (
//     <Button
//       ref={draggable.setNodeRef}
//       variant={'outline'}
//       className={cn(
//         'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab',
//         draggable.isDragging && 'ring-2 ring-primary'
//       )}
//       {...draggable.listeners}
//       {...draggable.attributes}
//     >
//       <Icon className='h-8 w-8 text-primary cursor-grab' />
//       <p className='text-xs'>{label}</p>
//     </Button>
//   );
// }

// export function SidebarBtnElementDragOverlay({ pageElement }: { pageElement: PageElement }) {
//   const { label, icon: Icon } = pageElement.designerBtnElement;

//   return (
//     <Button variant={'outline'} className='flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'>
//       test
//     </Button>
//   );
// }

// export default SidebarBtnElement;

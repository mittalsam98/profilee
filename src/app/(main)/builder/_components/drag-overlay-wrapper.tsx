import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { SidebarBtnElementDragOverlay } from './sidebar-btn-elements';
import { ElementsType, PageElements } from './page-elements';
import { Trash } from 'lucide-react';
import useDesigner from '@/hooks/use-designer';
import SocialIconDrag from './elements/social-icon-drag';

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { links } = useDesigner();
  useDndMonitor({
    onDragStart: (event) => {
      console.log(event);
      setDraggedItem(event.active);
    },
    onDragCancel: (event) => {
      setDraggedItem(null);
    },
    onDragEnd: (event) => {
      setDraggedItem(null);
    }
  });
  let node = <div>No Element Selected</div>;

  const draggedContainerID = draggedItem?.data?.current?.sortable?.containerId;
  if (draggedContainerID === 'social-icon') {
    const socialMediaName = draggedItem?.id.toString() || '';
    node = <SocialIconDrag data={socialMediaName} />;
  }
  return <DragOverlay>{node}</DragOverlay>;
}

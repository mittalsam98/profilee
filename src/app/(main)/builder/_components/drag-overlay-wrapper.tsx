import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { SidebarBtnElementDragOverlay } from './sidebar-btn-elements';
import { ElementsType, PageElements } from './page-elements';

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: (event) => {
      setDraggedItem(null);
    },
    onDragEnd: (event) => {
      setDraggedItem(null);
    }
  });
  let node = <div>No element</div>;

  const draggedSideBarElement = draggedItem?.data?.current?.isDesignerBtnElement;
  if (draggedSideBarElement) {
    const draggedSideBarElementType: ElementsType = draggedItem?.data?.current?.type;
    node = <SidebarBtnElementDragOverlay pageElement={PageElements[draggedSideBarElementType]} />;
  }
  return <DragOverlay>{node}</DragOverlay>;
}

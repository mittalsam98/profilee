'use client';
import Designer from '../_components/designer';
import DesignerSidebar from '../_components/designer-sidebar';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from '../_components/drag-overlay-wrapper';
export default function Admin() {
  return (
    <DndContext>
      <DesignerSidebar />
      <Designer />
      <DragOverlayWrapper />
    </DndContext>
  );
}

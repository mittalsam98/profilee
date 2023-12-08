'use client';
import Preview from '../_components/preview';
import BioEditor from '../_components/bio-editor';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from '../_components/drag-overlay-wrapper';
export default function Admin() {
  return (
    <DndContext>
      <BioEditor />
      <Preview />
      <DragOverlayWrapper />
    </DndContext>
  );
}

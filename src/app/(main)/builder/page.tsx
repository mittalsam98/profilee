'use client';
import Preview from './_components/preview/preview';
import BioEditor from './_components/bio-editor/bio-editor';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from './_components/drag-overlay-wrapper';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function Admin() {
  return (
    <DndContext>
      <TooltipProvider>
        <BioEditor />
        <Preview />
        <DragOverlayWrapper />
      </TooltipProvider>
    </DndContext>
  );
}

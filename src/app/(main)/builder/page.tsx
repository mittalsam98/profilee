'use client';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DndContext } from '@dnd-kit/core';
import 'react-loading-skeleton/dist/skeleton.css';
import BioEditor from './_components/bio-editor/bio-editor';
import DragOverlayWrapper from './_components/drag-overlay-wrapper';
import Preview from './_components/preview/preview';

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

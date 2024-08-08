'use client';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from '../_components/drag-overlay-wrapper';
import AdhocLinks from '../_components/links/adhoc-links';
import SocialIconsSection from '../_components/links/social-icons-section';

export default function Links() {
  return (
    <DndContext>
      <SocialIconsSection />
      <AdhocLinks />
      <DragOverlayWrapper />
    </DndContext>
  );
}

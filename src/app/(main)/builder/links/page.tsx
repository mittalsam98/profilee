'use client';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from '../_components/drag-overlay-wrapper';
import SocialIconsSection from '../_components/links/social-links/social-icons-section';
import AdhocLinks from '../_components/links/adhoc-links/adhoc-links';

export default function Links() {
  return (
    <DndContext>
      <SocialIconsSection />
      <AdhocLinks />
      <DragOverlayWrapper />
    </DndContext>
  );
}

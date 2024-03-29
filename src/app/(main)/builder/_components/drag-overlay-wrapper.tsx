import useDesigner from '@/hooks/use-designer';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import AdhocLinkDrag from './elements/adhoc-links-drag';
import SocialIconDrag from './elements/social-icon-drag';

export default function DragOverlayWrapper() {
  const { socialLinks, setSocialLinks, adhocLinks, setAdhocLinks } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const [overDraggedParent, setOverDraggedParent] = useState<boolean>(true);
  const draggedContainerID: string = draggedItem?.data?.current?.sortable?.containerId;

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragOver: (event) => {
      setOverDraggedParent(!!event.over);
    },
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;

      if (draggedContainerID === 'social-icon') {
        setSocialLinks((items) => {
          const oldIndex = Object.keys(items).indexOf(active.id.toString());
          const newIndex = Object.keys(items).indexOf(over.id.toString());

          return Object.fromEntries(arrayMove(Object.entries(socialLinks), oldIndex, newIndex));
        });
      } else if (draggedContainerID === 'adhoc-links') {
        setAdhocLinks((items) => {
          const oldIndex = items.findIndex((f) => f.id === active.id);
          const newIndex = items.findIndex((f) => f.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  });
  let node = <div>No Element Selected</div>;

  if (draggedContainerID === 'social-icon') {
    const socialMediaName = draggedItem?.id.toString() ?? '';
    node = <SocialIconDrag data={socialMediaName} outOfOverlay={!overDraggedParent} />;
  } else if (draggedContainerID === 'adhoc-links') {
    if (draggedItem?.data?.current?.sortable?.index !== undefined) {
      const draggedIndex: number = draggedItem?.data?.current?.sortable?.index;
      const draggedLink = adhocLinks[draggedIndex];

      // Ensure adhocLinks is defined before attempting to access its elements
      if (draggedLink) {
        node = <AdhocLinkDrag data={draggedLink} outOfOverlay={!overDraggedParent} />;
      }
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
}

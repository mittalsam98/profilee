import React from 'react';
import SidebarBtnElement from './sidebar-btn-elements';
import { PageElements } from './page-elements';

export default function DesignerSidebar() {
  return (
    <aside className='border-r-2 fixed bottom-0 lg:static lg:bottom-auto lg:h-full w-full h-[260px] lg:w-[410px] bg-white'>
      DesignerSidebar
      <SidebarBtnElement pageElement={PageElements.Youtube} />
    </aside>
  );
}

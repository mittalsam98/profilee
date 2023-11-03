import React from 'react';
import SidebarBtnElement from './sidebar-btn-elements';
import { PageElements } from './page-elements';
import SidebarSocialBtnElements from './elements/sidebar-social-btn-elements';
import ProfilePictureElement from './elements/profile-picture';

export default function DesignerSidebar() {
  return (
    <aside className='border-r-2 fixed bottom-0 z-50 overflow-auto h-[260px] w-full lg:static lg:flex-1 flex lg:h-full flex-col bg-slate-50 p-4 border-y-2 border-slate-300 lg:border-none'>
      DesignerSidebar
      <ProfilePictureElement />
      <SidebarSocialBtnElements />
      <SidebarBtnElement pageElement={PageElements.Youtube} />
    </aside>
  );
}

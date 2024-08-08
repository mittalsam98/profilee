import DesignerContextProvider from '@/components/context/designer-context';
import Navbar from './_components/navbar';
import { DndContext } from '@dnd-kit/core';
import Preview from './_components/preview/preview';

const AdminPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DesignerContextProvider>
      <div className='flex flex-col h-screen dark:bg-[#1F1F1F] bg-[url("/line-in-motion.svg")] '>
        <div className='h-14 z-50 bg-background dark:bg-[#1F1F1F] w-full px-6 flex justify-between items-center border-b border-slate-200 shadow-sm'>
          <Navbar />
        </div>
        <main className=' h-full flex-1 grow  overflow-y-auto flex flex-col lg:flex-row w-full'>
          <aside className='border-r-2 fixed bottom-0 z-50 overflow-auto h-[260px] w-full lg:static lg:flex-1 flex lg:h-full flex-col bg-slate-50 p-4 border-y-2 border-slate-300 lg:border-none'>
            {children}
          </aside>
          <Preview />
        </main>
      </div>
    </DesignerContextProvider>
  );
};

export default AdminPageLayout;

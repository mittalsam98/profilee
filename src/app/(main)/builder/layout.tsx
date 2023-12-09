import { cn } from '@/lib/utils';
import Navbar from './_components/navbar';

const AdminPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col h-screen dark:bg-[#1F1F1F] bg-[url("/line-in-motion.svg")] '>
      <div className='h-14 z-50 bg-background dark:bg-[#1F1F1F] w-full px-6 flex justify-between items-center border-b border-slate-200 shadow-sm'>
        <Navbar />
      </div>
      <main className=' h-full flex-1 grow  overflow-y-auto flex flex-col lg:flex-row w-full'>
        {children}
      </main>
    </div>
  );
};

export default AdminPageLayout;

import Navbar from '../_components/navbar';

const AdminPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col h-full dark:bg-[#1F1F1F] bg-[url("/line-in-motion.svg")] '>
      <Navbar />
      <main className='h-full'>{children}</main>
    </div>
  );
};

export default AdminPageLayout;

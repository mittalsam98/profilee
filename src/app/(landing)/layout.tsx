import Footer from '@/components/footer';
import Navbar from './_components/navbar';

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative overflow-hidden mx-auto'>
      <header className='border-b border-gray-200 lg:border-none lg:z-10 lg:mt-4 lg:fixed lg:top-0 lg:w-full'>
        <Navbar />
      </header>
      <main className='h-full pt-16 lg:pt-40'>{children}</main>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;

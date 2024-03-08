import Footer from '@/components/footer';
import Navbar from './_components/navbar';

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative overflow-hidden mx-auto'>
      <div className='border-b border-gray-200'>
        <Navbar />
      </div>
      <main className='h-full pt-16 md:pt-24'>{children}</main>
      <Footer />
    </div>
  );
};

export default LandingPageLayout;

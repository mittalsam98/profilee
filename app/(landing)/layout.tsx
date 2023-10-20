import Navbar from './_components/navbar';

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full dark:bg-[#1F1F1F] bg-[url("/gradient.jpg")] '>
      <Navbar />
      <main className='h-full pt-40'>{children}</main>
    </div>
  );
};

export default LandingPageLayout;

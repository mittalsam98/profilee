import Navbar from './_components/navbar';

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] mx-auto">
      <Navbar />
      <main className='h-full pt-20 md:pt-24'>{children}</main>
    </div>
  );
};

export default LandingPageLayout;

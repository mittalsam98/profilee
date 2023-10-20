import LandingPage from './_components/landing-page';
import MobileMenuNavbar from './_components/mobile-menu-navbar';

export default function Home() {
  return (
    <div className='flex flex-col dark:bg-[#1F1F1F]'>
      <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
        <LandingPage />
      </div>
    </div>
  );
}

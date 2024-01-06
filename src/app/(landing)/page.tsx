import LandingPage from './_components/landing-page';

import { getServerAuthSession } from '@/server/auth';
export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <div className='flex flex-col dark:bg-[#1F1F1F]'>
      <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
        <LandingPage />
      </div>
    </div>
  );
}

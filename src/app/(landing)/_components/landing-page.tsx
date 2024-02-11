import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { RiGithubLine } from 'react-icons/ri';
import PricingSection from './pricing-section';

export default function LandingPage() {
  return (
    <div className='relative w-full flex flex-col items-center'>
      <div className='mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-all hover:bg-blue-200'>
        <Image src='/profilee-b.png' height={16} width={16} alt='Your Name' />
        <p className='text-sm font-semibold text-[#1d9bf0]'>Introducing Profilee</p>
      </div>
      <h1 className='font-extrabold mt-8 text-center text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-blue-900 to-blue-500 max-w-sm sm:max-w-2xl'>
        Share every profile.
        <br />
        In one simple link.
      </h1>
      <span className='font-genera mt-8 text-center text-xl text-gray-800 leading-relaxed max-w-lg'>
        Profilee is link in bio tool for everything you create, share or sell online. All from a
        single link.
      </span>
      <div className='mt-12'>
        <Link
          href='https://github.com/mittalsam98/profilee'
          target='_blank'
          rel='noopener noreferrer'
          passHref
        >
          <Button variant='default' size='lg'>
            <RiGithubLine className='text-3xl mr-1' />
            <p className='text-xl'>Star us on Github</p>
          </Button>
        </Link>
      </div>
      <PricingSection />
    </div>
  );
}

import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa6';

export default function Hero() {
  return (
    <div className='px-4'>
      <div className='flex flex-col items-center justify-center'>
        <div className='card-wrapper h-[41px] md:h-[50px] w-[280px] md:w-[340px]  border-[1px] border-gray-200'>
          <div className='card-content flex items-center justify-center gap-x-2 text-sm md:text-lg'>
            <Image src='/profilee-b.png' height={20} width={20} alt='Your Name' />
            Introducing Profilee
            <span className='flex items-center gap-x-1'>
              <span className='border-s border-gray-200 text-blue-600 ps-2 dark:text-blue-500'>
                Explore
              </span>
              <MdKeyboardArrowRight className='flex-shrink-0 h-4 w-4 text-blue-600' />
            </span>
          </div>
        </div>
      </div>

      <div className='my-8 max-w-xl text-center mx-auto'>
        <h1 className='font-bold text-gray-800 text-4xl lg:text-6xl dark:text-gray-200'>
          Share every profile <br />
          in a simple link
        </h1>
      </div>

      <div className='mt-5 max-w-2xl text-center mx-auto'>
        <p className='text-xl text-gray-700 dark:text-gray-400'>
          Profilee is link in bio tool for everything you create, share or sell online. All from a
          single link.
        </p>
      </div>

      <div className='mt-8 gap-3 flex justify-center'>
        <Link
          className='inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800'
          href='https://github.com/mittalsam98/profilee'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaGithub className='text-3xl' />
          <p className='text-xl'>Star us on Github</p>
        </Link>
      </div>
    </div>
  );
}
//     background: conic-gradient( rgba(244, 114, 182, 0.9) 0deg, rgba(192, 132, 252, 0.9) 0deg, transparent 180deg );
// position: absolute;
// left: -5%;
// top: 40%;
// height: 10%;
// width: 115%;

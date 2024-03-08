import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-4 md:px-3 mt-16'>
      <div className='container mx-auto flex flex-col md:flex-row gap-y-4 items-center justify-between'>
        <Link className={'rounded-full px-5 py-1 text-md relative'} href={'/'}>
          Profilee
        </Link>
        <div className='w-full md:w-1/2 md:text-center'>
          <ul className='flex justify-center items-center flex-wrap text-xs md:text-sm gap-3'>
            <li>
              <Link
                href='https://twitter.com/Sachin_Mittal98'
                target='_blank'
                rel='noopener noreferrer'
              >
                Contact
              </Link>
            </li>
            <li className='mx-4'>
              <Link
                href='https://twitter.com/Sachin_Mittal98'
                target='_blank'
                rel='noopener noreferrer'
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href='https://twitter.com/Sachin_Mittal98'
                target='_blank'
                rel='noopener noreferrer'
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
        <div className='w-full md:w-1/2 md:text-center'>
          <p className='text-xs  md:text-sm text-center'>
            Copyright {new Date().getFullYear()} &copy; All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

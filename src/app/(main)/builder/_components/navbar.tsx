'use client';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import useDesigner from '@/hooks/use-designer';
import { api } from '@/trpc/react';
import { SiGradleplaypublisher } from 'react-icons/si';
import UsernameSettings from './elements/username';
import { IoReload } from 'react-icons/io5';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const { state } = useDesigner();
  const [isPublishing, setIsPublishing] = useState(false);

  const { mutateAsync: updateSocialLink } = api.socialLink.updateSocialLinks.useMutation();
  const { mutateAsync: updateAdhocLinks } = api.adHocLink.updateAdhocLinks.useMutation({
    onSuccess: (res) => {
      setIsPublishing(false);
    },
    onError: () => {
      setIsPublishing(false);
    }
  });

  return (
    <>
      <div className='flex justify-center items-center gap-x-12'>
        <Logo height={42} width={42} />
        <NavBarTabs />
        <UsernameSettings />
      </div>
      <div className='flex gap-x-6'>
        <Button
          type='button'
          onClick={async () => {
            setIsPublishing(true);
            await updateSocialLink(state.socialLinks);
            await updateAdhocLinks(state.adhocLinks);
          }}
          variant='outline'
          disabled={isPublishing}
          className='mx-auto w-32 rounded-full bg-gradient-to-l  from-blue-800 to-blue-600 text-sm font-medium text-white'
        >
          {isPublishing ? 'Publishing' : 'Published'}
          {isPublishing ? (
            <IoReload className='ml-2 h-5 w-5 animate-spin' />
          ) : (
            <SiGradleplaypublisher className='ml-2' />
          )}
        </Button>
      </div>
    </>
  );
}

const NavBarTabs = () => {
  return (
    <div className='flex justify-center items-center gap-10'>
      {/* <Link href='analytics' className='text-red-600'>
        Analytics
      </Link> */}
      <Link href='links'>Links</Link>
      <Link href='appearance'>Appearance</Link>
    </div>
  );
};

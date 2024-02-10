'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { useUploadThing } from '@/lib/uploadthing';
import useDesigner from '@/hooks/use-designer';
import { signIn, signOut, useSession } from 'next-auth/react';
import { api } from '@/trpc/react';
import { SiGradleplaypublisher } from 'react-icons/si';

export default function Navbar() {
  const { profileImg, socialLinks, adhocLinks, isPublishing } = useDesigner();

  const { startUpload, permittedFileInfo } = useUploadThing('imageUploader', {
    onClientUploadComplete: () => {
      alert('uploaded successfully!');
    },
    onUploadError: (e) => {
      console.log(e);
      alert('error occurred while uploading');
    },
    onUploadBegin: () => {
      alert('upload has begun');
    }
  });

  const { data: sessionData } = useSession();
  const { mutateAsync: updateSocialLink } = api.socialLink.updateSocialLinks.useMutation();
  const { mutateAsync: updateAdhocLinks } = api.adHocLink.updateAdhocLinks.useMutation({
    onError: () => {
      console.log('🚀 ~ Navbar ~ error:');
      return 'Error cookie 🍪';
    }
  });

  return (
    <>
      <div className='flex gap-x-12'>
        <Logo />
      </div>
      <div className='flex gap-x-6'>
        <Button
          type='button'
          onClick={async () => {
            await updateSocialLink(socialLinks);
            await updateAdhocLinks(adhocLinks);
          }}
          variant='outline'
          disabled={isPublishing}
          className='mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600  text-sm font-medium text-white'
        >
          {isPublishing ? 'Publishing' : 'Published'}
          <SiGradleplaypublisher className='ml-2' />
        </Button>
        {/* <MobileMenuNavbar /> */}
      </div>
    </>
  );
}

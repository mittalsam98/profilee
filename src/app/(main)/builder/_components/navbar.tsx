'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { useUploadThing } from '@/lib/uploadthing';
import useDesigner from '@/hooks/use-designer';
import { signIn, signOut, useSession } from 'next-auth/react';
import { api } from '@/trpc/react';

export default function Navbar() {
  const { profileImg, socialLinks, adhocLinks } = useDesigner();

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
  const { mutateAsync: updateAdhocLinks } = api.adHocLink.updateAdhocLinks.useMutation();
  // const { mutateAsync: updateSocialLink } = api.socialLink.updateSocialLinks.useMutation();
  // const { isLoading, mutateAsync: updateProfile } = api.link.updateProfile.useMutation({
  //   onSuccess: () => {
  //     console.log('Hello there');

  //     return '🍪';
  //   },
  //   onError: (error, variables, context) => {
  //     console.log('🚀 ~ Navbar ~ error:', error);
  //     return 'Error cookie 🍪';
  //   }
  // });

  return (
    <>
      <div className='flex gap-x-12'>
        <Logo />
      </div>
      <div className='flex gap-x-6'>
        <Button
          type='button'
          onClick={async () => {
            if (profileImg) {
              const files = [profileImg];
              startUpload(files);
            }

            updateSocialLink(socialLinks);
            updateAdhocLinks(adhocLinks);

            // await updateProfile({
            //   title: 'saf',
            //   bio: 'title',
            //   id: '333'
            // });

            // fetch(profileImg)
            //   .then((response) => response.blob())
            //   .then((blob) => {
            //     const file = new File([blob], 'Test');
            //     // Now 'file' is the converted File object
            //     console.log(file);
            //   });
          }}
          variant='outline'
          className='p-3'
        >
          Publish
        </Button>
        {/* <MobileMenuNavbar /> */}
      </div>
    </>
  );
}

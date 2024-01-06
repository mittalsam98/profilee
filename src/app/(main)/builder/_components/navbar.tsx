'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { useUploadThing } from '@/lib/uploadthing';
import useDesigner from '@/hooks/use-designer';
import { signIn, signOut, useSession } from 'next-auth/react';
import { api } from '@/trpc/react';

export default function Navbar() {
  const { profileImg } = useDesigner();

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

  const { isLoading, mutateAsync: updateProfile } = api.link.updateProfile.useMutation({
    onMutate: () => {
      return '🍪';
    },
    onError: (error, variables, context) => {
      console.log(error);
      return 'dd🍪';
    }
  });
  const { data: cook } = api.link.getCookie.useQuery('ss');
  console.log(cook);
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
            await updateProfile({
              title: 'saf',
              bio: 'title',
              id: '333'
            });
            console.group('after API call');

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

'use client';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import useDesigner from '@/hooks/use-designer';
import { api } from '@/trpc/react';
import { SiGradleplaypublisher } from 'react-icons/si';

export default function Navbar() {
  const { socialLinks, adhocLinks, isPublishing } = useDesigner();

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
        <Logo height={42} width={42} />
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
          className='mx-auto w-32 rounded-full bg-gradient-to-l  from-blue-800 to-blue-600 text-sm font-medium text-white'
        >
          {isPublishing ? 'Publishing' : 'Published'}
          <SiGradleplaypublisher className='ml-2' />
        </Button>
      </div>
    </>
  );
}

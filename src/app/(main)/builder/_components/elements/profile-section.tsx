import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDesigner from '@/hooks/use-designer';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import debounce from 'lodash.debounce';
import { MinusCircle } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineCloudUpload, AiOutlineYoutube } from 'react-icons/ai';
import Skeleton from 'react-loading-skeleton';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import Avatar from '../../../../../../public/avatar.svg';
import { toast } from 'sonner';

export default function ProfileSection() {
  const { setBio, setTitle, setProfileImg, profileImg, bio, title, setIsPublishing } =
    useDesigner();
  const [titleError, setTitleError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { isLoading, mutateAsync: updateProfile } = api.userProfile.updateUserProfile.useMutation();
  const upload = api.images.upload.useMutation();
  const deleteProfilePic = api.images.delete.useMutation();

  useEffect(() => {
    setIsPublishing(isLoading || upload.isLoading || deleteProfilePic.isLoading);
  }, [isLoading, upload.isLoading, deleteProfilePic.isLoading]);

  const savingProfile = ({ title, bio }: { title: string; bio?: string }) => {
    updateProfile({
      title,
      bio
    });
  };
  const debouncedInputHandler = useCallback(debounce(savingProfile, 700), []);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'profile') {
      if (value.length > 0) {
        void debouncedInputHandler({ title: value, bio });
        setTitle(value);
        setTitleError(false);
      } else {
        setTitleError(true);
      }
    } else if (id === 'bio') {
      void debouncedInputHandler({ title, bio: value });
      setBio(value);
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
        };
        reader.readAsDataURL(selectedFile);

        const signedUrl = await upload.mutateAsync();

        try {
          const res = await fetch(signedUrl.url, {
            method: 'PUT',
            body: selectedFile
          });

          if (res.ok) {
            setProfileImg(selectedFile);
          } else {
            toast.error('Something went wrong. Please refresh page and try again');
          }
        } catch (err) {
          toast.error('Something went wrong. Please refresh page and try again');
        }
      }
    }
  };
  return (
    <Card className='my-2'>
      <div className={'flex flex-col lg:flex-row  items-center gap-x-6 px-4 py-2 '}>
        <div
          className={cn(
            'flex min-h-[120px] min-w-[120px] w-[120px] h-[120px] hover:cursor-pointer bg-background/50 border-dashed relative',
            profileImg ? 'overflow-visible' : 'overflow-visible '
          )}
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
        >
          <Input
            ref={fileInputRef}
            id='file-upload'
            type='file'
            onChange={handleFileChange}
            className='file:bg-blue-50 file:text-blue-700 hidden hover:file:bg-blue-100'
          />
          {upload.isLoading ? (
            <div className='h-full w-full'>
              <Skeleton height='100%' circle={true} className='bg-red-500 w-full h-full' />
            </div>
          ) : profileImg ? (
            <>
              <Image
                src={
                  typeof profileImg === 'string'
                    ? `https://profilee-webapp.s3.amazonaws.com/${profileImg}`
                    : URL.createObjectURL(profileImg as File)
                }
                alt='Profile link image'
                width={120}
                height={120}
                className='overflow-hidden rounded-full'
              />
              <div
                onClick={async (e) => {
                  e.stopPropagation();
                  const res = await deleteProfilePic.mutateAsync();
                  if (res?.message) {
                    setProfileImg(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }
                }}
                className={cn(
                  'absolute right-2 bottom-1 border-2 border-white p-1 rounded-full bg-slate-200'
                )}
              >
                <MdOutlineDeleteSweep size={24} className='text-slate-600' />
              </div>
            </>
          ) : (
            <span className='inline-block h-full w-full bg-gray-100 rounded-full overflow-visible relative'>
              <Image
                width={120}
                height={120}
                src={Avatar}
                alt='Upload your profile picture'
                className=' rounded-full'
              />
              <div
                className={cn(
                  'absolute right-2 bottom-1 border-2 border-white p-1 rounded-full bg-slate-200'
                )}
              >
                <AiOutlineCloudUpload size={24} className='text-slate-600' />
              </div>
            </span>
          )}
        </div>
        <div>
          <Label htmlFor='profile'>Title</Label>
          <Input id='profile' value={title} onChange={inputHandler} />{' '}
          {titleError && (
            <p className={'text-sm font-medium text-destructive'}>{'Profile should have name'}</p>
          )}
        </div>
        <div>
          <Label htmlFor='bio'>Bio</Label>
          <Input id='bio' value={bio} onChange={inputHandler} />
        </div>
      </div>
    </Card>
  );
}

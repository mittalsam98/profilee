import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDesigner from '@/hooks/use-designer';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import Image from 'next/image';
import { useEffect, useRef, useState, useTransition } from 'react';
import { AiOutlineCloudUpload, AiOutlineYoutube } from 'react-icons/ai';

export default function ProfileSection() {
  const { setBio, setTitle, setProfileImg, profileImg, bio, title, setIsLoading, loading } =
    useDesigner();
  const [isSaving, startProfileSaving] = useTransition();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const trpcContext = api.useUtils();

  // API calls
  // const { data, isLoading: loadingProfile, refetch } = api.userProfile.getUserProfile.useQuery();

  const { isLoading: savingProfile, mutateAsync: updateProfile } =
    api.userProfile.updateUserProfile.useMutation({
      onSuccess: (res) => {
        console.log('🚀 ~ ProfileSection  onSuccess~ res:', res);
      },
      onMutate: (res) => {
        console.log('🚀 ~ ProfileSection  onMutate~ res:', res);
      },
      onError: (res, newTodo, context) => {
        // refetch();
        trpcContext.userProfile.getUserProfile.invalidate();
        console.log('🚀 ~ ProfileSection onError ~ res:', res);
      }
    });

  // useEffect(() => {
  //   console.log('======= Profile Section client ===', data);
  //   if (data && data.userProfile) {
  //     setTitle(data.userProfile.title || '');
  //     setBio(data.userProfile.bio || '');
  //   }
  // }, [data]);

  useEffect(() => {
    setIsLoading(savingProfile);
  }, [savingProfile]);

  const save = ({ title, bio }: { title: string; bio?: string }) => {
    startProfileSaving(async () => {
      updateProfile({
        title,
        bio
      });
    });
  };

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'profile') {
      void save({ title: value, bio });
      console.log(isSaving);
      if (!isSaving) setTitle(value);
    } else if (id === 'bio') {
      void save({ title, bio: value });
      if (!isSaving) setTitle(value);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        setProfileImg(selectedFile);
      }
    }
  };
  return (
    <Card className='my-2'>
      {<div className='text-right mx-4 mt-2 text-teal-600'>{loading ? 'Saving...' : 'Saved'}</div>}
      <div className={'flex flex-row items-center gap-x-6 px-4 pb-4'}>
        <Input
          ref={fileInputRef}
          id='file-upload'
          type='file'
          onChange={handleFileChange}
          className='file:bg-blue-50 file:text-blue-700 hidden hover:file:bg-blue-100'
        />
        <div
          className={cn(
            'flex h-[120px] w-[120px] flex-col items-center justify-center gap-y-1 rounded-full border border-border ',
            'hover:cursor-pointer bg-background/50 overflow-hidden border-dashed relative'
          )}
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
        >
          {profileImg ? (
            <>
              <Image
                key={URL.createObjectURL(profileImg)}
                src={URL.createObjectURL(profileImg)}
                alt='Profile link image'
                width={150}
                height={150}
                className='overflow-hidden'
              />
              <div className='hidden hover:flex absolute top-0 right-0 p-2 bg-white cursor-pointer'>
                <AiOutlineYoutube className='text-2xl hover:scale-125' />
              </div>
            </>
          ) : (
            <>
              <AiOutlineCloudUpload className='h-8 w-8 text-muted-foreground' />{' '}
              <Label htmlFor='file-upload'>Upload</Label>
            </>
          )}
        </div>
        <div>
          <Label htmlFor='profile'>Title</Label>
          <Input id='profile' value={title} onChange={handleInputChanged} />
        </div>
        <div>
          <Label htmlFor='bio'>Bio</Label>
          <Input id='bio' value={bio} onChange={handleInputChanged} />
        </div>
      </div>
    </Card>
  );
}

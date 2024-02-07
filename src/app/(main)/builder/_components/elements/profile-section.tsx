import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDesigner from '@/hooks/use-designer';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineCloudUpload, AiOutlineYoutube } from 'react-icons/ai';

export default function ProfileSection() {
  const { setBio, setTitle, setProfileImg, profileImg, bio, title, setIsPublishing } =
    useDesigner();
  const [titleError, setTitleError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const utils = api.useUtils();

  const { isLoading, mutateAsync: updateProfile } = api.userProfile.updateUserProfile.useMutation();

  useEffect(() => {
    setIsPublishing(isLoading);
  }, [isLoading]);

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

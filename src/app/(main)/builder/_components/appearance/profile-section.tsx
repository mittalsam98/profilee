import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDesigner from '@/hooks/use-designer';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'sonner';
import avatar from '../../../../../../public/avatar.svg';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MdOutlineExpandMore } from 'react-icons/md';
import { HiMiniIdentification } from 'react-icons/hi2';
import { Textarea } from '@/components/ui/textarea';

export default function ProfileSection() {
  const { state, dispatch } = useDesigner();
  const [titleError, setTitleError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isLoading, mutateAsync: updateProfile } = api.userProfile.updateUserProfile.useMutation();
  const upload = api.images.upload.useMutation();
  const deleteProfilePic = api.images.delete.useMutation();

  // useEffect(() => {
  //   setIsPublishing(isLoading || upload.isLoading || deleteProfilePic.isLoading);
  // }, [isLoading, upload.isLoading, deleteProfilePic.isLoading]);

  const savingProfile = async ({ title, bio }: { title: string; bio?: string }) => {
    await updateProfile({
      title,
      bio
    });
  };
  const debouncedInputHandler = useCallback(debounce(savingProfile, 700), []);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (id === 'profile') {
      if (value.length > 0) {
        void debouncedInputHandler({ title: value, bio: state.userProfile.bio });
        dispatch({
          type: 'UPDATE_TITLE',
          payload: value
        });
        setTitleError(false);
      } else {
        setTitleError(true);
      }
    } else if (id === 'bio') {
      void debouncedInputHandler({ title: state.userProfile.title, bio: value });
      dispatch({
        type: 'UPDATE_BIO',
        payload: value
      });
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        const signedUrl = await upload.mutateAsync();

        try {
          const res = await fetch(signedUrl.url, {
            method: 'PUT',
            body: selectedFile
          });

          if (res.ok) {
            dispatch({
              type: 'UPDATE_PROFILE_IMG',
              payload: selectedFile
            });
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
    <Card className='mb-6 '>
      <Collapsible>
        <CollapsibleTrigger className='flex w-full hover:bg-slate-50  hover:rounded-lg  cursor-pointer  items-center  justify-between p-4'>
          <p className='text-sm font-semibold flex items-center '>
            <HiMiniIdentification className='text-slate-400 text-2xl mr-2' /> Profile Section
          </p>
          <MdOutlineExpandMore className='text-slate-400 text-2xl' />
        </CollapsibleTrigger>
        <CollapsibleContent className='border-t '>
          <div className={'flex w-full items-center justify-around gap-x-6 p-6'}>
            <div className='w-4/6'>
              <div className='w-full text-left mb-2'>
                <Label htmlFor='profile'>Title</Label>
                <Input id='profile' value={state.userProfile.title} onChange={inputHandler} />{' '}
                {titleError && (
                  <p className={'text-xs mt-1 font-medium text-destructive'}>
                    {'Profile should have name'}
                  </p>
                )}
              </div>
              <div className='w-full text-left'>
                <Label htmlFor='bio'>Bio</Label>
                <Textarea id='bio' value={state.userProfile.bio} onChange={inputHandler} />
              </div>
            </div>
            <div
              className={cn(
                'flex min-h-[120px] min-w-[120px] w-[120px] h-[120px] hover:cursor-pointer bg-background/50 border-dashed relative',
                state.userProfile.profileImg ? 'overflow-visible' : 'overflow-visible '
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
              ) : state.userProfile.profileImg ? (
                <>
                  <Image
                    src={
                      typeof state.userProfile.profileImg === 'string'
                        ? `https://profilee-webstate.userProfile.app.s3.amazonaws.com/${state.userProfile.profileImg}`
                        : URL.createObjectURL(state.userProfile.profileImg)
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
                        dispatch({
                          type: 'UPDATE_PROFILE_IMG',
                          payload: null
                        });
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
                    src={avatar}
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
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

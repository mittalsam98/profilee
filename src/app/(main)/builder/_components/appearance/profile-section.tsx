import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useDesigner from '@/hooks/use-designer';
import { api } from '@/trpc/react';
import debounce from 'lodash.debounce';
import { useCallback, useRef, useState } from 'react';
import { HiMiniIdentification } from 'react-icons/hi2';
import { MdOutlineExpandMore } from 'react-icons/md';
import { DocumentDropzoneBox } from './document-dropzone';

export default function ProfileSection() {
  const { state, dispatch } = useDesigner();
  const [titleError, setTitleError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isLoading, mutateAsync: updateProfile } = api.userProfile.updateUserProfile.useMutation();
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
          <div className={'flex flex-col w-full gap-x-6 p-6'}>
            <DocumentDropzoneBox />
            <div className='w-full text-left mb-4'>
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
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

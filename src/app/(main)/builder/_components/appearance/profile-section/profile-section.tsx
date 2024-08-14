import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import useDesigner from '@/hooks/use-designer';
import { api } from '@/trpc/react';
import debounce from 'lodash.debounce';
import { Paintbrush } from 'lucide-react';
import { useCallback, useState } from 'react';
import { HiMiniIdentification } from 'react-icons/hi2';
import { MdOutlineExpandMore } from 'react-icons/md';
import EditBioTitle from './edit-bio-title';
import { PicDropzoneBox } from './profile-pic-dropzone';

export default function ProfileSection() {
  const { state, dispatch } = useDesigner();
  const [titleError, setTitleError] = useState(false);
  const { isLoading, mutateAsync: updateProfile } = api.userProfile.updateUserProfile.useMutation();

  const [titleAppearanceToggle, setTitleAppearanceToggle] = useState(false);
  const [bioAppearanceToggle, setBioAppearanceToggle] = useState(false);
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
            <PicDropzoneBox />
            <div className='w-full text-left'>
              <Label htmlFor='profile'>Title</Label>
              <div className='flex gap-1 mt-1'>
                <Input id='profile' value={state.userProfile.title} onChange={inputHandler} />
                <Toggle value='EDIT_TITLE' onPressedChange={setTitleAppearanceToggle}>
                  <Paintbrush className='h-4 w-4' />
                </Toggle>
              </div>
              {titleError && (
                <p className={'text-xs mt-1 font-medium text-destructive'}>
                  {'Profile should have name'}
                </p>
              )}
            </div>
            {titleAppearanceToggle && (
              <EditBioTitle title='TITLE' background={state.userProfile.titleColor ?? ''} />
            )}
            <div className='w-full text-left'>
              <Label htmlFor='bio'>Bio</Label>
              <div className='flex gap-1 mt-1'>
                <Textarea id='bio' value={state.userProfile.bio} onChange={inputHandler} />
                <Toggle value='EDIT_BIO' onPressedChange={setBioAppearanceToggle}>
                  <Paintbrush className='h-4 w-4' />
                </Toggle>
              </div>
            </div>
            {bioAppearanceToggle && (
              <EditBioTitle title='BIO' background={state.userProfile.bioColor ?? ''} />
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

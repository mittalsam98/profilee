'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GeneralSetting from '../_components/appearance/general-appearance-setting/general-appearance-setting';
import ProfileSection from '../_components/appearance/profile-section/profile-section';
import useDesigner from '@/hooks/use-designer';
import isequal from 'lodash.isequal';
import { api } from '@/trpc/react';
import { UserProfile } from '@prisma/client';
import { Loader2 } from 'lucide-react';

export default function Appearance() {
  const { state, initialValues } = useDesigner();
  const [isGeneralAppearanceStateEqual, setIsGeneralAppearanceStateEqual] = useState(true);
  const [isProfileStateEqual, setIsProfileStateEqual] = useState(true);
  const { isLoading: isLoadingGA, mutateAsync: updateGeneralPreference } =
    api.generalAppearance.updateGeneralAppearance.useMutation();
  const { isLoading: isLoadingUP, mutateAsync: updateProfile } =
    api.userProfile.updateUserProfile.useMutation();

  useEffect(() => {
    setIsGeneralAppearanceStateEqual(
      isequal(initialValues?.generalAppearance, state.generalAppearance)
    );
    setIsProfileStateEqual(isequal(initialValues?.userProfile, state.userProfile));
  }, [state, initialValues]);

  return (
    <>
      <Button
        className='self-end mb-3 w-24 rounded-md bg-blue-500 text-sm font-medium text-white hover:text-white hover:bg-blue-400'
        onClick={async () => {
          // Update general preference
          await updateGeneralPreference({
            ...state.generalAppearance
          });

          // Update Profile picture
          const userProfileObj: Omit<UserProfile, 'id' | 'pic' | 'userId'> = {
            bio: state.userProfile.bio,
            title: state.userProfile.title,
            profilePicBorder: state.userProfile.profilePicBorder,
            bioColor: state.userProfile.bioColor,
            titleColor: state.userProfile.titleColor,
            titleFontSize: state.userProfile.titleFontSize,
            bioFontSize: state.userProfile.bioFontSize
          };
          await updateProfile({
            ...userProfileObj
          });
        }}
        variant='ghost'
        disabled={isGeneralAppearanceStateEqual && isProfileStateEqual} // Disable button if no changes detected
      >
        {isLoadingGA || isLoadingUP ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
        {isLoadingGA || isLoadingUP ? 'Saving' : 'Save'}
      </Button>
      <ProfileSection />
      <GeneralSetting />
    </>
  );
}

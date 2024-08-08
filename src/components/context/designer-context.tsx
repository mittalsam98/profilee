'use client';

import Error from '@/components/error';
import { api } from '@/trpc/react';
import { AdhocLinks, SocialMediaDataContext, UserProfile } from '@/types/types';
import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from 'react';
import { DesignerContextAction } from './designer-context-action';

export type DesignerContextState = {
  userProfile: UserProfile;
  socialLinks: SocialMediaDataContext;
  adhocLinks: AdhocLinks[];
};

const initialState: DesignerContextState = {
  userProfile: {
    profileImg: '',
    title: '',
    username: '',
    bio: ''
  },
  adhocLinks: [],
  socialLinks: {}
};

// type DesignerContextProps = {
//   profileImg: File | string | null;
//   setProfileImg: Dispatch<SetStateAction<File | null | string>>;
//   title: string;
//   setTitle: Dispatch<SetStateAction<string>>;
//   username: string;
//   setUsername: Dispatch<SetStateAction<string>>;
//   bio: string;
//   setBio: Dispatch<SetStateAction<string>>;
//   loading: boolean;
//   setIsLoading: Dispatch<SetStateAction<boolean>>;
//   isPublishing: boolean;
//   setIsPublishing: Dispatch<SetStateAction<boolean>>;
//   socialLinks: SocialMediaDataContext;
//   setSocialLinks: Dispatch<SetStateAction<SocialMediaDataContext>>;
//   adhocLinks: AdhocLinks[];
//   setAdhocLinks: Dispatch<SetStateAction<AdhocLinks[]>>;
// };

export const DesignerContext = createContext<{
  state: DesignerContextState;
  dispatch: Dispatch<DesignerContextAction>;
} | null>(null);

const DesignerContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(designerReducer, initialState);

  const {
    data,
    isFetching: fetchingProfile,
    isSuccess,
    isError,
    error
  } = api.userProfile.getUserCompleteProfile.useQuery();
  console.log({ isSuccess, data, state });

  useEffect(() => {
    if (isSuccess) {
      const newState: DesignerContextState = {
        userProfile: {
          profileImg: data?.userProfile?.pic ?? '',
          title: data?.userProfile?.title ?? '',
          username: data?.username ?? '',
          bio: data?.userProfile?.bio ?? ''
        },
        adhocLinks: (data?.adhocLink?.data as AdhocLinks[]) ?? [],
        socialLinks: (data?.socialLink?.data as SocialMediaDataContext) ?? {}
      };
      dispatch({ type: 'SET_INITIAL_STATE', payload: newState });
    }
  }, [isSuccess, data]);

  if (isError) return <Error error={error?.message} />;

  return (
    <DesignerContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
};

export default DesignerContextProvider;

const designerReducer = (
  state: DesignerContextState = initialState,
  action: DesignerContextAction
): DesignerContextState => {
  console.log(action, state);
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return action.payload;
    case 'UPDATE_BIO':
      return { ...state, userProfile: { ...state.userProfile, bio: action.payload } };
    case 'UPDATE_USERNAME':
      return { ...state, userProfile: { ...state.userProfile, username: action.payload } };
    case 'UPDATE_TITLE':
      return { ...state, userProfile: { ...state.userProfile, title: action.payload } };
    case 'UPDATE_PROFILE_IMG':
      return { ...state, userProfile: { ...state.userProfile, profileImg: action.payload } };
    case 'UPDATE_ADHOC_LINK':
      return { ...state, adhocLinks: action.payload };
    case 'UPDATE_SOCIAL_LINK':
      return { ...state, socialLinks: action.payload };
    default:
      return state;
  }
};

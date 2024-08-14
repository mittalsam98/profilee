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
    bio: '',
    bioColor: '#000',
    bioFontSize: '#000',
    titleColor: '#000',
    titleFontSize: '#000',
    picBorder: ''
  },
  adhocLinks: [],
  socialLinks: {}
};

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

  useEffect(() => {
    if (isSuccess) {
      const newState: DesignerContextState = {
        userProfile: {
          profileImg: data?.userProfile?.pic ?? '',
          title: data?.userProfile?.title ?? '',
          username: data?.username ?? '',
          bio: data?.userProfile?.bio ?? '',
          bioColor: data?.userProfile?.bioColor ?? '',
          titleColor: data?.userProfile?.titleColor ?? '',
          titleFontSize: data?.userProfile?.titleFontSize ?? '',
          bioFontSize: data?.userProfile?.bioFontSize ?? ''
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
    // User Profile Actions
    case 'UPDATE_BIO':
      return { ...state, userProfile: { ...state.userProfile, bio: action.payload } };
    case 'UPDATE_USERNAME':
      return { ...state, userProfile: { ...state.userProfile, username: action.payload } };
    case 'UPDATE_TITLE':
      return { ...state, userProfile: { ...state.userProfile, title: action.payload } };
    case 'UPDATE_PROFILE_IMG':
      return { ...state, userProfile: { ...state.userProfile, profileImg: action.payload } };
    case 'UPDATE_BIO_COLOR':
      return { ...state, userProfile: { ...state.userProfile, bioColor: action.payload } };
    case 'UPDATE_BIO_FONT_SIZE':
      return { ...state, userProfile: { ...state.userProfile, bioFontSize: action.payload } };
    case 'UPDATE_TITLE_COLOR':
      return { ...state, userProfile: { ...state.userProfile, titleColor: action.payload } };
    case 'UPDATE_TITLE_FONT_SIZE':
      return { ...state, userProfile: { ...state.userProfile, titleFontSize: action.payload } };
    case 'UPDATE_PIC_BORDER':
      // Adhoc Links Action
      return { ...state, userProfile: { ...state.userProfile, picBorder: action.payload } };
    case 'UPDATE_ADHOC_LINK':
      return { ...state, adhocLinks: action.payload };
    // Social Links Action
    case 'UPDATE_SOCIAL_LINK':
      return { ...state, socialLinks: action.payload };
    default:
      return state;
  }
};

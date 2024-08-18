'use client';

import Error from '@/components/error';
import { api } from '@/trpc/react';
import { AdhocLinks, GeneralAppearance, SocialMediaDataContext, UserProfile } from '@/types/types';
import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { DesignerContextAction } from './designer-context-action';

export type DesignerContextState = {
  userProfile: UserProfile;
  socialLinks: SocialMediaDataContext;
  generalAppearance: GeneralAppearance;
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
  generalAppearance: {
    hideBranding: false,
    enableShareButton: true,
    primaryBackgroundColor: '',
    primaryBackgroundImage: '',
    fontFamily: '',
    linkCardShadow: '',
    useSecondaryBackground: false,
    secondaryBackgroundColor: '#000',
    secondaryBackgroundImage: ''
  },
  adhocLinks: [],
  socialLinks: {}
};

export const DesignerContext = createContext<{
  state: DesignerContextState;
  dispatch: Dispatch<DesignerContextAction>;
  initialValues: DesignerContextState | undefined;
} | null>(null);

const DesignerContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(designerReducer, initialState);
  const [initialValues, setInitialValues] = useState<DesignerContextState>();

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
        generalAppearance: {
          hideBranding: data?.generalAppearance?.hideBranding ?? false,
          enableShareButton: data?.generalAppearance?.enableShareButton ?? true,
          primaryBackgroundColor: data?.generalAppearance?.primaryBackgroundColor ?? '#fff',
          primaryBackgroundImage: data?.generalAppearance?.primaryBackgroundImage ?? '',
          fontFamily: data?.generalAppearance?.fontFamily ?? '',
          linkCardShadow: data?.generalAppearance?.linkCardShadow ?? '',
          useSecondaryBackground: data?.generalAppearance?.useSecondaryBackground ?? false,
          secondaryBackgroundColor: data?.generalAppearance?.secondaryBackgroundColor ?? '#fff',
          secondaryBackgroundImage: data?.generalAppearance?.secondaryBackgroundImage ?? ''
        },
        adhocLinks: (data?.adhocLink?.data as AdhocLinks[]) ?? [],
        socialLinks: (data?.socialLink?.data as SocialMediaDataContext) ?? {}
      };
      setInitialValues(newState);
      dispatch({ type: 'SET_INITIAL_STATE', payload: newState });
    }
  }, [isSuccess, data]);

  if (isError) return <Error error={error?.message} />;

  return (
    <DesignerContext.Provider
      value={{
        state,
        dispatch,
        initialValues
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
    // General Appearance
    case 'IS_SECONDARY_BACKGROUND':
      return {
        ...state,
        generalAppearance: { ...state.generalAppearance, useSecondaryBackground: action.payload }
      };
    case 'UPDATE_PRIMARY_BACKGROUND_COLOR':
      return {
        ...state,
        generalAppearance: { ...state.generalAppearance, primaryBackgroundColor: action.payload }
      };
    case 'UPDATE_SECONDARY_BACKGROUND_COLOR':
      return {
        ...state,
        generalAppearance: { ...state.generalAppearance, secondaryBackgroundColor: action.payload }
      };
    case 'UPDATE_LINK_CARD_SHADOW':
      return {
        ...state,
        generalAppearance: { ...state.generalAppearance, linkCardShadow: action.payload }
      };
    case 'UPDATE_FONT_FAMILY':
      return {
        ...state,
        generalAppearance: { ...state.generalAppearance, fontFamily: action.payload }
      };

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

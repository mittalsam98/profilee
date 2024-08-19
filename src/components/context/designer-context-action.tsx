import { AdhocLinks, SocialMediaDataContext } from '@/types/types';
import { DesignerContextState } from './designer-context';
// Adhoc Links Action
export type AdhocLinksAction = {
  type: 'UPDATE_ADHOC_LINK';
  payload: AdhocLinks[];
};

export type UserProfileAction =
  | { type: 'UPDATE_PROFILE_IMG'; payload: File | string | null }
  | { type: 'UPDATE_BIO'; payload: string }
  | { type: 'UPDATE_USERNAME'; payload: string }
  | { type: 'UPDATE_TITLE'; payload: string }
  | { type: 'UPDATE_BIO_COLOR'; payload: string }
  | { type: 'UPDATE_BIO_FONT_SIZE'; payload: string }
  | { type: 'UPDATE_TITLE_COLOR'; payload: string }
  | { type: 'UPDATE_TITLE_FONT_SIZE'; payload: string };

export type SocialLinksAction = {
  type: 'UPDATE_SOCIAL_LINK';
  payload: SocialMediaDataContext;
};

export type InitialStateAction = {
  type: 'SET_INITIAL_STATE';
  payload: DesignerContextState;
};

export type GeneralAppearanceAction =
  | { type: 'UPDATE_PIC_BORDER'; payload: string }
  | { type: 'HDE_BRANDING'; payload: boolean }
  | { type: 'ENABLE_SHARE_BUTTON'; payload: boolean }
  | {
      type: 'UPDATE_PRIMARY_BACKGROUND_COLOR';
      payload: string;
    }
  | { type: 'UPDATE_PRIMARY_BACKGROUND_IMAGE'; payload: string }
  | { type: 'UPDATE_FONT_FAMILY'; payload: string }
  | { type: 'IS_SECONDARY_BACKGROUND'; payload: boolean }
  | { type: 'UPDATE_SECONDARY_BACKGROUND_COLOR'; payload: string }
  | { type: 'UPDATE_SECONDARY_BACKGROUND_IMAGE'; payload: string }
  | { type: 'UPDATE_LINK_CARD_SHADOW'; payload: string };

export type DesignerContextAction =
  | InitialStateAction
  | UserProfileAction
  | AdhocLinksAction
  | SocialLinksAction
  | GeneralAppearanceAction;

import { AdhocLinks, UserProfile, SocialMediaDataContext } from '@/types/types';
import { DesignerContextState } from './designer-context';

export type DesignerContextAction =
  | {
      type: 'SET_INITIAL_STATE';
      payload: DesignerContextState;
    }
  | {
      type: 'UPDATE_PROFILE_IMG';
      payload: File | string | null;
    }
  | {
      type: 'UPDATE_BIO';
      payload: string;
    }
  | {
      type: 'UPDATE_USERNAME';
      payload: string;
    }
  | {
      type: 'UPDATE_TITLE';
      payload: string;
    }
  | {
      type: 'UPDATE_ADHOC_LINK';
      payload: AdhocLinks[];
    }
  | {
      type: 'UPDATE_SOCIAL_LINK';
      payload: SocialMediaDataContext;
    };

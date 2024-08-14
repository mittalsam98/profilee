import { AdhocLinks, UserProfile, SocialMediaDataContext } from '@/types/types';
import { DesignerContextState } from './designer-context';

export type DesignerContextAction =
  | {
      type: 'SET_INITIAL_STATE';
      payload: DesignerContextState;
    }
  //     // User Profile Actions
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
      type: 'UPDATE_BIO_COLOR';
      payload: string;
    }
  | {
      type: 'UPDATE_BIO_FONT_SIZE';
      payload: string;
    }
  | {
      type: 'UPDATE_TITLE_COLOR';
      payload: string;
    }
  | {
      type: 'UPDATE_TITLE_FONT_SIZE';
      payload: string;
    }
  | {
      type: 'UPDATE_PIC_BORDER';
      payload: string;
    }
  // Adhoc Links Action
  | {
      type: 'UPDATE_ADHOC_LINK';
      payload: AdhocLinks[];
    }
  // Social Links Action
  | {
      type: 'UPDATE_SOCIAL_LINK';
      payload: SocialMediaDataContext;
    };

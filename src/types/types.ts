export type preview = 'desktop' | 'mobile';

export type SocialMediaData = {
  name: string;
  color?: string;
  icon: React.ReactElement;
};

export type SocialMediaDataContext = {
  [platform: string]: string;
};

export type AdhocLinks = {
  name: string;
  id:string
  link: string;
  isActive: boolean;
};
export type AdhocLinksDataContext = AdhocLinks[];

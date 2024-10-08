export type preview = 'desktop' | 'mobile';

export enum TextAlign {
  CENTER = 'CENTER',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}
export enum BorderRadius {
  SM = 'SM',
  MD = 'MD',
  LG = 'LG'
}
export type UserProfile = {
  pic: string;
  title: string;
  username: string;
  bio: string;
  profilePicBorder: string;
  bioColor: string;
  titleColor: string;
  titleFontSize: string;
  bioFontSize: string;
};
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
  id: string;
  link: string;
  isActive: boolean;
  theme: LinkTheme;
  clicks: number;
};
export type LinkTheme = {
  textAlign: TextAlign;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderRadius: BorderRadius;
};
export type AdhocLinksDataContext = AdhocLinks[];

export type GeneralAppearance = {
  hideBranding: boolean;
  enableShareButton: boolean;
  primaryBackgroundColor: string;
  primaryBackgroundImage: string;
  fontFamily: string;
  linkCardShadow: string;
  useSecondaryBackground: boolean;
  secondaryBackgroundColor: string;
  secondaryBackgroundImage: string;
};

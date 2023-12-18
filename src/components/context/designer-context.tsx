'use client';

import { AdhocLinks, SocialMediaDataContext } from '@/types/types';
import { Dispatch, useState, createContext, SetStateAction, PropsWithChildren } from 'react';

type DesignerContextProps = {
  profileImg: string;
  setProfileImg: Dispatch<SetStateAction<string>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  bio: string;
  setBio: Dispatch<SetStateAction<string>>;
  socialLinks: SocialMediaDataContext;
  setSocialLinks: Dispatch<SetStateAction<SocialMediaDataContext>>;
  adhocLinks: AdhocLinks[];
  setAdhocLinks: Dispatch<SetStateAction<AdhocLinks[]>>;
};

export const DesignerContext = createContext<DesignerContextProps | null>(null);

const DesignerContextProvider = ({ children }: PropsWithChildren) => {
  const [profileImg, setProfileImg] = useState<string>('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [adhocLinks, setAdhocLinks] = useState<AdhocLinks[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialMediaDataContext>({});

  return (
    <DesignerContext.Provider
      value={{
        profileImg,
        setProfileImg,
        title,
        setTitle,
        bio,
        setBio,
        setSocialLinks,
        socialLinks,
        adhocLinks,
        setAdhocLinks
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
};

export default DesignerContextProvider;

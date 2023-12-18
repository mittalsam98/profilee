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
  const [adhocLinks, setAdhocLinks] = useState<AdhocLinks[]>([
    {
      name: 'ssd',
      link: 'adfas',
      id: 'adfadds',
      isActive: true
    },
    {
      name: 'tstee',
      link: 'tstee',
      id: 'tstee',
      isActive: false
    }
  ]);
  const [socialLinks, setSocialLinks] = useState<SocialMediaDataContext>({
    Twitter: 'http://localhost:3000/builder',
    Instagram: 'http://localhost:3000/builder',
    Facebook: 'http://localhost:3000/builder'
  });

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

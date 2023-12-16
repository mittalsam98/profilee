'use client';

import { SocialMediaDataContext } from '@/types/types';
import { Dispatch, useState, createContext, SetStateAction, PropsWithChildren } from 'react';

type DesignerContextProps = {
  profileImg: string;
  setProfileImg: Dispatch<SetStateAction<string>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  bio: string;
  setBio: Dispatch<SetStateAction<string>>;
  links: SocialMediaDataContext;
  setLinks: Dispatch<SetStateAction<SocialMediaDataContext>>;
};

export const DesignerContext = createContext<DesignerContextProps | null>(null);

const DesignerContextProvider = ({ children }: PropsWithChildren) => {
  const [profileImg, setProfileImg] = useState<string>('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [links, setLinks] = useState<SocialMediaDataContext>({
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
        setLinks,
        links
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
};

export default DesignerContextProvider;

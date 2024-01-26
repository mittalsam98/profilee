'use client';

import { api } from '@/trpc/react';
import { AdhocLinks, SocialMediaDataContext } from '@/types/types';
import {
  Dispatch,
  useState,
  createContext,
  SetStateAction,
  PropsWithChildren,
  useEffect
} from 'react';

type DesignerContextProps = {
  profileImg: File | null;
  setProfileImg: Dispatch<SetStateAction<File | null>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  bio: string;
  setBio: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  socialLinks: SocialMediaDataContext;
  setSocialLinks: Dispatch<SetStateAction<SocialMediaDataContext>>;
  adhocLinks: AdhocLinks[];
  setAdhocLinks: Dispatch<SetStateAction<AdhocLinks[]>>;
};

export const DesignerContext = createContext<DesignerContextProps | null>(null);

const DesignerContextProvider = ({ children }: PropsWithChildren) => {
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [adhocLinks, setAdhocLinks] = useState<AdhocLinks[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialMediaDataContext>({});

  const { data, isLoading: loadingProfile } = api.userProfile.getUserCompleteProfile.useQuery();

  useEffect(() => {
    console.log('🚀 ~ DesignerContextProvider ~ data:', data);
    if (
      data &&
      data.userProfile &&
      data.socialLink &&
      data.socialLink.data &&
      data.adhocLink &&
      data.adhocLink
    ) {
      setTitle(data.userProfile.title || '');
      setBio(data.userProfile.bio || '');
      setSocialLinks(data.socialLink.data as {});
      setAdhocLinks(data.adhocLink);
    }
  }, [data]);

  console.log(adhocLinks);

  useEffect(() => {
    setIsLoading(loadingProfile);
  }, [loadingProfile]);

  return (
    <DesignerContext.Provider
      value={{
        profileImg,
        setProfileImg,
        title,
        setTitle,
        bio,
        setBio,
        loading,
        setIsLoading,
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

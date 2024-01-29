'use client';

import Error from '@/components/error';
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
  const [loading, setIsLoading] = useState(true);
  const [adhocLinks, setAdhocLinks] = useState<AdhocLinks[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialMediaDataContext>({});

  const {
    data,
    isFetching: fetchingProfile,
    isSuccess,
    isError,
    error
  } = api.userProfile.getUserCompleteProfile.useQuery();

  useEffect(() => {
    if (data && data.userProfile) {
      setTitle(data.userProfile.title || '');
      setBio(data.userProfile.bio || '');
    }
    if (data && data.socialLink && data.socialLink.data) {
      setSocialLinks(data.socialLink.data as SocialMediaDataContext);
    }
    if (data && data.adhocLink && data.adhocLink.data) {
      setAdhocLinks(data.adhocLink.data as AdhocLinks[]);
    }
  }, [isSuccess]);

  useEffect(() => {
    setIsLoading(fetchingProfile);
  }, [fetchingProfile]);

  if (isError) return <Error error={error?.message} />;

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

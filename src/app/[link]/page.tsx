import { Suspense } from 'react';
import { api } from '@/trpc/react';
import Skeleton from 'react-loading-skeleton';
import { getUserByUsername } from '@/server/api/utils/user';
import Webpage from './_components/WebPage';

type Props = {
  params: {
    link: string;
  };
};

export default async function Page({ params }: Props) {
  const { link } = params;
  //   const { data } = await api.user.getUserByLink.useSuspenseQuery({ username: link });
  const data = await getUserByUsername(link, true, true, true);
  //   console.log({ data }, data.adhocLink.data);
  if (!data) {
    return <h2>fdsf</h2>;
  }
  return (
    <div className='h-screen w-full'>
      <Webpage
        title={data.userProfile.title}
        bio={data?.userProfile?.bio}
        socialLinks={data?.socialLink.data}
        adhocLinks={data?.adhocLink.data}
      />
    </div>
  );
}

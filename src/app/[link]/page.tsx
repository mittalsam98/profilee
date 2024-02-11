import { getUserByUsername } from '@/server/api/utils/user';
import Webpage from './_components/WebPage';

type Props = {
  params: {
    link: string;
  };
};

export default async function Page({ params }: Props) {
  const { link } = params;
  const data = await getUserByUsername(link, true, true, true);
  if (!data) {
    return <h2>fdsf</h2>;
  }
  return (
    <div className='h-screen w-full'>
      <Webpage
        title={data.userProfile.title}
        bio={data?.userProfile?.bio}
        profileImg={data?.userProfile?.pic}
        socialLinks={data?.socialLink.data}
        adhocLinks={data?.adhocLink.data}
      />
    </div>
  );
}

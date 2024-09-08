import { getUserByUsername } from '@/server/api/utils/user';
import Webpage from './_components/WebPage';
import Error from '@/components/error';
import { JsonArray } from '@prisma/client/runtime/library';

type Props = {
  params: {
    link: string;
  };
};

export default async function Page({ params }: Props) {
  const { link } = params;
  const data = await getUserByUsername(link, true, true, true, true);

  if (!data) {
    return <Error error={' Page you are looking for does not exists'} />;
  }
  const adhocLinks = data.adhocLink?.data as JsonArray;

  return (
    <div className='h-screen w-full flex justify-center relative'>
      <div className='wavy-background absolute h-screen w-full'> </div>
      <Webpage
        userId={data?.id ?? ''}
        socialLinks={data?.socialLink?.data}
        adhocLinks={adhocLinks}
        userProfile={data.userProfile}
        generalAppearance={data.generalAppearance}
      />
    </div>
  );
}

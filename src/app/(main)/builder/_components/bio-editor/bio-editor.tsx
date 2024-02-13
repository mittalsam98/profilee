import useDesigner from '@/hooks/use-designer';
import Skeleton from 'react-loading-skeleton';
import AdhocLinks from '../elements/adhoc-links';
import ProfileSection from '../elements/profile-section';
import SocialIconsSection from '../elements/social-icons-section';

export default function BioEditor() {
  const { loading } = useDesigner();
  return (
    <aside className='border-r-2 fixed bottom-0 z-50 overflow-auto h-[260px] w-full lg:static lg:flex-1 flex lg:h-full flex-col bg-slate-50 p-4 border-y-2 border-slate-300 lg:border-none'>
      {loading ? (
        <>
          <Skeleton className='mb-3' height={70} />
          <Skeleton className='mb-12' height={100} />
          <Skeleton height={300} />
        </>
      ) : (
        <>
          <ProfileSection />
          <SocialIconsSection />
          <AdhocLinks />
        </>
      )}
    </aside>
  );
}

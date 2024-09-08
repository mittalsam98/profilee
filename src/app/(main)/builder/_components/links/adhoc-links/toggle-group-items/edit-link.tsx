import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { api } from '@/trpc/react';

interface PropsTypes {
  adhocLinkId: string;
}

export default function EditLink({ adhocLinkId }: PropsTypes) {
  const { data, isFetching, isSuccess, isError, error } = api.adHocLink.getLinkAnalytics.useQuery({
    adhocLinkId: adhocLinkId
  });
  return isFetching ? (
    <LoadingSpinner />
  ) : (
    <div className='p-4'>
      <div className='flex items-center justify-between'>
        <p className='text-xs font-medium'>Total Views</p>
      </div>
      <p className='text-md font-extrabold mt-2'>{data?.count}</p>
    </div>
  );
}

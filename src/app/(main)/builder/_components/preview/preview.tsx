'use client';

import useDesigner from '@/hooks/use-designer';
import { cn } from '@/lib/utils';
import { preview } from '@/types/types';
import { Laptop2, Smartphone } from 'lucide-react';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Webpage from './webpage';

export default function Preview() {
  const [previewMode, setPreviewMode] = useState<preview>('mobile');
  const { loading } = useDesigner();

  return (
    <div className='p-1 lg:flex-1 lg:py-5 lg:px-8'>
      <div className='flex flex-col h-full border-[1px] rounded-lg border-slate-300 bg-white'>
        <div className='flex h-8 w-full p-6  bg-slate-100 rounded-lg  justify-between items-center'>
          <div className='flex space-x-2'>
            <div className='h-3 w-3 rounded-full bg-red-500'></div>
            <div className='h-3 w-3 rounded-full bg-amber-500'></div>
            <div className='h-3 w-3 rounded-full bg-emerald-500'></div>
          </div>
          <div className='flex'>
            <Smartphone
              onClick={() => setPreviewMode('mobile')}
              className={cn(
                `h-9 w-9 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg`,
                previewMode === 'mobile' ? 'text-gray-800 bg-gray-200' : ''
              )}
            />
            <Laptop2
              onClick={() => setPreviewMode('desktop')}
              className={cn(
                `h-9 w-9 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg`,
                previewMode === 'desktop' ? 'text-gray-800 bg-gray-200' : ''
              )}
            />
          </div>
        </div>

        <div className='flex items-center justify-center h-full flex-1 flex-grow p-2 text-center'>
          {previewMode === 'mobile' && (
            <div className='relative h-[90%] max-h-[40rem] w-80 overflow-hidden rounded-[3rem] border-8 border-slate-500 bg-slate-400'>
              <div className='absolute left-1/2 right-1/2 top-2 z-20 h-4 w-1/3 -translate-x-1/2 transform rounded-md bg-slate-500'></div>

              <ViewWrapper loading={loading} />
            </div>
          )}
          {previewMode === 'desktop' && (
            <div className='relative h-[70%] w-full overflow-hidden rounded-[2rem] border-8 border-slate-500 bg-slate-400'>
              <ViewWrapper loading={loading} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ViewWrapper = ({ loading }: { loading: boolean; mode?: string }) => {
  if (loading) {
    return (
      <>
        <div className='absolute z-20 h-full w-full flex items-center justify-center'>
          <div className='animate-spin'>
            <span className='text-3xl'>🌀</span>
          </div>
        </div>
        <Skeleton className='h-full' />
      </>
    );
  }

  return (
    <div className='absolute top-0 z-10 flex h-full w-full flex-grow flex-col overflow-y-auto'>
      <div className='flex w-full flex-grow flex-col items-center  bg-white py-6'>
        <div className='w-full max-w-md h-full'>
          <Webpage />
        </div>
      </div>
    </div>
  );
};

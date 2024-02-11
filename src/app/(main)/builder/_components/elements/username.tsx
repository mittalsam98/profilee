import { Card } from '@/components/ui/card';
import useDesigner from '@/hooks/use-designer';
import { cn } from '@/lib/utils';
import { UsernameSchema } from '@/server/api/schemas';
import { api } from '@/trpc/react';
import { TRPCClientError } from '@trpc/client';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { ImNewTab } from 'react-icons/im';
import { toast } from 'sonner';
import { z } from 'zod';

const UsernameSettings = () => {
  const { username, setUsername, setIsPublishing } = useDesigner();
  const [usernameError, setUsernameError] = useState(false);
  const origin = typeof window !== 'undefined' ? window.location.origin + '/' : '';
  const utils = api.useUtils();

  const { isLoading, mutateAsync: updateUsername } = api.user.createUpdateUsername.useMutation({
    onSuccess: () => {
      setUsernameError(false);
    },
    onError: (error) => {
      if (error instanceof TRPCClientError) {
        if (error.message) {
          // utils.userProfile.getUserCompleteProfile.invalidate();
          toast.error(error.message);
          setUsernameError(true);
        }
      }
    }
  });

  useEffect(() => {
    setIsPublishing(isLoading);
  }, [isLoading]);

  const updatingUsername = (value: z.infer<typeof UsernameSchema>) => {
    updateUsername(value);
  };

  const debouncedInputHandler = useCallback(debounce(updatingUsername, 700), []);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 0) {
      setUsername(value);
      debouncedInputHandler({ username: value });
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
  };

  return (
    <Card className='my-2 border-neutral-200 bg-slate-50 '>
      <div className='flex  justify-center items-center h-12 pr-2'>
        <div className='flex flex-row justify-center items-center w-full h-full'>
          <div className='px-2'>{origin}</div>
          <input
            className={cn(
              `flex flex-row justify-center px-2 bg-white w-full h-full outline-none border`,
              isLoading ? 'bg-slate-50 cursor-progress	' : '',
              usernameError ? 'border-2 border-red-500' : ''
            )}
            defaultValue={username}
            onChange={inputHandler}
          />
        </div>
        <div className='flex'>
          <Link
            target='_blank'
            className='rounded-lg border border-neutral-400 p-1 ml-2 hover:border-neutral-500'
            href={`/${username}`}
          >
            <ImNewTab className='h-6 w-6' />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default UsernameSettings;

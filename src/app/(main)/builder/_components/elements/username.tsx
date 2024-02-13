import { Input } from '@/components/ui/input';
import useDesigner from '@/hooks/use-designer';
import { cn } from '@/lib/utils';
import { UsernameSchema } from '@/server/api/schemas';
import { api } from '@/trpc/react';
import { TRPCClientError } from '@trpc/client';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { MdOpenInNew } from 'react-icons/md';
import { LuCopy } from 'react-icons/lu';

const UsernameSettings = () => {
  const { username, setUsername, setIsPublishing, loading } = useDesigner();
  const [usernameError, setUsernameError] = useState('');
  const origin = typeof window !== 'undefined' ? window.location.origin + '/' : '';
  const utils = api.useUtils();

  const { isLoading, mutateAsync: updateUsername } = api.user.createUpdateUsername.useMutation({
    onSuccess: (res) => {
      setUsernameError('');
      setUsername(res.message ?? username);
    },
    onError: (error) => {
      if (error instanceof TRPCClientError) {
        if (error.message) {
          toast.error(error.message);
          setUsernameError(error.message);
        }
      }
    }
  });

  useEffect(() => {
    setIsPublishing(isLoading);
  }, [isLoading]);

  const updatingUsername = async (value: z.infer<typeof UsernameSchema>) => {
    await updateUsername(value);
  };

  const debouncedInputHandler = useCallback(debounce(updatingUsername, 700), []);

  const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const parsedUsername = UsernameSchema.safeParse({ username: value });

    if (!parsedUsername.success) {
      setUsernameError(
        parsedUsername.error.format().username?._errors[0] ?? 'Not a valid username'
      );
      return;
    }
    if (value.length > 0) {
      setUsername(value);
      if (value.trim() !== username.trim()) {
        await debouncedInputHandler({ username: value });
      }
      setUsernameError('');
    } else {
      setUsernameError('Username is required');
    }
  };

  return (
    <div className='flex justify-center h-8 pr-2'>
      <div className='flex flex-row justify-center items-center w-full '>
        <div>
          <Input
            className={cn(
              `flex flex-row justify-center px-2 bg-white w-full h-full outline-none border`,
              isLoading ? 'bg-slate-50 cursor-progress	' : '',
              usernameError ? 'focus:outline-none border-2 border-red-500' : ''
            )}
            disabled={isLoading}
            defaultValue={username}
            onChange={inputHandler}
          />{' '}
          {usernameError && (
            <p className={'text-xs mt-1 font-medium text-destructive'}>{usernameError}</p>
          )}
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(`${origin}/${username}`);
            toast.success('URL copied to clipboard!');
          }}
          className='p-1 ml-2 cursor-pointer hover:border-neutral-500'
        >
          <LuCopy className='text-slate-400 h-4 w-4' />
        </div>
        <Link target='_blank' className='p-1  hover:border-neutral-500' href={`/${username}`}>
          <MdOpenInNew className='text-slate-400 h-4 w-4' />{' '}
        </Link>
      </div>
    </div>
  );
};

export default UsernameSettings;

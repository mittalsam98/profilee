'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaExclamationTriangle } from 'react-icons/fa';
import * as z from 'zod';

import { AuthPagesWrapper } from '@/components/auth/auth-pages-wrapper';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UsernameSchema } from '@/server/api/schemas';
import { api } from '@/trpc/react';
import { TRPCClientError } from '@trpc/client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

export default function ClaimUsername() {
  const [error, setError] = useState<string | undefined>('');
  const router = useRouter();
  const form = useForm<z.infer<typeof UsernameSchema>>({
    resolver: zodResolver(UsernameSchema),
    defaultValues: {
      username: ''
    }
  });
  const { isLoading, mutateAsync: addUsername } = api.user.createUpdateUsername.useMutation({
    onError: (error) => {
      if (error instanceof TRPCClientError) {
        if (error.message) {
          setError(error.message);
        }
      }
    },
    onSuccess: async (data) => {
      console.log(data);
      if (data.success) {
        // TODO : Need to update this one
        await signIn('jwt', {
          redirect: false
        });
        router.push('/builder');
      }
    }
  });

  const onSubmit = async (values: z.infer<typeof UsernameSchema>) => {
    setError('');
    await addUsername(values);
  };
  return (
    <AuthPagesWrapper pageTitle='Claim your username!' flow='newuser'>
      <Form {...form}>
        {error && (
          <Alert variant='destructive'>
            <FaExclamationTriangle />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[15px]'>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='h-11'
                      placeholder='Your username'
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription className='italic'>
                    This will be your unique profile url.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading} type='submit' className='w-full'>
            Claim Now <FaRegArrowAltCircleRight className='ml-4 text-2xl' />
          </Button>
        </form>
      </Form>
    </AuthPagesWrapper>
  );
}

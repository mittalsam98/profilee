'use client';
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaExclamationTriangle } from 'react-icons/fa';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { AuthPagesWrapper } from '@/components/auth/auth-pages-wrapper';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { UsernameSchema } from '@/server/api/schemas';
import { TRPCClientError } from '@trpc/client';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';

export default function page() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const router = useRouter();
  const form = useForm<z.infer<typeof UsernameSchema>>({
    resolver: zodResolver(UsernameSchema),
    defaultValues: {
      username: ''
    }
  });
  const { isLoading, mutateAsync: addUsername } = api.user.createUsername.useMutation({
    onError: (error) => {
      if (error instanceof TRPCClientError) {
        if (error.message) {
          setError(error.message);
        }
      }
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        router.push('/builder');
        window.location.reload();
      }
    }
  });

  const onSubmit = async (values: z.infer<typeof UsernameSchema>) => {
    setError('');
    setSuccess('');
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

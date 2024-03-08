'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaExclamationTriangle } from 'react-icons/fa';
import * as z from 'zod';

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
import { RegisterSchema } from '@/server/api/schemas';
import { api } from '@/trpc/react';
import { TRPCClientError } from '@trpc/client';
import { Alert, AlertTitle } from '../ui/alert';
import { AuthPagesWrapper } from './auth-pages-wrapper';

export function CreateAccountCard() {
  const [error, setError] = useState<string | undefined>('');

  const { isLoading, mutateAsync: createUser } = api.user.createUser.useMutation({
    onError: (error) => {
      if (error instanceof TRPCClientError) {
        if (error.message) {
          setError(error.message);
        }
      }
    }
  });

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      username: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    await createUser(values);
  };

  return (
    <AuthPagesWrapper
      pageTitle='Create an account'
      pageSubTitle='Enter your email and username below to create an account'
      flow='signup'
    >
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
                      disabled={isLoading}
                      className='h-11'
                      placeholder='Your name'
                    />
                  </FormControl>
                  <FormDescription className='italic'>
                    This will be your unique profile url.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[15px]'>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder='your.email@example.com'
                      className='h-11'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[15px]'>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder='******'
                      className='h-11'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading} type='submit' variant={'outline'} className='w-full'>
            Create an account
          </Button>
        </form>
      </Form>
    </AuthPagesWrapper>
  );
}

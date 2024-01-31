'use client';
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaExclamationTriangle } from 'react-icons/fa';

import { AuthPagesWrapper } from './auth-pages-wrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RegisterSchema } from '@/server/api/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { api } from '@/trpc/react';
import { TRPCClientError } from '@trpc/client';
import { Alert, AlertTitle } from '../ui/alert';

export function CreateAccountCard() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

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
    setSuccess('');
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

          <Button disabled={isLoading} type='submit' className='w-full'>
            Create an account
          </Button>
        </form>
      </Form>
    </AuthPagesWrapper>
  );
}

'use client';
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaExclamationTriangle } from 'react-icons/fa';

import { AuthPagesWrapper } from '@/components/auth/auth-pages-wrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoginSchema } from '@/server/api/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { signIn } from 'next-auth/react';
import { Alert, AlertTitle } from '../ui/alert';
import { useSearchParams } from 'next/navigation';
export default function LoginAccountCard() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotFound'
      ? 'User not found with this email! Please create account first'
      : '';
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    startTransition(async () => {
      const response = await signIn('credentials', {
        ...values,
        redirect: false
      });

      if (response?.error) {
        setError(response.error);
      }
    });
  };
  return (
    <AuthPagesWrapper pageTitle='Sign in to Profilee' flow='signin'>
      {error && (
        <Alert variant='destructive'>
          <FaExclamationTriangle />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      {urlError && (
        <Alert variant='destructive'>
          <FaExclamationTriangle />
          <AlertTitle>{urlError}</AlertTitle>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[15px]'>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
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
                      disabled={isPending}
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

          <Button disabled={isPending} type='submit' className='w-full'>
            Sign in
          </Button>
        </form>
      </Form>
    </AuthPagesWrapper>
  );
}

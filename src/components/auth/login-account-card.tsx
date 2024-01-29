import React from 'react';
import { AuthPagesWrapper } from './auth-pages-wrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function LoginAccountCard() {
  return (
    <AuthPagesWrapper pageTitle='Sign in to Profilee' flow='signin'>
      <div className='grid gap-2'>
        <Label>Email</Label>
        <Input id='email' type='email' placeholder='m@example.com' />
      </div>
      <div className='grid gap-2'>
        <Label>Password</Label>
        <Input id='password' type='password' />
      </div>{' '}
      <Button>{'Sign In'} </Button>
    </AuthPagesWrapper>
  );
}

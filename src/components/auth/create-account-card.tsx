'use client';

import { AuthPagesWrapper } from './auth-pages-wrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function CreateAccountCard() {
  return (
    <AuthPagesWrapper
      pageTitle='Create an account'
      pageSubTitle='Enter your email and username below to create an account'
      flow='signup'
    >
      <div className='grid gap-2'>
        <Label>UserName</Label>
        <Input id='email' type='email' placeholder='m@example.com' />
      </div>
      <div className='grid gap-2'>
        <Label>Email</Label>
        <Input id='email' type='email' placeholder='m@example.com' />
      </div>
      <div className='grid gap-2'>
        <Label>Password</Label>
        <Input id='password' type='password' />
      </div>
      <Button>{'Create'}</Button>
    </AuthPagesWrapper>
  );
}

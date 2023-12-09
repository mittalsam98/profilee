'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function SocialLinkDialog({
  children,
  name
}: {
  name: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const [input, setInput] = useState('');
  console.log('hhd');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {name} link</DialogTitle>
        </DialogHeader>

        <form className='space-y-4' onSubmit={(e) => {}}>
          <Input
            type='url'
            placeholder='Enter link'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className='flex gap-x-4'>
            <Button type='submit' disabled={!input} className='w-full'>
              Add
            </Button>

            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              className='w-full'
            >
              Close
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

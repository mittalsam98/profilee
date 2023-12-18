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
import useDesigner from '@/hooks/use-designer';

// Dialog for edit and add social link
export default function SocialLinkDialog({
  children,
  name,
  value
}: {
  name: string;
  value?: string;
  children: React.ReactNode;
}) {
  const { setSocialLinks } = useDesigner();
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState(value || '');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {name} link</DialogTitle>
        </DialogHeader>

        <Input
          type='url'
          placeholder='Enter link'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className='flex gap-x-4'>
          <Button
            type='button'
            onClick={() => {
              setSocialLinks((prevState) => {
                return { ...prevState, [name]: input };
              });
              setOpen(false);
            }}
            disabled={!input}
            className='w-full'
          >
            Add
          </Button>

          <Button type='button' variant='outline' onClick={() => setOpen(false)} className='w-full'>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

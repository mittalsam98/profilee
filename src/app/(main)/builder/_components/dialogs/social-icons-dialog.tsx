'use client';

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
import { Dispatch, SetStateAction, useState } from 'react';

// Dialog for edit and add social link
export default function SocialLinkDialog({
  children,
  name,
  value,
  triggerPopover
}: {
  name: string;
  value?: string;
  children: React.ReactNode;
  triggerPopover?: Dispatch<SetStateAction<boolean>>;
}) {
  const { dispatch, state } = useDesigner();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(value ?? '');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {value ? 'Edit' : 'Add'} {name} link
          </DialogTitle>
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
              dispatch({
                type: 'UPDATE_SOCIAL_LINK',
                payload: { ...state.socialLinks, [name]: input }
              });
              setOpen(false);
              if (triggerPopover) triggerPopover(false);
            }}
            disabled={!input}
            className='w-full'
          >
            {value ? 'Edit' : 'Add'}
          </Button>

          <Button type='button' variant='outline' onClick={() => setOpen(false)} className='w-full'>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { Dispatch, SetStateAction, useState } from 'react';
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
import { v4 as uuidv4 } from 'uuid';
import { AdhocLinks } from '@/types/types';

// Dialog for edit and add Adhoc Link
export default function AdhocLinksDialog({
  open,
  setOpen,
  data
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: AdhocLinks;
}) {
  const { setAdhocLinks } = useDesigner();

  const [inputTitle, setInputTitle] = useState(data?.name || '');
  const [inputLink, setInputLink] = useState(data?.link || '');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {data ? 'Edit ' : 'Add '}
            link
          </DialogTitle>
        </DialogHeader>

        <Input
          type='text'
          placeholder='Enter link title'
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <Input
          type='url'
          placeholder='Enter url'
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
        />

        <div className='flex gap-x-4'>
          <Button
            type='button'
            onClick={() => {
              setAdhocLinks((prevState) => {
                const prevStateCopy = [...prevState];
                const updatedAdhocLink = {
                  name: inputTitle,
                  id: uuidv4(),
                  link: inputLink,
                  isActive: true
                };
                if (data) {
                  const editIndex = prevState.findIndex((val) => val.id == data.id);
                  prevStateCopy[editIndex] = updatedAdhocLink;
                  return prevStateCopy;
                } else {
                  return [...prevStateCopy, updatedAdhocLink];
                }
              });
              setOpen(false);
            }}
            disabled={!inputLink || !inputTitle}
            className='w-full'
          >
            {data ? 'Edit' : 'Add'}
          </Button>

          <Button type='button' variant='outline' onClick={() => setOpen(false)} className='w-full'>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

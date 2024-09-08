'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useDesigner from '@/hooks/use-designer';
import { AdhocLinks, BorderRadius, TextAlign } from '@/types/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
  const { dispatch, state } = useDesigner();
  const [inputTitle, setInputTitle] = useState(data?.name ?? '');
  const [inputLink, setInputLink] = useState(data?.link ?? '');

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
              const editIndex =
                data && data.id ? state.adhocLinks.findIndex((val) => val.id === data.id) : -1;
              const prevStateCopy = [...state.adhocLinks];

              const updatedAdhocLink: AdhocLinks = {
                name: inputTitle,
                id: uuidv4(),
                link: inputLink,
                isActive: true,
                clicks: 0,
                theme: {
                  textAlign: TextAlign.CENTER,
                  backgroundColor: '#fff',
                  textColor: '#000',
                  borderColor: '',
                  borderRadius: BorderRadius.SM
                }
              };

              if (editIndex !== -1) {
                prevStateCopy[editIndex] = updatedAdhocLink;
                dispatch({
                  type: 'UPDATE_ADHOC_LINK',
                  payload: prevStateCopy
                });
              } else {
                dispatch({
                  type: 'UPDATE_ADHOC_LINK',
                  payload: [...prevStateCopy, updatedAdhocLink]
                });
              }

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

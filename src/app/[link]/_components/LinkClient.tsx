// components/WebpageClient.tsx
'use client';

import Link from 'next/link';
import { AdhocLinks } from '@/types/types';
import { api } from '@/trpc/react';
import { EventType } from '@prisma/client';

interface PropsTypes {
  adhocLinks?: AdhocLinks[];
  userId: string;
}

export default function LinkClient({ adhocLinks = [], userId }: PropsTypes) {
  const { mutateAsync: updateLinkInteraction } = api.adHocLink.adhocLinkInteraction.useMutation();

  const adhocLinkHandler = async (id: string) => {
    await updateLinkInteraction({ userId: userId, adhocLinkId: id, eventType: EventType.CLICK });
  };

  return (
    <div className='mx-auto'>
      {adhocLinks.map((link) =>
        link.isActive ? (
          <div key={link.id} className='pt-6 text-center space-y-4'>
            <Link
              href={link.link}
              target='_blank'
              onClick={() => adhocLinkHandler(link.id)}
              style={{
                background: link.theme.backgroundColor || '',
                color: link.theme.textColor || '',
                borderColor: link.theme.borderColor || ''
              }}
              className='flex items-center rounded-lg border px-5 py-4 text-lg leading-6 font-medium shadow-md hover:shadow-xl transition ease-in-out duration-150'
            >
              {link.name}
            </Link>
          </div>
        ) : null
      )}
    </div>
  );
}

import { Card, CardTitle } from '@/components/ui/card';
import React from 'react';

import SocialIconsPopover from '../popovers/social-icons-popover';

export default function SocialIconsSection() {
  return (
    <Card className='p-4'>
      <CardTitle className='flex text-xl'>
        Social Icons
        <SocialIconsPopover />
      </CardTitle>
    </Card>
  );
}

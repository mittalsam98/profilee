import { Card, CardTitle } from '@/components/ui/card';
import React from 'react';

import SocialIconsPopover from '../popovers/social-icons-popover';
import useDesigner from '@/hooks/use-designer';
import SocialIcon from './social-icon';

export default function SocialIconsSection() {
  const { links } = useDesigner();
  return (
    <Card className='p-4'>
      <CardTitle className='flex text-xl'>
        Social Icons
        <SocialIconsPopover />
      </CardTitle>
      {Object.entries(links).length > 0 && (
        <div className='flex gap-4 flex-wrap mt-3 ml-2'>
          {Object.entries(links).map(([platform, value]) => (
            <SocialIcon data={platform} key={platform} value={value} />
          ))}
        </div>
      )}
    </Card>
  );
}

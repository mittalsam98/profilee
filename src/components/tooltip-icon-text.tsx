import { ReactNode, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ToolTipForTextAndIcon = ({
  children,
  text,
  onClick
}: {
  children: ReactNode;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipForTextAndIcon;

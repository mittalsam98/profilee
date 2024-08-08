import { ReactNode, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ToolTipForTextAndIcon = ({
  children,
  text,
  onClick
}: {
  children: ReactNode;
  text: String;
  onClick?: () => {};
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

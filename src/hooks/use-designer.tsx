'use client';

import { DesignerContext } from '@/components/context/designer-context';
import { useContext } from 'react';

function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error('useDesigner must be used within a DesignerContext');
  }

  return context;
}

export default useDesigner;

import React from 'react';
import { ElementsType, PageElement } from '../page-elements';
import { Youtube } from 'lucide-react';

const type: ElementsType = 'Youtube';

export const YoutubeLinkElement: PageElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: 'String'
    }
  }),
  designerBtnElement: {
    icon: Youtube,
    label: 'Youtube'
  },
  designerComponent: () => <div>fdsaf</div>,
  formComponent: () => <div>fdsaf</div>,
  propertiesComponent: () => <div>fdsaf</div>
};

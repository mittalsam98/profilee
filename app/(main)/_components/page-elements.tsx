import { YoutubeLinkElement } from './elements/youtube';

export type ElementsType = 'Youtube';

export type PageElement = {
  type: ElementsType;

  construct: (id: string) => PageElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC;
  formComponent: React.FC;

  propertiesComponent: React.FC;
};

export type PageElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};
export const PageElements = {
  Youtube: YoutubeLinkElement
};

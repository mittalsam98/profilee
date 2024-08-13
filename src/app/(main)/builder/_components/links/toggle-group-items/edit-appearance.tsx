import { GradientPicker } from '@/components/gradient-color-picker';
import useDesigner from '@/hooks/use-designer';
import { AdhocLinks } from '@/types/types';
import React from 'react';

interface EditAppearanceProps {
  data: AdhocLinks;
}

const EditAppearance: React.FC<EditAppearanceProps> = ({ data }) => {
  const { state, dispatch } = useDesigner();

  // Update theme property directly
  const updateThemeProperty = (
    property: 'backgroundColor' | 'textColor' | 'borderColor',
    color: string
  ) => {
    const editIndex = state.adhocLinks.findIndex((val) => val.id === data.id);

    const updatedLinks = [...state.adhocLinks];

    if (updatedLinks[editIndex]) {
      updatedLinks[editIndex] = {
        ...updatedLinks[editIndex],
        theme: {
          ...updatedLinks[editIndex].theme,
          [property]: color
        }
      };

      dispatch({
        type: 'UPDATE_ADHOC_LINK',
        payload: updatedLinks
      });
    }
  };

  const handleBackgroundColorChange = React.useCallback(
    (color: string) => {
      updateThemeProperty('backgroundColor', color);
    },
    [updateThemeProperty]
  );

  const handleTextColorChange = React.useCallback(
    (color: string) => {
      updateThemeProperty('textColor', color);
    },
    [updateThemeProperty]
  );

  const handleBorderColorChange = React.useCallback(
    (color: string) => {
      updateThemeProperty('borderColor', color);
    },
    [updateThemeProperty]
  );

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex gap-4 items-center'>
        <label className='w-40'>Background Color</label>
        <GradientPicker
          background={data.theme?.backgroundColor || '#ffffff'} // Provide a default color if not available
          showImageGradient={true}
          showGradientPicker={true}
          setBackground={handleBackgroundColorChange}
        />
      </div>
      <div className='flex gap-4 items-center'>
        <label className='w-40'>Text Color</label>
        <GradientPicker
          background={data.theme?.textColor || '#000000'} // Provide a default color if not available
          setBackground={handleTextColorChange}
        />
      </div>
      <div className='flex gap-4 items-center'>
        <label className='w-40'>Border Color</label>
        <GradientPicker
          background={data.theme?.borderColor || '#cccccc'} // Provide a default color if not available
          setBackground={handleBorderColorChange}
        />
      </div>
    </div>
  );
};

export default EditAppearance;

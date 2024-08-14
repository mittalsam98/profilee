import { GradientPicker } from '@/components/gradient-color-picker';
import { Card } from '@/components/ui/card';
import useDesigner from '@/hooks/use-designer';
import React from 'react';

interface EditBioTitleProps {
  title: 'TITLE' | 'BIO';
  background: string;
}

const EditBioTitle: React.FC<EditBioTitleProps> = ({ title, background }: EditBioTitleProps) => {
  const { state, dispatch } = useDesigner();

  const handleChangeColor = (color: string) => {
    dispatch({
      type: title === 'TITLE' ? 'UPDATE_TITLE_COLOR' : 'UPDATE_BIO_COLOR',
      payload: color
    });
  };
  const handleChangeFontSize = (color: string) => {
    dispatch({
      type: title === 'TITLE' ? 'UPDATE_TITLE_FONT_SIZE' : 'UPDATE_BIO_FONT_SIZE',
      payload: color
    });
  };

  return (
    <Card className='my-4'>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex gap-4 items-center'>
          <label className='w-40'>{title === 'TITLE' ? 'Title' : 'Bio'} font color</label>
          <GradientPicker
            background={background} // Provide a default color if not available
            setBackground={handleChangeColor}
          />
        </div>
        <div className='flex gap-4 items-center'>
          <label className='w-40'>{title === 'TITLE' ? 'Title' : 'Bio'} font size</label>
          <GradientPicker
            background={'#000000'} // Provide a default color if not available
            setBackground={handleChangeFontSize}
          />
        </div>
      </div>{' '}
    </Card>
  );
};

export default EditBioTitle;

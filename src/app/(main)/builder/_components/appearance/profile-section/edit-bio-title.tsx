import { GradientPicker } from '@/components/gradient-color-picker';
import { Card } from '@/components/ui/card';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select';
import useDesigner from '@/hooks/use-designer';
import React from 'react';

interface EditBioTitleProps {
  title: 'TITLE' | 'BIO';
  background: string;
}

const EditBioTitle: React.FC<EditBioTitleProps> = ({ title, background }: EditBioTitleProps) => {
  const { dispatch } = useDesigner();

  const handleChangeColor = (color: string) => {
    dispatch({
      type: title === 'TITLE' ? 'UPDATE_TITLE_COLOR' : 'UPDATE_BIO_COLOR',
      payload: color
    });
  };
  const handleChangeFontSize = (value: string) => {
    dispatch({
      type: title === 'TITLE' ? 'UPDATE_TITLE_FONT_SIZE' : 'UPDATE_BIO_FONT_SIZE',
      payload: value
    });
  };

  return (
    <Card className='my-4 w-1/2'>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex gap-4 items-center'>
          <label className='w-40'>{title === 'TITLE' ? 'Title' : 'Bio'} font color</label>
          <GradientPicker
            background={background} // Provide a default color if not available
            setBackground={handleChangeColor}
          />
        </div>
        {/* <div className='flex gap-4 items-center'>
          <label className='w-40'>{title === 'TITLE' ? 'Title' : 'Bio'} font size</label>

          <Select onValueChange={handleChangeFontSize}>
            <SelectTrigger className='w-[220px]'>
              <SelectValue placeholder='Select font size' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='small'>Small</SelectItem>
                <SelectItem value='medium'>Medium</SelectItem>
                <SelectItem value='large'>Large</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div> */}
      </div>{' '}
    </Card>
  );
};

export default EditBioTitle;

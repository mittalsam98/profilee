import FontPicker from '@/components/font-picker';
import { GradientPicker } from '@/components/gradient-color-picker';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import useDesigner from '@/hooks/use-designer';
import { Cog } from 'lucide-react';
import { MdOutlineExpandMore } from 'react-icons/md';

export default function GeneralSetting() {
  const { state, dispatch } = useDesigner();

  const handleChangeBackgroundColor = (color: string) => {
    dispatch({
      type: 'UPDATE_PRIMARY_BACKGROUND_COLOR',
      payload: color
    });
  };
  const handleChangeSecondaryBackgroundColor = (color: string) => {
    dispatch({
      type: 'UPDATE_SECONDARY_BACKGROUND_COLOR',
      payload: color
    });
  };

  return (
    <Card className='mb-6 '>
      <Collapsible>
        <CollapsibleTrigger className='flex w-full hover:bg-slate-50  hover:rounded-lg  cursor-pointer  items-center  justify-between p-4'>
          <p className='text-sm font-semibold flex items-center '>
            <Cog className='text-slate-400 text-2xl mr-2' /> General
          </p>
          <MdOutlineExpandMore className='text-slate-400 text-2xl' />
        </CollapsibleTrigger>
        <CollapsibleContent className='border-t '>
          <div className={'flex flex-col w-full gap-x-6 p-6 gap-y-6'}>
            <div className='flex gap-4 items-center'>
              <label className='w-60'>Primary background color</label>
              <GradientPicker
                background={state.generalAppearance.primaryBackgroundColor} // Provide a default color if not available
                showGradientPicker={true}
                setBackground={handleChangeBackgroundColor}
              />
            </div>
            <Separator />
            <div className='flex gap-4 items-center'>
              <label className='w-60'>Secondary Background</label>
              <Switch
                id='secondary-background'
                checked={state.generalAppearance.useSecondaryBackground}
                onCheckedChange={(e) => {
                  dispatch({
                    type: 'IS_SECONDARY_BACKGROUND',
                    payload: e
                  });
                }}
              />
            </div>
            {state.generalAppearance.useSecondaryBackground && (
              <>
                <div className='flex gap-4 items-center'>
                  <label className='w-60'>Secondary background color</label>
                  <GradientPicker
                    background={state.generalAppearance.secondaryBackgroundColor} // Provide a default color if not available
                    showGradientPicker={true}
                    showImageGradient={true}
                    setBackground={handleChangeSecondaryBackgroundColor}
                  />
                </div>
              </>
            )}
            <Separator />
            <div className='flex gap-4 items-center'>
              <label className='w-60'>Font Family</label>
              <FontPicker />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

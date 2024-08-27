import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import useDesigner from '@/hooks/use-designer';
import { fontsArray } from '@/lib/fonts';

export default function FontPicker() {
  const { state, dispatch } = useDesigner();

  return (
    <div className='flex flex-col justify-start items-start gap-2 w-full'>
      <Select
        value={state.generalAppearance.fontFamily}
        onValueChange={(value) =>
          dispatch({
            type: 'UPDATE_FONT_FAMILY',
            payload: value
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder='Select a font' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {fontsArray.map((font) => (
              <SelectItem
                key={font.family}
                value={font.family}
                className={font.instance?.className || ''}
              >
                {font.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

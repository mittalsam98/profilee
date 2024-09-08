'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Paintbrush } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';

type GradientPickerProps = {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
  showSolidPicker?: boolean;
  showGradientPicker?: boolean;
  showImageGradient?: boolean;
};

export function GradientPicker({
  background,
  setBackground,
  className,
  showSolidPicker = true,
  showGradientPicker = false,
  showImageGradient = false
}: GradientPickerProps) {
  const gradients = [
    'linear-gradient(to left top, rgb(9, 30, 58), rgb(47, 128, 237), rgb(45, 158, 224))',
    'linear-gradient(to left top, rgb(148, 0, 211), rgb(75, 0, 130))',
    'linear-gradient(to left top, rgb(200, 78, 137), rgb(241, 95, 121))',
    'linear-gradient(to left top, rgb(0, 245, 160), rgb(0, 217, 245))',
    'linear-gradient(to left top, rgb(247, 148, 30), rgb(114, 198, 239), rgb(0, 166, 81))',
    'linear-gradient(to left top, rgb(247, 148, 30), rgb(0, 78, 143))',
    'linear-gradient(to left top, rgb(114, 198, 239), rgb(0, 78, 143))',
    'linear-gradient(to left top, rgb(253, 129, 18), rgb(0, 133, 202))',
    'linear-gradient(to left top, rgb(191, 90, 224), rgb(168, 17, 218))',
    'linear-gradient(to left top, rgb(251, 237, 150), rgb(171, 236, 214))',
    'linear-gradient(to left top, rgb(255, 224, 0), rgb(121, 159, 12))',
    'linear-gradient(to left top, rgb(247, 248, 248), rgb(172, 187, 120))',
    'linear-gradient(to left top, rgb(0, 65, 106), rgb(121, 159, 12), rgb(255, 224, 0))',
    'linear-gradient(to left top, rgb(51, 77, 80), rgb(203, 202, 165))',
    'linear-gradient(to left top, rgb(0, 82, 212), rgb(67, 100, 247), rgb(111, 177, 252))',
    'linear-gradient(to left top, rgb(84, 51, 255), rgb(32, 189, 255), rgb(165, 254, 203))',
    'linear-gradient(to left top, rgb(121, 159, 12), rgb(172, 187, 120))',
    'linear-gradient(to left top, rgb(255, 226, 89), rgb(255, 167, 81))',
    'linear-gradient(to left top, rgb(172, 182, 229), rgb(134, 253, 232))',
    'linear-gradient(to left top, rgb(83, 105, 118), rgb(41, 46, 73))',
    'linear-gradient(to left top, rgb(183, 152, 145), rgb(148, 113, 107))',
    'linear-gradient(to left top, rgb(151, 150, 240), rgb(251, 199, 212))',
    'linear-gradient(to left top, rgb(187, 210, 197), rgb(83, 105, 118))',
    'linear-gradient(to left top, rgb(7, 101, 133), rgb(255, 255, 255))',
    'linear-gradient(to left top, rgb(0, 70, 127), rgb(165, 204, 130))',
    'linear-gradient(to left top, rgb(0, 12, 64), rgb(96, 125, 139))',
    'linear-gradient(to left top, rgb(20, 136, 204), rgb(43, 50, 178))',
    'linear-gradient(to left top, rgb(236, 0, 140), rgb(252, 103, 103))',
    'linear-gradient(to left top, rgb(204, 43, 94), rgb(117, 58, 136))',
    'linear-gradient(to left top, rgb(230, 92, 0), rgb(249, 212, 35))',
    'linear-gradient(to left top, rgb(43, 88, 118), rgb(78, 67, 118))',
    'linear-gradient(to left top, rgb(49, 71, 85), rgb(38, 160, 218))',
    'linear-gradient(to left top, rgb(119, 161, 211), rgb(121, 203, 202), rgb(230, 132, 174))',
    'linear-gradient(to left top, rgb(255, 110, 127), rgb(191, 233, 255))',
    'linear-gradient(to left top, rgb(229, 45, 39), rgb(179, 18, 23))',
    'linear-gradient(to left top, rgb(96, 56, 19), rgb(178, 159, 148))',
    'linear-gradient(to left top, rgb(22, 160, 133), rgb(244, 208, 63))',
    'linear-gradient(to left top, rgb(211, 16, 39), rgb(234, 56, 77))',
    'linear-gradient(to left top, rgb(237, 229, 116), rgb(225, 245, 196))',
    'linear-gradient(to left top, rgb(2, 170, 176), rgb(0, 205, 172))',
    'linear-gradient(to left top, rgb(218, 34, 255), rgb(151, 51, 238))',
    'linear-gradient(to left top, rgb(52, 143, 80), rgb(86, 180, 211))',
    'linear-gradient(to left top, rgb(60, 165, 92), rgb(181, 172, 73))',
    'linear-gradient(to left top, rgb(204, 149, 192), rgb(219, 212, 180), rgb(122, 161, 210))',
    'linear-gradient(to left top, rgb(0, 57, 115), rgb(229, 229, 190))',
    'linear-gradient(to left top, rgb(229, 93, 135), rgb(95, 195, 228))',
    'linear-gradient(to left top, rgb(64, 59, 74), rgb(231, 233, 187))',
    'linear-gradient(to left top, rgb(240, 152, 25), rgb(237, 222, 93))',
    'linear-gradient(to left top, rgb(255, 81, 47), rgb(221, 36, 118))',
    'linear-gradient(to left top, rgb(170, 7, 107), rgb(97, 4, 95))',
    'linear-gradient(to left top, rgb(26, 41, 128), rgb(38, 208, 206))',
    'linear-gradient(to left top, rgb(255, 81, 47), rgb(240, 152, 25))',
    'linear-gradient(to left top, rgb(29, 43, 100), rgb(248, 205, 218))',
    'linear-gradient(to left top, rgb(31, 162, 255), rgb(18, 216, 250), rgb(166, 255, 203))',
    'linear-gradient(to left top, rgb(76, 184, 196), rgb(60, 211, 173))',
    'linear-gradient(to left top, rgb(221, 94, 137), rgb(247, 187, 151))',
    'linear-gradient(to left top, rgb(235, 51, 73), rgb(244, 92, 67))',
    'linear-gradient(to left top, rgb(29, 151, 108), rgb(147, 249, 185))',
    'linear-gradient(to left top, rgb(255, 128, 8), rgb(255, 200, 55))',
    'linear-gradient(to left top, rgb(22, 34, 42), rgb(58, 96, 115))',
    'linear-gradient(to left top, rgb(31, 28, 44), rgb(146, 141, 171))'
  ];

  //  Add links accordingly
  const images = [''];

  const defaultTab = useMemo(() => {
    if (background.includes('url')) return 'image';
    if (background.includes('gradient')) return 'gradient';
    return 'solid';
  }, [background]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={`w-[220px] justify-start text-left font-normal ${
            !background && 'text-muted-foreground'
          } ${className}
          `}
        >
          <div className='w-full flex items-center gap-2'>
            {background ? (
              <div
                className='h-4 w-4 rounded !bg-center !bg-cover transition-all'
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className='h-4 w-4' />
            )}
            <div className='truncate flex-1'>{background ? background : 'Pick a color'}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-64'>
        <Tabs defaultValue={defaultTab} className='w-full'>
          <TabsList className='w-full mb-4'>
            {showSolidPicker && (
              <TabsTrigger className='flex-1' value='solid'>
                Solid
              </TabsTrigger>
            )}
            {showGradientPicker && (
              <TabsTrigger className='flex-1' value='gradient'>
                Gradient
              </TabsTrigger>
            )}
            {showImageGradient && (
              <TabsTrigger className='flex-1' value='image'>
                Image
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value='solid' className='flex flex-wrap gap-1 mt-0'>
            <RgbaStringColorPicker
              color={background}
              onChange={(s) => {
                setBackground(s);
              }}
            />
          </TabsContent>

          <TabsContent value='gradient' className='mt-0'>
            <div className='flex flex-wrap gap-1 mb-2'>
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className='rounded-md h-6 w-6 cursor-pointer active:scale-105'
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>

            {/* <GradientButton background={background}>
              💡 Get more at{' '}
              <Link
                href='https://gradient.page/css/ui-gradients'
                className='hover:underline font-bold'
                target='_blank'
              >
                Gradient Page
              </Link>
            </GradientButton> */}
          </TabsContent>

          <TabsContent value='image' className='mt-0'>
            <div className='grid grid-cols-2 gap-1 mb-2'>
              {images.map((s) => (
                <div
                  key={s}
                  style={{ backgroundImage: s }}
                  className='rounded-md bg-cover bg-center h-12 w-full cursor-pointer active:scale-105'
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value='password'>Change your password here.</TabsContent>
        </Tabs>

        <Input
          id='custom'
          value={background}
          className='col-span-2 h-8 mt-4'
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}

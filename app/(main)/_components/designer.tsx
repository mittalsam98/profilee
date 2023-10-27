'use client';

import React from 'react';
import { MinusCircle, Smartphone, Laptop2 } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';

export default function Designer() {
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      key: 'd'
    }
  });
  return (
    <div className='flex flex-col w-full lg:py-5 p-1 lg:px-8'>
      <div className='flex border border-1px border-slate-300 bg-white p-2 justify-between items-center'>
        <div className='flex gap-1 '>
          <MinusCircle className='h-5 w-5 text-gray-400 rounded-xl	' />
          <MinusCircle className='h-5 w-5 text-gray-400 rounded-xl	' />
          <MinusCircle className='h-5 w-5 text-gray-400 rounded-xl	' />
        </div>
        <div className='flex gap-1'>
          <Smartphone className='h-9 w-9 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-200 rounded-lg	' />
          <Laptop2 className='h-9 w-9 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-200 rounded-lg	' />
        </div>
      </div>
      <div
        ref={droppable.setNodeRef}
        className='flex-grow border border-1px border-slate-300 bg-white p-2 '
      ></div>
    </div>
  );
}

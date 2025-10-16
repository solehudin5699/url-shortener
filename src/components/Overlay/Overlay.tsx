import { cn } from '@/utils/className';
import React, { useState } from 'react';

function Overlay() {
  const [position, setPosition] = useState<'left' | 'right'>('right');
  return (
    <div
      className={cn(
        'absolute w-[50%] top-0 left-0 bottom-0 transition-all duration-500',
        'bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500',
        {
          'right-0 left-[50%] rounded-e-2xl': position === 'right',
          'left-0 right-[50%] rounded-s-2xl': position === 'left',
        },
        'flex flex-col justify-center items-center gap-1 shadow-[0px_0px_50px_-12px_var(--tw-shadow-color,rgb(0_0_0/0.25))]',
        'backdrop-blur-[30px] bg_view_card_overlay'
      )}
    >
      <h1 className="font-bold text-2xl text-center text-white">Welcome to URL Shortener</h1>
      <div className="relative w-full h-24 overflow-hidden  text-base grid place-content-center">
        <button
          className={cn(
            'bg-white text-black px-4 py-2 rounded-xl border border-blue-300 transition-all cursor-pointer w-1/2 absolute left-1/2 -translate-x-1/2 duration-500 group top-1/2 -translate-y-1/2 text-sm hover:opacity-90 hover:bg-blue-500 hover:text-white',
            {
              'translate-x-[300%]': position === 'right',
            }
          )}
          onClick={() => setPosition(position === 'left' ? 'right' : 'left')}
        >
          Shorten URL Here
        </button>
        <button
          className={cn(
            'bg-white text-black px-4 py-2 rounded-xl border border-blue-300 transition-all cursor-pointer w-1/2 absolute left-1/2 -translate-x-1/2 duration-500 group top-1/2 -translate-y-1/2 text-sm hover:opacity-90 hover:bg-blue-500 hover:text-white',
            {
              'translate-x-[-300%]': position === 'left',
            }
          )}
          onClick={() => setPosition(position === 'left' ? 'right' : 'left')}
        >
          Check Shortlink Here
        </button>
      </div>
    </div>
  );
}

export default Overlay;

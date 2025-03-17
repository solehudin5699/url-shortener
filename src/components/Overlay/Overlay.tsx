import { cn } from '@/utils/className';
import React, { useState } from 'react';

function Overlay() {
  const [position, setPosition] = useState<'left' | 'right'>('right');
  return (
    <div
      className={cn(
        'absolute w-[50%] top-0 left-0 bottom-0 transition-all duration-700',
        'bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500',
        {
          'right-0 left-[50%] rounded-e-2xl': position === 'right',
          'left-0 right-[50%] rounded-s-2xl': position === 'left',
        },
        'flex flex-col justify-center items-center gap-1 shadow-[0px_0px_50px_-12px_var(--tw-shadow-color,rgb(0_0_0/0.25))]'
      )}
    >
      <h1 className="font-bold text-2xl text-center text-white">Welcome to URL Shortener</h1>
      <div className="relative w-full h-7 overflow-hidden font-sans text-base">
        <h1
          className={cn(
            'transition-all duration-700 whitespace-nowrap text-white absolute left top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            {
              'translate-x-[-500px]': position === 'right',
            }
          )}
        >
          Shortener Long URL here
        </h1>
        <h1
          className={cn(
            'transition-all duration-700 whitespace-nowrap text-white absolute left top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            {
              'translate-x-[500px]': position === 'left',
            }
          )}
        >
          Check Short URL here
        </h1>
      </div>
      <div className="relative w-full h-24 overflow-hidden font-sans text-base">
        <button
          className={cn(
            'bg-white text-black px-4 py-2 rounded-xl hover:bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400 to-70% hover:border-pink-500 border-2 border-indigo-300 transition-all cursor-pointer mt-10 w-[70%] absolute left-1/2 -translate-x-1/2 duration-700 group',
            {
              'translate-x-[-700px]': position === 'right',
            }
          )}
          onClick={() => setPosition(position === 'left' ? 'right' : 'left')}
        >
          <span className="group-hover:text-white transition-all duration-150">Shorten URL</span>
        </button>
        <button
          className={cn(
            'bg-white text-black px-4 py-2 rounded-xl hover:bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400 to-70% hover:border-pink-500 border-2 border-indigo-300 transition-all cursor-pointer mt-10 w-[70%] absolute left-1/2 -translate-x-1/2 duration-700 group',
            {
              'translate-x-[700px]': position === 'left',
            }
          )}
          onClick={() => setPosition(position === 'left' ? 'right' : 'left')}
        >
          <span className="group-hover:text-white transition-all duration-150">Check URL</span>
        </button>
      </div>
    </div>
  );
}

export default Overlay;

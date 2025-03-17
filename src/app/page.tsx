'use client';
export const runtime = 'edge';
import CheckShortUrl from '@/components/CheckShortUrl';
import CreateShortUrl from '@/components/CreateShortUrl';
import Overlay from '@/components/Overlay';
import { cn } from '@/utils/className';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div
        className={cn(
          'shadow-2xl bg-white rounded-2xl min-w-[300px] max-w-[850px] w-full min-h-[500px]',
          'relative overflow-hidden'
        )}
        style={
          {
            '--tw-shadow': '1px 1px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25))',
          } as React.CSSProperties
        }
      >
        <div className="flex w-full">
          <CreateShortUrl />
          <CheckShortUrl />
        </div>
        <Overlay />
      </div>
    </div>
  );
}

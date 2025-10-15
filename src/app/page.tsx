'use client';
export const runtime = 'edge';
import CheckShortUrl from '@/components/CheckShortUrl';
import CreateShortUrl from '@/components/CreateShortUrl';
import Overlay from '@/components/Overlay';
import { cn } from '@/utils/className';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative">
      <div
        className={cn(
          'shadow-2xl bg_view_card rounded-2xl min-w-[300px] max-w-[850px] w-full min-h-[500px]',
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
      <span className="text-sm text-white/90 absolute bottom-1 left-1/2 translate-x-[-50%] font-bold">
        <Link rel="noopener noreferrer" href={'https://solehudin.id'} className="hover:underline">
          Solehudin
        </Link>{' '}
        © 2025
      </span>
    </div>
  );
}

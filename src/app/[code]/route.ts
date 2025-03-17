import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const code = pathname.split('/')[1];
  // const { code } = params;
  const apiUrl = `${process.env.APP_SCRIPT_URL}?code=${code}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.originalUrl) {
      return NextResponse.redirect(data.originalUrl);
    }
    return NextResponse.json({ error: 'URL not found' }, { status: 404 });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 500 });
  }
}

export const config = {
  matcher: '/:code',
};

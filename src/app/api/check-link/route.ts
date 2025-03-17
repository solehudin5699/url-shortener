export const runtime = 'nodejs';
const APP_SCRIPT_URL = process.env.APP_SCRIPT_URL || '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  try {
    if (!code) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    const response = await fetch(APP_SCRIPT_URL + `?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data?.code !== 200) {
      return new Response(JSON.stringify({ error: data?.error || 'Error processing request' }), {
        status: data?.code || 500,
      });
    }

    return new Response(JSON.stringify({ originalUrl: data?.originalUrl, status: 'success' }), {
      status: 200,
    });
  } catch (_error) {
    return new Response(JSON.stringify({ error: 'Error processing request', status: 'error' }), {
      status: 500,
    });
  }
}

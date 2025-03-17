export const runtime = 'nodejs';
const APP_SCRIPT_URL = process.env.APP_SCRIPT_URL || '';

export async function POST(request: Request) {
  try {
    const { originalUrl, shortCode } = await request.json();

    if (!originalUrl) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    const response = await fetch(APP_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        originalUrl,
        shortCode,
      }),
    });

    const data = await response.json();
    if (data?.code === 201) {
      return new Response(JSON.stringify({ shortCode: data?.shortCode, status: 'success' }), {
        status: 201,
      });
    }

    return new Response(JSON.stringify({ error: data?.error, status: 'error' }), {
      status: data?.code || 500,
    });
  } catch (_error) {
    return new Response(JSON.stringify({ error: 'Error processing request', status: 'error' }), {
      status: 500,
    });
  }
}

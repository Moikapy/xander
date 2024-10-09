// app/api/chat/route.js
export async function POST(request) {
  const body = await request.json();

  try {
    console.log('http://api:3001/api/v1/chat',body)
    const response = await fetch('http://localhost:3001/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });


    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return new Response(JSON.stringify({ exists: false }), { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db('IdeaSphereBlog');
  const userCollection = db.collection('users');

  const user = await userCollection.findOne({ email: username });

  if (user) {
    return new Response(JSON.stringify({ exists: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ exists: false }), { status: 404 });
  }
}

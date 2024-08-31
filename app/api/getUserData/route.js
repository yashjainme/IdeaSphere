import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    // Use the URL object to parse query parameters
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    const client = await clientPromise;
    const db = client.db('IdeaSphereBlog');
    const userCollection = db.collection('users');

    const user = await userCollection.findOne({ email });

    if (!user) {
      return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return new Response('Failed to fetch user data', { status: 500 });
  }
}

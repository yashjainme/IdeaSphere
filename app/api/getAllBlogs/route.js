import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('IdeaSphereBlog');
    const blogsCollection = db.collection('blogs');

    console.log('Fetching blogs from collection:', blogsCollection.collectionName);

    // Fetch the blogs
    const blogs = await blogsCollection.find({}).toArray();

   

    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.error('Error fetching all blogs:', error.message);
    console.error('Stack trace:', error.stack);
    return new Response('Failed to fetch all blogs', { status: 500 });
  }
}

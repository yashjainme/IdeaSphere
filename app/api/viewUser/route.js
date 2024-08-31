




import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const client = await clientPromise;
    const db = client.db('IdeaSphereBlog');
    const userCollection = db.collection('users');
    const blogsCollection = db.collection('blogs');

    // Find the user
    const otherUser = await userCollection.findOne({ email });

    if (!otherUser) {
      return new Response('User not found', { status: 404 });
    }

    // Fetch blogs of other users
    const otherUserBlogs = await blogsCollection.aggregate([
      { $match: { userId: otherUser._id } },
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 1,
          projectName: 1,
          description: 1,
          content: 1,
          coverImageUrl: 1,
          createdAt: 1,
          userId: 1,
        },
      },
    ]).toArray();

    return new Response(JSON.stringify(otherUserBlogs), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return NextResponse.json({ error: 'Failed to fetch blog data' }, { status: 500 });
  }
}
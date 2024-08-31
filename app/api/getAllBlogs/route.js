import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic'; // Ensure the route is always dynamic

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('IdeaSphereBlog');
    const blogsCollection = db.collection('blogs');

  

    // Fetch the blogs, sort by creation date descending
    const blogs = await blogsCollection.find({})
      .sort({ createdAt: -1 })
      .limit(100) // Limit to recent 100 blogs for performance
      .toArray();

   

    // Log a sample blog (first one) for debugging
    if (blogs.length > 0) {
      console.log('Sample blog:', JSON.stringify(blogs[0], null, 2));
    }

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching all blogs:', error.message);
    console.error('Stack trace:', error.stack);
    return NextResponse.json({ error: 'Failed to fetch all blogs' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";

export const dynamic = 'force-dynamic'; // This line tells Next.js that this is a dynamic route

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const client = await clientPromise;
    const db = client.db('IdeaSphereBlog');
    const userCollection = db.collection('users');
    const user = await userCollection.findOne({ email });
    if (!user) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
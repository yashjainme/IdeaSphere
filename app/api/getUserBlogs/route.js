import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: 'Not authenticated' }), { status: 401 });
  }

  const email = session.user.email;
  const client = await clientPromise;
  const db = client.db('IdeaSphereBlog');
  const userCollection = db.collection('users');
  const blogsCollection = db.collection('blogs');

  // Find the user by email to get the userId
  const user = await userCollection.findOne({ email });
//   console.log(user)

  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
  }

  // Fetch the blogs associated with the userId
  const blogs = await blogsCollection.find({ userId: user._id }).toArray();
//   console.log(blogs)

  return new Response(JSON.stringify(blogs), { status: 200 });
}

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const DELETE = async (req) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ message: 'Not allowed to delete this document' }), { status: 401 });
    }

    const { blogId } = await req.json(); // Extract blogId from request body
    const userEmail = session.user.email;

    const client = await clientPromise;
    const db = client.db('IdeaSphereBlog');
    const blogsCollection = db.collection('blogs');

    const blog = await blogsCollection.findOne({ _id: new ObjectId(blogId) });

    if (!blog) {
      return new Response(JSON.stringify({ message: 'Blog not found' }), { status: 404 });
    }

    if (blog.email !== userEmail) {
      return new Response(JSON.stringify({ message: 'Not authorized to delete this blog' }), { status: 403 });
    }

    const result = await blogsCollection.deleteOne({ _id: new ObjectId(blogId) });

    if (result.deletedCount === 1) {
      return new Response(JSON.stringify({ message: 'Blog deleted successfully', blogId }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Blog deletion failed' }), { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
};

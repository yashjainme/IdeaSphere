// import { getServerSession } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]/route';
// import clientPromise from '@/lib/mongodb';

// export const POST = async (req) => {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return new Response(JSON.stringify({ message: 'Not authenticated' }), { status: 401 });
//   }

//   const client = await clientPromise;
//   const db = client.db('IdeaSphereBlog');
  
//   const blogsCollection = db.collection('blogs');

//   const { projectName, randomId, content } = await req.json();

//   try {
//     const result = await blogsCollection.insertOne({
//       projectName,
//       randomId,
//       content,
//       userId: session.user._id,  // Assuming `id` is available in the session user object
//       createdAt: new Date(),
//     });
    
//     return new Response(JSON.stringify({ message: 'Blog created successfully', blogId: result.insertedId }), { status: 201 });
//   } catch (error) {
//     console.error('Error creating blog:', error);
//     return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
//   }
// };










import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';

export const POST = async (req) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: 'Not authenticated' }), { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db('IdeaSphereBlog');
  
  const blogsCollection = db.collection('blogs');
  const usersCollection = db.collection('users'); // Assuming you have a collection named 'users'

  const { projectName, randomId, content } = await req.json();

  try {
    // Fetch user data from the 'users' collection based on the session's user email
    const user = await usersCollection.findOne({ email: session.user.email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Use the retrieved user ID in your MongoDB query
    const result = await blogsCollection.insertOne({
      projectName,
      randomId,
      content,
      userId: user._id,
      createdAt: new Date(),
    });
    
    return new Response(JSON.stringify({ message: 'Blog created successfully', blogId: result.insertedId }), { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
};


import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { uploadImageToImgur } from '@/utils/uploadImageToImgur';

export const POST = async (req, res) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ message: 'Not authenticated' }), { status: 401 });
    }

    const formData = await req.formData();
    const projectName = formData.get('projectName');
    const description = formData.get('description');
    const randomId = formData.get('randomId');
    const content = formData.get('content');
    const userEmail = formData.get('userEmail');
    const coverImage = formData.get('coverImage');

    const client = await clientPromise;
    const db = client.db('IdeaSphereBlog');
    const blogsCollection = db.collection('blogs');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    let coverImageUrl = 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg'; // Default image URL
    if (coverImage) {
      const buffer = Buffer.from(await coverImage.arrayBuffer());
      coverImageUrl = await uploadImageToImgur(buffer);
    }

    const result = await blogsCollection.insertOne({
      projectName,
      description,
      randomId,
      content,
      coverImageUrl,
      email: user.email,
      userId: user._id,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: 'Blog created successfully', blogId: result.insertedId }), { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
};














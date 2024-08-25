import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { uploadImageToImgur } from '@/utils/uploadImageToImgur';

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const formData = await req.formData();
    const id = formData.get('id');
    const projectName = formData.get('projectName');
    const description = formData.get('description');
    const content = formData.get('content');
    const userEmail = formData.get('email');
    const coverImage = formData.get('coverImage');

    if (!id || !content || !userEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('IdeaSphereBlog');
    const blogsCollection = db.collection('blogs');

    const updateData = {
      projectName,
      description,
      content,
      email: userEmail,
      updatedAt: new Date().toISOString()
    };

    if (coverImage) {
      const buffer = Buffer.from(await coverImage.arrayBuffer());
      const coverImageUrl = await uploadImageToImgur(buffer);
      updateData.coverImageUrl = coverImageUrl;
    }

    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Error updating blog', details: error.message }, { status: 500 });
  }
}


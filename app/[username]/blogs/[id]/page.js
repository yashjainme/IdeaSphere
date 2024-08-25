import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import DOMPurify from "isomorphic-dompurify";
import '../../../../compCss/RichTextEditor.css'
import Link from 'next/link';

const BlogDetailPage = async ({ params }) => {
  console.log(params)
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return { notFound: true };
  }

  const client = await clientPromise;
  const db = client.db('IdeaSphereBlog');
  const blogsCollection = db.collection('blogs');

  let blog;
  try {
    blog = await blogsCollection.findOne({ _id: ObjectId.createFromHexString(params.id) });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return "Not Found";
  }

  if (!blog) {
    return "Not Found"
  }

  const sanitizedContent = DOMPurify.sanitize(blog.content);

  return (
    <div className="container mx-auto p-4 relative">
      <div className="absolute top-0 right-0 mt-4 mr-4 bg-gray-100 rounded-full px-4 py-2 text-sm font-semibold text-gray-700">
        {/* Profile: <Link > Profile </Link> */}
        Author: {blog.email || 'Unknown'}
      </div>
      <h1 className="text-3xl font-bold mb-4">{blog.projectName}</h1>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
};

export default BlogDetailPage;










import clientPromise from '@/lib/mongodb';

export async function GET(req) {


 


  const client = await clientPromise;
  const db = client.db('IdeaSphereBlog');
 
  const blogsCollection = db.collection('blogs');





  // Fetch the blogs associated with the userId
  const blogs = await blogsCollection.find({}).toArray();
//   console.log(blogs)

  return new Response(JSON.stringify(blogs), { status: 200 });
}

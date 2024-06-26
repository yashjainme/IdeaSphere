import Link from 'next/link';

const BlogCard = ({ imageUrl, description, blogId, title, username }) => {
  return (
    
      
      <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition duration-300 ease-in-out m-4">
    <Link target='_blank' href={`${username}/blogs/${blogId}`}>
        <img className="w-full h-64 object-cover" src={imageUrl} alt="Blog Image"/>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
    </Link>
      </div>
 
  );
};

export default BlogCard;

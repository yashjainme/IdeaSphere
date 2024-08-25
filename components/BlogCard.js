import Link from 'next/link';

const BlogCard = ({ imageUrl, description, blogId, title, username }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out m-4 bg-white">
      <Link href={`/${username}/blogs/${blogId}`} passHref>
        
          <img className="w-full h-64 object-cover" src={imageUrl} alt="Blog Image" />
          <div className="px-6 py-4">
            <div className="font-bold text-2xl mb-3 text-gray-900 truncate">{title}</div>
            <p className="text-gray-600 text-base line-clamp-3">{description}</p>
          </div>
      
      </Link>
    </div>
  );
};

export default BlogCard;
















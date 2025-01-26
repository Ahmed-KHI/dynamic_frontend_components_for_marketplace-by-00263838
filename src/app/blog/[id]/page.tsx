import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { posts } from '@/app/utils/blogData';

export const generateStaticParams = async () => {
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
};

const BlogDetail = async ({ params }: { params: { id: string } }) => {
  const post = posts.find((p) => p.id === Number(params.id));

  if (!post) {
    notFound(); // Handles 404 errors if the post is not found
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
          <nav>
            <Link href="/blog">
              <p className="text-orange-500 hover:underline">Back to Blog</p>
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            className="h-64 w-full object-cover"
          />
          <div className="p-6">
            <time className="block text-sm text-gray-500 mb-4">{post.date}</time>
            <p className="text-lg text-gray-700">{post.content}</p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogDetail;
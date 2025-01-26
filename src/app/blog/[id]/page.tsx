import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { posts } from '@/app/utils/blogData';

// Define the type for the `params` object
interface PageProps {
  params: {
    id: string;
  };
}

// Generate static paths for dynamic routes
export const generateStaticParams = async () => {
  return posts.map((post) => ({
    id: post.id.toString(), // Ensure `id` is a string
  }));
};

// BlogDetail component
const BlogDetail = async ({ params }: PageProps) => {
  // Find the post by ID
  const post = posts.find((p) => p.id === Number(params.id));

  // Handle 404 if the post is not found
  if (!post) {
    notFound();
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
            width={1200} // Add width and height for Next.js Image optimization
            height={400}
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
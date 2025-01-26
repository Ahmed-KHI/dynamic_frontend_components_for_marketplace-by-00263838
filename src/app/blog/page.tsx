import Head from 'next/head';
import Link from 'next/link';
import { posts } from '../utils/blogData';
import Image from 'next/image';

const BlogPage = () => {

  return (
    <>
      <Head>
        <title>Blog - E-commerce Insights</title>
        <meta
          name="description"
          content="Explore our latest articles on e-commerce trends, tips, and strategies."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Our Blog</h1>
            <nav>
              <Link href="/">
                <p className="text-orange-500 hover:underline">Back to Home</p>
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <time className="block text-sm text-gray-500 mb-2">
                    {post.date}
                  </time>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">{post.description}</p>
                  <Link href={`/blog/${post.id}`}>
                    <p className="text-orange-500 hover:underline">Read More</p>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default BlogPage;
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export default function Blog() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      excerpt:
        "Learn the basics of Next.js and how to create your first application.",
      date: "April 10, 2025",
      slug: "getting-started-with-nextjs",
    },
    {
      id: 2,
      title: "Implementing RAG with LangChain",
      excerpt:
        "How I built a Retrieval-Augmented Generation system using LangChain and Gemini 1.5.",
      date: "April 2, 2025",
      slug: "implementing-rag-with-langchain",
    },
    {
      id: 3,
      title: "Creating 3D Experiences with Three.js",
      excerpt:
        "Learn how to add immersive 3D elements to your web applications.",
      date: "March 25, 2025",
      slug: "creating-3d-experiences-with-threejs",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 border-b border-accent-neon/30 pb-2">
        My <span className="text-accent-neon">Blog</span>
      </h1>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-glass-dark backdrop-blur-md p-6 rounded-xl border border-accent-neon/20 shadow-glass hover:shadow-neon transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-accent-neon transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-accent-neon hover:text-accent-purple transition-colors flex items-center"
            >
              Read more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

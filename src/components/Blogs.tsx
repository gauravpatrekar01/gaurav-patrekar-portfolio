import React from 'react';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    link: string;
}

const Blogs: React.FC = () => {
    const blogPosts: BlogPost[] = [
        {
            id: 1,
            title: 'Getting Started with React Hooks',
            excerpt: 'Learn how to use React Hooks to manage state and side effects in functional components.',
            date: '2024-01-15',
            category: 'React',
            link: '#',
        },
        {
            id: 2,
            title: 'TypeScript Best Practices',
            excerpt: 'Explore best practices and patterns for writing scalable TypeScript applications.',
            date: '2024-01-10',
            category: 'TypeScript',
            link: '#',
        },
        {
            id: 3,
            title: 'Web Performance Optimization',
            excerpt: 'Techniques to improve your web application performance and user experience.',
            date: '2024-01-05',
            category: 'Performance',
            link: '#',
        },
    ];

    return (
        <section className="blogs-section py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-center">Latest Blog Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="p-6">
                                <span className="text-sm text-blue-600 font-semibold">{post.category}</span>
                                <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
                                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">{post.date}</span>
                                    <a href={post.link} className="text-blue-600 font-semibold hover:underline">
                                        Read More →
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
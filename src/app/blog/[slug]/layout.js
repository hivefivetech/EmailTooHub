import blogs from "../blogsData";

// 🔹 Generate metadata dynamically for each blog post
export async function generateMetadata({ params }) {
    const { slug } = params;
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) {
        return {
            title: "Blog Not Found | EmailToolHub",
            description: "This blog post does not exist.",
            keywords: "blog, email services, marketing, bulk email",
        };
    }

    return {
        title: `${blog.title} | EmailToolHub`,
        description: blog.metaDescription,
        keywords: `email providers, bulk mailing, ${blog.metaKeywords}, email marketing, best email tools`,
    };
}

// 🔹 Layout component to wrap `page.jsx`
export default function BlogLayout({ children }) {
    return <>{children}</>;
}

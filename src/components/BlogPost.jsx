import { useParams } from "react-router-dom";
import "./BlogPost.css";

function BlogPost({ blogs }) {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="blog-post-error">
        <h2>Blog post not found</h2>
        <p>The blog post you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <article className="blog-post">
      <header className="blog-post-header">
        <div className="blog-post-meta">
          <div className="blog-post-category">{blog.category}</div>
          <div className="blog-post-info">
            <span className="blog-post-date">
              {new Date(blog.date).toLocaleDateString()}
            </span>
            <span className="blog-post-read-time">{blog.readTime}</span>
          </div>
        </div>
        <h1 className="blog-post-title">{blog.title}</h1>
        <div className="blog-post-author">
          <img
            src={blog.authorAvatar}
            alt={blog.author}
            className="author-avatar"
          />
          <div className="author-info">
            <span className="author-name">{blog.author}</span>
            <span className="author-title">Contributing Writer</span>
          </div>
        </div>
      </header>

      <div className="blog-post-image-container">
        <img src={blog.image} alt={blog.title} className="blog-post-image" />
      </div>

      <div className="blog-post-content">
        <p>{blog.content}</p>
      </div>

      <footer className="blog-post-footer">
        <div className="blog-post-tags">
          {blog.tags.map((tag) => (
            <span key={tag} className="blog-tag">
              #{tag}
            </span>
          ))}
        </div>
        <div className="blog-post-share">
          <h3>Share this post</h3>
          <div className="share-buttons">
            <button className="share-button twitter">
              <svg viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
              Twitter
            </button>
            <button className="share-button facebook">
              <svg viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              Facebook
            </button>
            <button className="share-button linkedin">
              <svg viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </button>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default BlogPost;
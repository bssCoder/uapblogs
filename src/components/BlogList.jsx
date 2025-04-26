import { Link } from "react-router-dom";
import "./BlogList.css";

function BlogList({ blogs }) {
  return (
    <div className="blog-list">
      <h1 className="page-title">Latest Blog Posts</h1>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <article key={blog.id} className="blog-card">
            <Link to={`/blog/${blog.id}`} className="blog-link">
              <div className="blog-image-container">
                <img src={blog.image} alt={blog.title} className="blog-image" />
                <div className="blog-category">{blog.category}</div>
              </div>
              <div className="blog-content">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <div className="blog-meta">
                  <div className="blog-author">
                    <img
                      src={blog.authorAvatar}
                      alt={blog.author}
                      className="author-avatar"
                    />
                    <span className="author-name">{blog.author}</span>
                  </div>
                  <div className="blog-info">
                    <span className="blog-date">
                      {new Date(blog.date).toLocaleDateString()}
                    </span>
                    <span className="blog-read-time">{blog.readTime}</span>
                  </div>
                </div>
                <div className="blog-tags">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="blog-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
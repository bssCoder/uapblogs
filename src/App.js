import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BlogList from "./components/BlogList";
import BlogPost from "./components/BlogPost";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const blogs = [
    {
      id: 1,
      title: "Getting Started with React Development",
      excerpt: "Learn the fundamentals of React and start building modern web applications",
      content: "React is a powerful JavaScript library for building user interfaces...",
      author: "John Doe",
      authorAvatar: "https://ui-avatars.com/api/?name=John+Doe",
      date: "2025-04-17",
      category: "Programming",
      tags: ["react", "javascript", "web-development"],
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Modern Web Design Trends in 2025",
      excerpt: "Explore the latest trends shaping the future of web design",
      content: "As we move further into 2025, web design continues to evolve...",
      author: "Jane Smith",
      authorAvatar: "https://ui-avatars.com/api/?name=Jane+Smith",
      date: "2025-04-16",
      category: "Design",
      tags: ["web-design", "ui-ux", "trends"],
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "The Future of Artificial Intelligence",
      excerpt: "Discover how AI is transforming various industries",
      content: "Artificial Intelligence continues to revolutionize the way we live and work...",
      author: "Mike Johnson",
      authorAvatar: "https://ui-avatars.com/api/?name=Mike+Johnson",
      date: "2025-04-15",
      category: "Technology",
      tags: ["ai", "machine-learning", "technology"],
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop"
    }
  ];

  const filteredBlogs = searchQuery
    ? blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : blogs;

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    // Simulate search delay
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <main className="main-content">
                {isLoading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <span>Loading blogs...</span>
                  </div>
                ) : (
                  <BlogList blogs={filteredBlogs} />
                )}
              </main>
            }
          />
          <Route path="/blog/:id" element={<BlogPost blogs={blogs} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

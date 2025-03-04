const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Allow frontend to communicate with backend

const blogsFile = path.join(__dirname, "blogs.json");

// Function to read blogs from JSON file
const readBlogs = () => {
    if (!fs.existsSync(blogsFile)) {
        fs.writeFileSync(blogsFile, "[]");
    }
    return JSON.parse(fs.readFileSync(blogsFile));
};

// Function to write blogs to JSON file
const writeBlogs = (data) => {
    fs.writeFileSync(blogsFile, JSON.stringify(data, null, 2));
};

// GET all blogs
app.get("/api/blogs", (req, res) => {
    res.json(readBlogs());
});

// POST a new blog
app.post("/api/blogs", (req, res) => {
    let blogs = readBlogs();
    const newBlog = {
        id: blogs.length + 1,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        date: new Date().toISOString()
    };
    blogs.push(newBlog);
    writeBlogs(blogs);
    res.status(201).json({ message: "Blog added successfully!", blog: newBlog });
});

// PUT (Modify a blog)
app.put("/api/blogs/:id", (req, res) => {
    let blogs = readBlogs();
    const blogIndex = blogs.findIndex(blog => blog.id == req.params.id);

    if (blogIndex === -1) {
        return res.status(404).json({ message: "Blog not found" });
    }

    blogs[blogIndex].title = req.body.title || blogs[blogIndex].title;
    blogs[blogIndex].author = req.body.author || blogs[blogIndex].author;
    blogs[blogIndex].content = req.body.content || blogs[blogIndex].content;

    writeBlogs(blogs);
    res.json({ message: "Blog updated successfully!", blog: blogs[blogIndex] });
});

// DELETE a blog
app.delete("/api/blogs/:id", (req, res) => {
    let blogs = readBlogs();
    const filteredBlogs = blogs.filter(blog => blog.id != req.params.id);

    if (filteredBlogs.length === blogs.length) {
        return res.status(404).json({ message: "Blog not found" });
    }

    writeBlogs(filteredBlogs);
    res.json({ message: "Blog deleted successfully!" });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

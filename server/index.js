const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { app, startServer } = require("./apolloServer");

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using mongoose
mongoose.connect(
  "mongodb+srv://moongachiku:nUjgdnPMTBEX4ZaW@blog.kabxvsi.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// User model
const User = mongoose.model("User", {
  email: String,
  password: String, // In a real app, this should be hashed
});

// JWT Secret Key
const secretKey = "your-secret-key";

// User registration endpoint
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  // Simulate user creation in the database
  const newUser = new User({ email, password });
  await newUser.save();

  // Create and send JWT token
  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email },
    secretKey
  );
  res.json({ token });
});

// User login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Simulate user authentication from the database
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Create and send JWT token
  const token = jwt.sign({ userId: user._id, email: user.email }, secretKey);
  res.json({ token });
});

// Define Post schema and model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

// RESTful API endpoints for CRUD operations
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post("/api/posts", async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.json(newPost);
});

// Implement Update, Delete endpoints

// File upload with Node.js
const multer = require("multer");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// File upload endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
  // Handle the uploaded file
  res.json({ message: "File uploaded successfully." });
});

// Use Apollo Server middleware

startServer().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

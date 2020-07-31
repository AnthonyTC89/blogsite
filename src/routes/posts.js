const express = require('express');

const router = express.Router();
const verifyToken = require('../Controllers/verifyToken');
const Post = require('../models/Post');

router.get('/api/posts', verifyToken, async (req, res) => {
  if (req.query.userID) {
    const { userID } = req.query;
    const posts = await Post.find({ userID });
    res.json(posts);
  } else {
    const posts = await Post.find();
    res.json(posts);
  }
});

router.post('/api/posts', async (req, res) => {
  const { title, text, userID } = req.body;
  const post = new Post(
    {
      title,
      text,
      status: true,
      userID,
      created_at: Date.now(),
    },
  );
  await post.save();
  res.json(post);
});

router.put('/api/posts/:id', async (req, res) => {
  const { title, text, status, userID } = req.body;
  const newPost = { title, text, status, userID };
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, newPost);
  res.json(post);
});

router.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndRemove(id);
  res.json({ status: 'Removed' });
});

module.exports = router;

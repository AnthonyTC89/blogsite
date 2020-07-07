const express = require('express');

const router = express.Router();
const Post = require('../models/Post');

router.get('/api/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.post('/api/posts', async (req, res) => {
  const { title, text } = req.body;
  const post = new Post(
    {
      title,
      text,
      status: true,
      created_at: Date.now(),
    },
  );
  await post.save();
  res.json(post);
});

router.put('/api/posts/:id', async (req, res) => {
  const { title, text, status } = req.body;
  const newPost = { title, text, status };
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

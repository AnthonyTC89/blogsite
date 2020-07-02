const express = require('express');

const router = express.Router();
const Post = require('../models/Post');

router.get('/api/posts', async (req, res) => {
  const users = await Post.find();
  res.json(users);
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
  res.json({ status: 'OK', post });
});

module.exports = router;

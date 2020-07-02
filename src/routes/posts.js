const express = require('express');

const router = express.Router();
const Post = require('../models/Post');

router.get('/api/posts', async (req, res) => {
  const users = await Post.find();
  res.json(users);
});

router.post('/api/posts', async (req, res) => {
  const { title, text } = req.body;
  const post = await Post.insert(
    {
      title,
      text,
      status: true,
      created_at: Date.now(),
    },
  );
  res.json({ status: 'OK', post });
});

module.exports = router;

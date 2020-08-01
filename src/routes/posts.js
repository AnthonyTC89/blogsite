/* eslint-disable camelcase */
const express = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = require('../Controllers/verifyToken');
const Post = require('../models/Post');

const router = express.Router();
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

router.post('/api/posts', verifyToken, async (req, res) => {
  try {
    const { postToken } = req.body;
    const decoded = jwt.verify(postToken, process.env.REACT_APP_JWT_SECRET);
    const { title, text, user_id } = decoded;
    const post = new Post({ title, text, user_id });
    await post.save();
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.put('/api/posts/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { postToken } = req.body;
    const decoded = jwt.verify(postToken, process.env.REACT_APP_JWT_SECRET);
    const { title, text, status, user_id } = decoded;
    const newPost = { title, text, status, user_id };
    await Post.findByIdAndUpdate(id, newPost);
    res.sendStatus(202);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndRemove(id);
  res.json({ status: 'Removed' });
});

module.exports = router;

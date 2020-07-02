const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/api/users', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password, status: true });
  await user.save();
  res.json({ status: 'OK' });
});

module.exports = router;

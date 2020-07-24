const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User(
      {
        username,
        email,
        password,
        status: true,
      },
    );
    await user.save();
    res.json({ status: 'OK' });
  } catch (err) {
    res.status(404).json({ status: 'error' });
  }
});

router.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await User.find({ username, password });
  if (users.length === 0) {
    res.status(404).json({ status: 'Error' });
  } else {
    res.json({ status: 'OK', user: users[0] });
  }
});

module.exports = router;

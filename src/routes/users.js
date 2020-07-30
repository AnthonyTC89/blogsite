const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');

router.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/api/users', async (req, res) => {
  try {
    console.log('req.body: ', req.body);
    const { token } = req.body;
    console.log('token: ', token);
    const decoded = jwt.verify(token, 'secret');
    console.log('decoded: ', decoded);
    const { username, email, password } = decoded;
    const user = new User(
      {
        username,
        email,
        password,
        status: true,
      },
    );
    await user.save();
    res.status(201).send(token);
  } catch (err) {
    res.sendStatus(404);
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

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../models/User');

router.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/api/users', async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    const { username, email, password } = decoded;
    const salt = bcrypt.genSaltSync(10);
    const user = new User(
      {
        username,
        email,
        password: bcrypt.hashSync(password, salt),
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
  const { token } = req.body;
  const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
  const { username, password } = decoded;
  const users = await User.find({ username, password });
  if (users.length === 0) {
    res.status(404).json({ status: 'Error' });
  } else {
    res.json({ status: 'OK', user: users[0] });
  }
});

module.exports = router;

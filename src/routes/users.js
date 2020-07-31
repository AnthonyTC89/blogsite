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
    const userToken = jwt.sign(user.toObject(), process.env.REACT_APP_JWT_SECRET);
    res.status(201).send(userToken);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.post('/api/users/login', async (req, res) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
  const { username, password } = decoded;
  const user = await User.findOne({ username });
  if (user === null) {
    res.sendStatus(404);
  } else {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const userToken = jwt.sign(user.toObject(), process.env.REACT_APP_JWT_SECRET);
      res.status(202).send(userToken);
    } else {
      res.sendStatus(401);
    }
  }
  // if (users.length === 0) {
  //   const newToken = jwt.sign(users[0], process.env.REACT_APP_JWT_SECRET);
  //   res.status(202).send(newToken);
  // } else {
  //   res.sendStatus(401);
  // }
});

module.exports = router;

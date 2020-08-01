const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const verifyToken = require('../Controllers/verifyToken');
const User = require('../models/User');

router.get('/api/users/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userDocument = await User.findById(id);
    const { _id, username, email, status } = userDocument.toObject();
    const payload = { _id, username, email, status };
    const token = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET);
    res.status(200).send(token);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.post('/api/users', async (req, res) => {
  try {
    const { userToken } = req.body;
    const decoded = jwt.verify(userToken, process.env.REACT_APP_JWT_SECRET);
    const { username, email, password } = decoded;
    const salt = bcrypt.genSaltSync(10);
    const user = new User({ username, email, password: bcrypt.hashSync(password, salt) });
    await user.save();
    const token = jwt.sign(user.toObject(), process.env.REACT_APP_JWT_SECRET);
    res.status(201).send(token);
  } catch (err) {
    res.sendStatus(404);
  }
});

router.put('/api/users/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { userToken } = req.body;
    const decoded = jwt.verify(userToken, process.env.REACT_APP_JWT_SECRET);
    const { username, email, password, status } = decoded;
    const salt = bcrypt.genSaltSync(10);
    const auxUser = { username, email, password: bcrypt.hashSync(password, salt), status };
    await User.findByIdAndUpdate(id, auxUser);
    res.sendStatus(202);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.post('/api/users/login', async (req, res) => {
  const { userToken } = req.body;
  const decoded = jwt.verify(userToken, process.env.REACT_APP_JWT_SECRET);
  const { username, password } = decoded;
  const user = await User.findOne({ username });
  if (user === null) {
    res.sendStatus(404);
  } else {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = jwt.sign(user.toObject(), process.env.REACT_APP_JWT_SECRET);
      res.status(202).send(token);
    } else {
      res.sendStatus(401);
    }
  }
});

module.exports = router;

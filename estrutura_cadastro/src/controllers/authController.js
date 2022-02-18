const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.send({ user });
  } catch (err) {
    res.status(400).send({ error: 'Falha no registro' });
  }
});
const express = require('express');
const bcrypt = require('bcrypt js');
const User = require('../models/User');
const router = express.Router();

/*rota de registro */
router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'Uusário já existe' });

    const user = await User.create(req.body);
    user.password = undefined;

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: 'Falha no registro' });
  }
});

/*rota de autenticacao*/
router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user)
    return res.status(400).send({ error: 'Usuário não encontrado' });

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Senha inválida' })

  res.send({ user });
});




module.exports = app => app.use('/auth', router);
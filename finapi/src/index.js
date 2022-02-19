const express = require('express');
const { v4: uuidv4 } = require('uuid')
const app = express();
app.use(express.json());

const costomers = []; //banco de dados fake

/*componentes da conta: cpf/name/id/statement*/

app.post('/account', (req, res) => { //criar conta
  const { cpf, name } = req.body;

  const id = uuidv4();

  costomers.push({
    cpf,
    name,
    id,
    statement: []
  });
  return res.status(201).send({ message: 'Conta criado com sucesso!' });
});


app.listen(3000);
console.log('server running . . .');
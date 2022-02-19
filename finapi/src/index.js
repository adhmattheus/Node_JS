const express = require('express');
const { v4: uuidv4 } = require('uuid')
const app = express();
app.use(express.json());

const customers = []; //banco de dados fake

/*componentes da conta: cpf/name/id/statement*/
app.post('/account', (req, res) => { //criar conta
  const { cpf, name } = req.body;

  const customersAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customersAlreadyExists) {
    return res.status(400).json({ error: 'Customer already exists!' });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return res.status(201).send({ message: 'Account created successfully!' });
});


app.listen(3000);
console.log('server running . . .');
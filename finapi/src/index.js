const express = require('express');
const { v4: uuidv4 } = require('uuid')
const app = express();
app.use(express.json());

const customers = []; //banco de dados fake

/*componentes da conta: cpf/name/id/statement*/
app.post('/account', (req, res) => { //criar conta
  const { cpf, name } = req.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
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

app.get('/statement', (req, res) => {
  const { cpf } = req.headers;

  const customer = customers.find(customer => customer.cpf === cpf); // encontrar o cpf e retornar os dados
  
  if(!customer){
    return res.status(400).json({error: 'Customer not found'});
  }
  
  return res.json(customer.statement);
});


app.listen(3000);
console.log('server running . . .');
const express = require('express');
const { v4: uuidv4 } = require('uuid');//v4 = gera um nunmero aleatorio
const app = express();
app.use(express.json());

const customers = []

//middleware
function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers

  const customer = customers.find(customer => customer.cpf === cpf)

  if (!customer) {
    return res.status(400).json({ error: "Customer not found" })
  }

  req.customer = customer
  return next()
};

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {

    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);
  return balance;
};

app.post('/account', (req, res) => {
  const { cpf, name } = req.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  )

  if (customerAlreadyExists) {
    return res.status(400).json({ error: "Customer already exists!" })
  }
  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return res.status(201).send({ message: 'Account created successfully!' });
});

app.get('/statement', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;
  return res.json(customer.statement)
});

app.post('/deposit', verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit',
  };
  customer.statement.push(statementOperation); //passando info de statementOperation em statement
  return res.status(201).send({ message: 'Deposit made successfully!' });
});

app.post('/withdraw', verifyIfExistsAccountCPF, (req, res) => {
  const { amount } = req.body;
  const { customer } = req;
  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return res.status(400).json({ error: 'Unrealized balance, insufficient funds.' });
  }
  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit',
  };
  customer.statement.push(statementOperation);

  return res.status(201).send({message: 'Withdrawal successful!'});
});



app.listen(3000);
console.log('server running . . .');
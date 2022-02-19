const express = require('express');
const app = express();

/*metodos httpp 
GET - buscar info dentro do servidor
POST - inserir info no Servidor
PUT - alterar info no Servidor
PATH - alterar info especifica no Servidor
DELETE - deletar info no servidor
*/

app.get('/courses', (req, res) => {
  return res.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post('/courses', (req, res) => {
  return res.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
});

app.put('/courses/:id', (req, res) => {
  return res.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
});

app.patch('/courses/:id', (req, res) => {
  return res.json(["Curso 6", "Curso 7", "Curso 3", "Curso 4"]);
});

app.delete('/courses/:id', (req, res) => {
  return res.json(["Curso 6", "Curso 2", "Curso 4"]);
});

app.listen(3000);
console.log('server running . . .');
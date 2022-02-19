const express = require('express');
const app = express();

app.get('/', (req, res) => {
  return res.json({ message: "ok hi!"});
});

app.listen(3333);
console.log('server running . . .');
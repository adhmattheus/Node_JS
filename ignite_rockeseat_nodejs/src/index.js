const express = require('express');
const app = express();

app.get('/', (req, res) => {
  return res.json({ message: "ok adh!"});
});

app.listen(3000);
console.log('server running . . .');
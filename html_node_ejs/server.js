const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const items = [
    {
      title: "D",
      message: "esenvolver aplicações fácil"
    },
    {
      title: "E",
      message: "JS usa javascript para renderizar HTML"
    },
    {
      title: "M",
      message: "uito bom"
    },
    {
      title: "A",
      message: "ltamente novo"
    },
    {
      title: "I",
      message: "nstall ejs"
    },
    {
      title: "S",
      message: "intaxe simples"
    }
  ];
  const subtitle = "uma linguagem de modelagem para criação de páginas html com js"
  res.render("pages/index", {
    qualitys: items,
    subtitle: subtitle,
  });
});

app.get("/sobre", function (req, res) {
  res.render("pages/about");
});

app.listen(8080);

console.log("servidor rodando . . . ")
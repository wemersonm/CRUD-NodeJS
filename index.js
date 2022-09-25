const express = require("express");
const app = express();
const connection = require("./database/database");
const bodyParser = require("body-parser");
const person = require("./database/Person");

connection
  .authenticate()
  .then(() => {
    // autenticar o banco de dados com o node (aplicacao)
    console.log("conexão feita com sucesso");
  })
  .catch((error) => {
    console.log(error);
  });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// rotas
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/registration", function (req, res) {
  res.render("registration");
});

app.post("/savePerson", (req, res) => {
  var name = req.body.inputName;
  var email = req.body.inputEmail;
  var rg = req.body.inputRG;
  var address = req.body.inputAddress;
  var city = req.body.inputCity;

  person
    .create({
      name: name,
      email: email,
      rg: rg,
      address: address,
      city: city,
    })
    .then(() => {
      res.redirect("/");
    });
});

app.get("/showUser", function (req, res) {
  // ROTA DA PAGINA INICIAL QUE LISTA AS PERGUNTAS FEITAS
  person
    .findAll({
      // TODOS DADOS QUE ESTA NA BASE DADOS PERGUNTA
      raw: true,
      order: [
        // (findAll == Select) seleciona as perguntas do banco de dados
        ["name", "ASC"], //ordernar por id  ASC = CRESC , DESC = DECRESC //
      ],
    })
    .then((peoples) => {
      //PEGA CADA PERGUNTA E RENDERIZAR NO INDEX.EJS(FRONT DA PAGINA INICIAL)
      res.render("showUser", {
        //renderizar no index.ejs do EJS as perguntas para mostrar lá
        peoples: peoples, //MANDA PARA O EJS RENDERIZAR NA PAG INICIAL DINAMINACAMENTE PARA USAR LÁ NO INDEX.EJS
      });
    });
});

app.get("/update/:id", (req, res) => {
  const id = req.params.id;

  person.findByPk(id).then((user) => {
    res.render("edit", { user: user });
  });
});

app.post("/updatePerson", (req, res) => {
  const id = req.body.id;
  const name = req.body.inputName;
  const email = req.body.inputEmail;
  const rg = req.body.inputRG;
  const address = req.body.inputAddress;
  const city = req.body.inputCity;

  person
    .update(
      {
        name: name,
        email: email,
        rg: rg,
        address: address,
        city: city,
      },
      {
        where: {
          id: id,
        },
      }
    )
    .then(() => {
      res.redirect("showUser");
    });
});

app.post("/delete", (req, res) => {
  const id = req.body.id;
  if (id) {
    person
      .destroy({
        where: {
          id: id,
        },
      })
      .then(() => {
        res.redirect("showUser");
      });
  }
});

app.get('/contact',(req,res)=>{
  res.render('contact');
})
app.listen(4003, () => {
  console.log("APP rodando");
});

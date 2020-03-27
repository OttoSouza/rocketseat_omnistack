//arquivo principal , importar o restantes das propriedadess
//express executar a aplicação
const express = require("express");
const cors = require('cors');
const routes = require("./routes");

//criando a aplicação
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(routes);

//aplicação executando na porta 3333
app.listen(3333);

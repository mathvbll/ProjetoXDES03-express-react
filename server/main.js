//Bibliotecas a serem utilizadas
const express = require('express');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const cors = require('cors');



//Inicialização
const app = express();


//Caminhos para router
const cardsRoute = require('./router/cards');
const authRoute = require('./router/auth');

//habilitar comunicação de origens diferentes
app.use(cors());

//Dividir os dados da requisição no req.body
app.use(express.json());

//Rotas
app.use('/cards',cardsRoute);
app.use('/auth',authRoute);




app.listen(3001,(req,res)=>{
    console.log('Servidor Ligado');
});






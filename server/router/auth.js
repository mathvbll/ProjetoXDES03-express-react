//Bibliotecas
const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


require('dotenv').config();


//Roteador 
const router = express.Router();


//Caminho do Banco de Decks e Usuários.
const UserPath = path.join(__dirname,'..','bd','users.json');
const DeckPath = path.join(__dirname,'..','bd','decks.json');

//Leitura do banco de Decks e de Usuários.
const Userbd = JSON.parse(fs.readFileSync(UserPath,{encoding:'utf8'})); //Transforma o arquivo lido em uma objeto Javascript
const Deckbd = JSON.parse(fs.readFileSync(DeckPath,{encoding:'utf-8'}));



const User = require('../models/usuario');
const Deck = require('../models/deck');

router.post('/login',async (req,res)=>{

        //Pega as informações no body da requisição
        const {username,password} = req.body;
        
        
        //Verificar se existe no banco
        for(let user of Userbd){
            if(user.username == username){
              
              const decPass = await bcrypt.compare(password,user.password);//Compara o password com o password encriptado.
              if(decPass){
                //criar token e enviar o token json
                
                const token = jwt.sign({
                  id: user.id,
                  username: user.username
                },process.env.SECRET_KEY,{expiresIn:800});
                return res.json(token);
              }
              

            }
        }
            
        return res.send("Usuário ou Senha Incorretos");


});

router.post('/register',async (req,res)=>{
      
      //Pega as informações no body da requisição
      const {username,email,password} = req.body;
 
      //Percorre o banco
      for(let usuario of Userbd){        
        //Verifica a existencia,no banco, do username ou email.
        if(usuario.username == username || usuario.email == email){
 
          return res.send('Email ou Usuario já existe');
            
        }    
    }

    //Criação do novo usuario e a adição do usuario no banco
    
    const id = Userbd.length+1; //Id do usuario.
    const salt= await bcrypt.genSalt(10); //Sequência de caracteres que serão utilizados para encriptar o password. 
    const encPass = await bcrypt.hash(password,salt);//Função para criar,junto com o salt um password encriptado.
    const newUser = new User(id,username,email,encPass);//Novo usuário.
    const newDeck = new Deck(id);
    Userbd.push(newUser); //Adiciona o usuário no Banco.
    Deckbd.push(newDeck); //Adiciona o deck ao banco
   

    //Tenta Sobscrever o banco (salvar o usuario/deck),se não der certo avisa o cliente.
    try{
      
      fs.writeFileSync(UserPath,JSON.stringify(Userbd,null,2));
      fs.writeFileSync(DeckPath,JSON.stringify(Deckbd,null,2));  
      return res.send('Usuario criado com sucesso');
    
    }catch(err){
      
      return res.send('Erro interno');
    
    }
    
    
  
});




module.exports = router;
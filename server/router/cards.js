//Bibliotecas
const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const jwt = require('jsonwebtoken')


require('dotenv').config();




//Roteador 
const router = express.Router();

//Caminho do banco dos decks
const DeckPath = path.join(__dirname,'..','bd','decks.json');

//Ler os deck salvos
const Deckbd = JSON.parse(fs.readFileSync(DeckPath,{encoding:'utf-8'}));

//URL da API
const Urlcards = `https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt&`;




router.post('/pesquisar',AuthToken,(req,res)=>{

        const {name} = req.body;

        const Qparams = {
            fname:name
        }
    
        //Chamar a Api com os Qparams salvos
        
            axios.get(Urlcards,{
                params:Qparams
            }).then((response)=>{
                return res.json(response.data);
            }).catch(error => {
                return res.json({error: "Nada encontrado"});
            });
   

    
     


});

//Ler o deck
router.get('/deck',AuthToken,(req,res)=>{
    
    const {id} = req.user;
    for(let deck of Deckbd){
        //Achar o deck pelo id do d
        if(deck.UserID == id){
            
            
            if(deck.cardlist.length ===0){
                //Se o deck estiver vazio
                return res.send('Deck Vazio') //Tratar Front
            }else{
                const cards = deck.cardlist.join();
                
                const params ={
                    id:cards
                }
                console.log(params)
                //Chamar a API
                axios.get(Urlcards,{
                        params:params
                }).then((response)=>{

                        //Json com os dados da resposta e a lista de carta do deck
                        const Datadeck ={
                             data:response.data.data,
                             cardlist:deck.cardlist
                        }
                        res.status(200).json(Datadeck);
                }).catch(error => {
                        res.json({error: "Nada encontrado"});
                    //Caso de erro na resposta quer dizer que a pesquisa não achou Nada.
                    
                    });
                    
            }
           
           
           
        }
        
      
       
        
    }

});


//Deletar  carta
router.delete('/deck',AuthToken,(req,res)=>{
 
      
    //Pega as informações do body e o id do usuario
    const {id} = req.user;
    const {card} = req.body;
    
    
    let i = 0;
    for(let deck of Deckbd){
   
        if(deck.UserID == id){
            //Remover o elemento do banco
            //Indice do deck a ser deletado,definido pelo id recebido
            
            const cardindex = Deckbd[i].cardlist.indexOf(card);
    
            //Procurar  a carta no banco
            if(cardindex ===(-1)){
                //Não encontrado
                return res.send("Carta Não existe");
            }else{

                 Deckbd[i].cardlist.splice(cardindex,1);
            
                    //Tentar Salvar a alteração no banco
                    try{
                
                        fs.writeFileSync(DeckPath,JSON.stringify(Deckbd,null,2)); 
                        return res.send('Carta deletado com sucesso');
                    
                    }catch(err){
                        
                        return res.send('Falha ao deletar Carta');
                    
                    }
            }
        }
            
      i++;  
    }
    return res.send('Erro desconhecido');
   
    
           
});

//Salvar carta
router.put('/deck',AuthToken,(req,res)=>{

    
    //Pega as informações do body
    const {id} = req.user;
    const {card} = req.body;

    let index = 0;
    for(let deck of Deckbd){
        if(deck.UserID == id){

            Deckbd[index].cardlist.push(card);
      
            //Tentar Salvar a alteração no banco
            try{
        
                fs.writeFileSync(DeckPath,JSON.stringify(Deckbd,null,2)); 
                return res.send('Carta Salva com sucesso');
              
              }catch(err){
                
                return res.send('Falha ao Salvar Carta');
              
              }
           
        }
            
        index++;
    }
    return res.send('Erro desconhecido');
   
    
           


});

function AuthToken(req,res,next){
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if(token === null) return res.status(401).send('Token não encontrado');
    
    //verificando o token
    try {
        const user = jwt.verify(token,process.env.SECRET_KEY);
        req.user = user;
        console.log(user);
        next(); //Se token é válido, avança chamando next()
    } catch (error) {
        res.status(403).send('Token inválido');
    }
   
}



module.exports = router;
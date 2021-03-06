var express = require('express');
var mysql = require('mysql');
var app = express();
const bodyParser= require('body-parser');
app.use(bodyParser.json());
var crypto = require('crypto');
var uuid = require ('uuid');
app.use(bodyParser.urlencoded({extended: true}));
var multer, storage, path;
multer = require('multer')
path = require('path');
var fs = require('fs');
var http = require('http');



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
//database connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database:'techtest',
    port: 3308
});
connection.connect();

// server creation
var server = app.listen(3007,function(){
    var host = server.address().address;
    var port = server.address().port;
      console.log("Server is up and listening on 3007...");
});

app.get('/Tri',function(req,res){
    var query = "select * from tech";
   connection.query(query,function(error,results){
    if (error) throw error;
    res.setHeader('Content-Type', 'application/json');
    res.send(results);
})
});



app.post('/trinumber',function(req,res){

var tab = [];
var ordre = req.body.ordre;


tab[0]=req.body.number1;
tab[1]=req.body.number2;
tab[2]=req.body.number3;
tab[3]=req.body.number4;
tab[4]=req.body.number5;


  function sortAsc(tab){
for(var i = 0; i < tab.length; i++){
  //stocker l'index de l'élément minimum
  var min = i;
  for(var j = i+1; j < tab.length; j++){
    if(tab[j] < tab[min]){
     // mettre à jour l'index de l'élément minimum
     min = j;
    }
  }
  var tmp = tab[i];
  tab[i] = tab[min];
  tab[min] = tmp;
}
return tab;
};

function sortDesc(tab){
for(var i = 0; i < tab.length; i++){
//stocker l'index de l'élément minimum
var max = i;
for(var j = i+1; j < tab.length; j++){
  if(tab[j] > tab[max]){
   // mettre à jour l'index de l'élément minimum
   max = j;
  }
}
var tmp = tab[i];
tab[i] = tab[max];
tab[max] = tmp;
}
return tab;
};

if(ordre==1) {
  var query1 = "INSERT INTO `tech`(`liste`, `ordre`, `listetri`) VALUES (?,?,?)";
connection.query(query1,[JSON.stringify(tab),req.body.ordre,JSON.stringify(sortAsc(tab))],function(error,results){
  if (error) { res.send(JSON.stringify(error)) }
  else{ res.send(JSON.stringify(tab)) }
  })
}else{
  var query1 = "INSERT INTO `tech`(`liste`, `ordre`, `listetri`) VALUES (?,?,?)";
connection.query(query1,[JSON.stringify(tab),req.body.ordre,JSON.stringify(sortDesc(tab))],function(error,results){
  if (error) { res.send(JSON.stringify(error)) }
  else{ res.send(JSON.stringify(tab)) }
  })
}




});

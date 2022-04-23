var fs = require('fs')
var ex = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = ex();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var jsonData=JSON.parse(fs.readFileSync('./dataset/netflix_titles.json', 'utf8'));


app.post("/fetchall",async(req,res)=>{
    var key=req.body.key
    if(key==="adminone"){
        return res.send(jsonData)
    }
    return res.send("wrong key")
})

app.post("/getfilterby",async(req,res)=>{
  var key=req.body.key
  if(key==="adminone"){
      return res.send(Object.keys(jsonData[0]))
  }
  return res.send("wrong key")
})

app.post("/filter",async(req,res)=>{
  var key=req.body.key
    if(key==="adminone" && req.body.searchindex>=0 && req.body.searchindex<12 ){
      var sendData=[]
      for (var movie of jsonData){
        var data=Object.values(movie)
        

          var datakey=data[req.body.searchindex]+""
          if(datakey!==""){
          
          var index=datakey.toLowerCase().search(req.body.searchkey.toLowerCase())
          
          if(index!==-1){
            sendData.push(movie)
           
          }
        }
        
        
      }
        return res.send(sendData)
    }
    return res.send("wrong key")
})

app.listen(process.env.PORT || 8080, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});


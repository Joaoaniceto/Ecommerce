 const express = require('express');
 const mongoose = require('mongoose');
 const morgan = require('morgan');
 const helmet = require('helmet');
 const bodyParser = require('body-parser');
 const cors = require('cors');
 const { readdirSync }=require('fs');
 require('dotenv').config();



//iumport routes

const authRoutes = require('./routes/auth');

//app
 const app = express();

  //middlewares
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(bodyParser.json({limit:"2mb"}))
  app.use(cors());


  readdirSync('./routes').map((rout)=> app.use("/api",require('./routes/' + rout)))


  mongoose.connect(process.env.DATABASE,{
    useNewUrlParseR:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
   
  })
  .then(()=>console.log('succes'))
  .catch((e)=>{
      console.log(e)
  });
 
 



//route
 app.get('/',(req,res)=>{
     res.json({
         message:'random'
     })
 })

 //port

 app.listen(process.env.PORT || 8000);




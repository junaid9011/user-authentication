require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const errorMiddleware = require('./Middleware/Error')
const bodyParser = require('body-parser')
const passport = require('passport')
const corsOptions ={
    origin:'*', //allowing only this origin
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    
}
app.use(cors(corsOptions));



app.use(express.json({
    limit: '50mb'
  }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}))
require('./Middleware/passport')(passport)
app.use(passport.initialize());




//importes all routes
const user=require('./Routes/user.route');
const transaction=require('./Routes/transaction.route');



app.use('/auth',user);
app.use('/payments',transaction);



//Middleware to handle erros
app.use(errorMiddleware)

module.exports = app;
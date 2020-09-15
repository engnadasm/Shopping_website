const express = require('express');//for server
const mongoose = require('mongoose');//we use it as database
const bodyParser = require('body-parser');//take request and get date from the body
const items = require('./routes/api/items');
const path = require('path');

const app = express();

//bodyParser Middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongodb

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(console.log('mongoDB Connected.....')).catch(err =>console.log(err));

//Use routes
app.use('/api/items', items);

// server
if(process.env.NODE_ENV == 'production'){
  app.use(express.static('react_web/build'));

  app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'react_web', 'build', 'index.html'));

  });
}

const port = process.env.PORT || 5000;
console.log(db)
app.listen(port, () => console.log('Server started on port' + port));

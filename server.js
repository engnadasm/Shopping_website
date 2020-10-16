const express = require('express');//for server
const mongoose = require('mongoose');//we use it as database
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const messages = require('./routes/api/messages');
const auth = require('./routes/api/auth');

const config = require('config');

const path = require('path');

const app = express();

//bodyParser Middleware
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// connect to mongodb

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify : false,
    useUnifiedTopology: true, 
  }).then(console.log('mongoDB Connected.....')).catch(err =>console.log(err));

//Use routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/messages', messages);
app.use('/api/auth', auth);

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

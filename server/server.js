const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./question');
const mongoURL = 'mongodb+srv://Matt_user:rSuc44wgdq84fb2Q@cluster0.7zutw.mongodb.net/Cluster0?retryWrites=true&w=majority';

const question = mongoose.model('question');

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=>{
    console.log('connected to mongo');
});

mongoose.connection.on('error', (err)=>{
    console.log(err);
});

app.get('/', (req, res) => {
    res.send('hello there');
});

app.listen(3000, function () {
    console.log('listening on 3000');
});
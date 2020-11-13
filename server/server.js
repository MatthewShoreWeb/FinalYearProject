const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//https://www.youtube.com/watch?v=S7Qxt9ncCv4&ab_channel=CODERSNEVERQUIT
const mongoURL = 'mongodb+srv://Matt_user:FL3eCPkEp0JOD2Bg@cluster0.7zutw.mongodb.net/Cluster0?retryWrites=true&w=majority';

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
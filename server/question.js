const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question:String,
    answerOne:String,
    answerTwo:String,
    answerThree:String,
    answerFour:String,
    correctAnswer:String
});


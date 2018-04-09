const 
    mongoose = require('mongoose'),
    answerSchema = new mongoose.Schema({
        answer: String
    }),
    questionSchema = new mongoose.Schema({
        question: String,
        answers: [answerSchema],
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }, {timestamps: true})

    const Question = mongoose.model('Question', questionSchema)
    module.exports = Question 
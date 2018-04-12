const 
    mongoose = require('mongoose'),
    answerSchema = new mongoose.Schema({
        body: String,
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }),
    questionSchema = new mongoose.Schema({
        body: String,
        answers: [answerSchema],
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }, {timestamps: true})

    const Question = mongoose.model('Question', questionSchema)
    module.exports = Question 
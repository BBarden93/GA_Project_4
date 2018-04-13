const 
	User = require('../models/User.js'),
	Question = require('../models/Question.js'),
	signToken = require('../serverAuth.js').signToken

module.exports = {
	// list all questions
	index: (req, res) => {
		Question.find({})
		.select('-answers')
		.populate('user')
		.exec((err, questions) => {
			res.json(questions)
		})
	},

	// get one question
	show: (req, res) => {
		console.log(req.question)
		Question.findById(req.params.id)
		.populate('user')
		.populate('answers.user')
		.exec((err, question) => {
			res.json(question)
		})
	},

	// create a new question 
	create: (req, res) => {
		console.log("REQUEST BODY:")
		console.log(req.body)
		// console.log(req.user)
		Question.create({ ...req.body, user: req.user }, (err, question) => {
			if(err) return res.json({success: false, code: err.code})
			res.json({success: true, message: "Question created.", question})
			console.log(question)
		})
	},

	// update an existing question
	update: (req, res) => {
		Question.findById(req.params.id, (err, user) => {
			Object.assign(question, req.body)
			question.save((err, answer) => {
				const token = signToken(answer)
				res.json({success: true, message: "User updated.", answer, token})
			})
		})
	},

	// delete an existing question
	destroy: (req, res) => {
		Question.findByIdAndRemove(req.params.id, (err, thatQuestion) => {
			res.json({success: true, message: "Question deleted.", thatQuestion})
		})
	},

	// the login route
	authenticate: (req, res) => {
		// check if the user exists
		Question.findOne({email: req.body.email}, (err, user) => {
			// if there's no user or the password is invalid
			if(!user || !user.validPassword(req.body.password)) {
				// deny access
				return res.json({success: false, message: "Invalid credentials."})
			}

			const token = signToken(user)
			res.json({success: true, message: "Token attached.", token})
		})
	},

	// Add an answer to a question
	addAnswer: (req, res) => {
		console.log(req.body)
		Question.findById(req.params.id)
			.populate('answers.user')
			.exec((err, question) => {
			question.answers.push({ ...req.body, user: req.user })
			question.save((err, answeredQuestion) => {
				res.json({ success: true, message: "Question answered", question: answeredQuestion})
			})
		})		
	}
}
const User = require('../models/User.js')
const Question = require('../models/Question.js')

module.exports = {
	// list all questions
	index: (req, res) => {
		Question.find({}, (err, questions) => {
			res.json(questions)
		})
	},

	// get one question
	show: (req, res) => {
		console.log("Current User:")
		console.log(req.user)
		Question.findById(req.params.id, (err, question) => {
			res.json(question)
		})
	},

	// create a new question 
	create: (req, res) => {
		Question.create(req.body, (err, question) => {
			if(err) return res.json({success: false, code: err.code})
			res.json({success: true, message: "Question created."})
		})
	},

	// delete an existing question
	destroy: (req, res) => {
		Question.findByIdAndRemove(req.params.id, (err, question) => {
			res.json({success: true, message: "Question deleted.", question})
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
	}
}
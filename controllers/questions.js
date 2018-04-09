const User = require('../models/User.js')
const signToken = require('../serverAuth.js').signToken

module.exports = {
	// list all users
	index: (req, res) => {
		Question.find({}, (err, questions) => {
			res.json(questions)
		})
	},

	// get one user
	show: (req, res) => {
		console.log("Current User:")
		console.log(req.user)
		Question.findById(req.params.id, (err, question) => {
			res.json(question)
		})
	},

	// create a new user
	create: (req, res) => {
		Question.create(req.body, (err, question) => {
			if(err) return res.json({success: false, code: err.code})
			// once question is created, generate a token to "log in":
			const token = signToken(question)
			res.json({success: true, message: "Question created. Token attached.", token})
		})
	},

	// update an existing question
	// update: (req, res) => {
	// 	Question.findById(req.params.id, (err, question) => {
	// 		Object.assign(question, req.body)
	// 		question.save((err, updatedQuestion) => {
	// 			res.json({success: true, message: "Question updated.", question})
	// 		})
	// 	})
	// },

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
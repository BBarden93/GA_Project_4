const
	dotenv = require('dotenv').load(),
	express = require('express'),
	app = express(),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/the-inquiry',
	PORT = process.env.PORT || 3001,
	usersRoutes = require('./routes/users.js'),
	questionsRoutes = require('./routes/questions.js'),
	Question = require('./models/Question.js')

mongoose.connect(MONGODB_URI, (err) => {
	console.log(err || `Connected to MongoDB.`)
})

app.use(express.static(`${__dirname}/client/build`))
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
	res.json({message: "API root."})
})

app.use('/api/users', usersRoutes)
app.use('/api/questions', questionsRoutes)

app.delete('/api/answers/:id', (req, res) => {
	Question.findOne({ 'answers._id': req.params.id })
	.populate('answers.user')
	.exec((err, question) => {
		question.answers.id(req.params.id).remove()
		question.save((err, updatedQuestion) => {
			res.json({ success: true, message: "answer deleted.", question: updatedQuestion })
		})
	})
})

app.use('*', (req, res) => {
	res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, (err) => {
	console.log(err || `Server running on port ${PORT}.`)
})
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const Person = require('./models/person')
const app = express()
  app.use(express.json())

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons =>{
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
    const now = new Date()
    Person.countDocuments({}).then(count =>{
      response.send(
  `<p>Phonebook has info for ${count} people</p>
  <p>${now}</p>`
   )
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
})
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
}) 

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  Person.findOne({ name: body.name }).then(existingPerson => {
    if (existingPerson) {
      return response.status(400).json({ error: 'name must be unique' })
    }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
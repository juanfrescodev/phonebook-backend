const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstackopen:${password}@cluster0.zsxaa6f.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const args = process.argv.length

if (args ===3){
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
    console.log(person.name, person.number)
  })
  mongoose.connection.close()
})
}

else if (args === 5) {


const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

person.save().then(result => {
  console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
  mongoose.connection.close()
})
}

else {
  console.log('numero incorrecto de argumentos')
  mongoose.connection.close()
}



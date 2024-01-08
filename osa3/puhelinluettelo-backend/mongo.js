const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
} else if(process.argv.length==3) {

    const password = process.argv[2]

    const url =
    `mongodb+srv://fullstack:${password}@fullstackcluster.dhxquql.mongodb.net/phonebookApp?retryWrites=true&w=majority`

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })

} else if(process.argv.length==5) {

    const password = process.argv[2]
    const personName = process.argv[3]
    const personNumber = process.argv[4]

    const url =
    `mongodb+srv://fullstack:${password}@fullstackcluster.dhxquql.mongodb.net/phonebookApp?retryWrites=true&w=majority`

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    const person = new Person({
        name: personName,
        number: personNumber,
    })

    person.save().then(result => {
        console.log(`added ${personName} ${personNumber} to phonebook`)
        mongoose.connection.close()
    })

} else {
    console.log('invalid number of arguments')
    process.exit(1)
}


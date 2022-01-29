const notes = require('express').Router()
const { readAndWriteFile, readFile, deleteNote } = require('../helpers/fsUtils')
const generateRandomID = require('../helpers/randomIDgenerator')

notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved. 'db.json' being read.`);
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

notes.post('/', (req, res) => {
    console.info(`${req.method} request recieved\n==========\nADDING NOTE`)
    console.info(`==========`)
    console.log(req.body)
    console.info(`==========`)

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: generateRandomID(),
        }
        readAndWriteFile(newNote, './db/db.json')
        console.info(`Database updated!`)
        readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))  //updates the note taker to show newly added note
    } else {
        res.error('Error in adding Note')
    }
})

// responsible for deleting note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id
    deleteNote('./db/db.json', noteId)
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))

})

module.exports = notes
const notes = require('express').Router()
const { readAndWriteFile, readFromFile, deleteNote } = require('../helpers/fsUtils')
const generateRandomID = require('../helpers/randomIDgenerator')
const notesDatabase = require('../db/db.json')

notes.get('/', (req, res) => {
    console.info(`Notes have been pulled from DB because ${req.method} request has been recieved`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

notes.post('/', (req, res) => {
    console.info(`${req.method} request recieved to add a note`)
    console.log(req.body)

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: generateRandomID(),
        }
        readAndWriteFile(newNote, './db/db.json')
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    } else {
        res.error('Error in adding Note')
    }
})

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id
    deleteNote('./db/db.json', noteId)
    // console.log(notesDatabase.filter(
    //     function getObjectFromId(note) {
    //         return note.id === noteId
    //     }))
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))

})

module.exports = notes
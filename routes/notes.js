const notes = require('express').Router()
const { readAndWriteFile, readFile } = require('../helpers/fsUtils')

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))})

// app.get('/api/notes', (req, res) => res.json(notes))
notes.post('/', (req, res) => {
    console.info(`${req.method} request recieved to add a note`)
    console.log(req.body)
    
    const { title, text } = req.body;
    
    if (title && text) {
        const newNote = {
            title,
            text,
        }
        readAndWriteFile(newNote, './db/db.json') 
        const response = {
            status: 'success',
            body: newNote
        }
        console.info(response)
        // res.status(201).json(response);
    } else {
        // res.status(500).json('Error in posting note')
        res.error('Error in adding Note')
    }
})

module.exports = notes
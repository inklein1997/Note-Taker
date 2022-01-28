const notes = require('express').Router()
const { readAndWriteFile, readFromFile } = require('../helpers/fsUtils')

notes.get('/', (req, res) => {
    console.info(`Notes have been pulled from DB because ${req.method} request has been recieved`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))})

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
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    } else {
        res.error('Error in adding Note')
    }
})

module.exports = notes
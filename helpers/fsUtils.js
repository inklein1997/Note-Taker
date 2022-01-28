const fs = require('fs')
const util = require('util');
const notes = require('../routes/notes');

const readFromFile = util.promisify(fs.readFile)

const readAndWriteFile = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data)
            parsedData.push(content);
            writeToFile(file, parsedData)
            console.log("content")
        }
    })
}

const deleteNote = (file, noteId) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err) 
        } else {
            const parsedData = JSON.parse(data)
            const selectedNote = parsedData.filter(() => {
                return notes.id === noteId
            })
            console.log(selectedNote)
            const newArray = parsedData.splice(parsedData.indexOf(selectedNote), 1)
            writeToFile(file, newArray)
        }
    })
}


function writeToFile(fileName, content) {
    fs.writeFile(fileName, JSON.stringify(content, null, 2), (err) => err ? console.error(err) : console.info(`\nData written to ${fileName}`))
}
module.exports = { readAndWriteFile, readFromFile, deleteNote }
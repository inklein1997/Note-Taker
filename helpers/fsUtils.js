const fs = require('fs');
const { parse } = require('path');
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

const getNoteIndex = (parsedData, noteId) => {
    for(let i = 0; i<parsedData.length; i++) {
        if (parsedData[i].id == noteId) {
            return i
        }
    }}

const deleteNote = (file, noteId) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err) 
        } else {
            const parsedData = JSON.parse(data)
            console.log('DATA ARRAY')
            parsedData.splice(getNoteIndex(parsedData, noteId),1)
            console.log(parsedData)
            // getNoteIndex(parsedData, noteId)
            writeToFile(file, parsedData)
            // const newArray = parsedData.splice(parsedData.indexOf(selectedNote), 1)
            // writeToFile(file, newArray)
        }
    })
}



function writeToFile(fileName, content) {
    fs.writeFile(fileName, JSON.stringify(content, null, 2), (err) => err ? console.error(err) : console.info(`\nData written to ${fileName}`))
}
module.exports = { readAndWriteFile, readFromFile, deleteNote }
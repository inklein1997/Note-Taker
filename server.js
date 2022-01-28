const express = require('express');
const path = require('path');
const api = require('./routes/index.js')

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Get route for Index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
  console.info(`You are being directed to index.html`)
});

// Get route for Notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
  console.info(`You are being redirected to notes.html`)
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

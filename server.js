const express = require('express');
const path = require('path');
// Helper fs functions
const {readFromFile, writeToFile, readAndAppend, readAndDelete} = require('./utils/helpers');
const {v4: uuidv4} = require("uuid")
const db = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
})

app.post("/api/notes", (req, res) => {
    const note = req.body;
    note.id = uuidv4();

    readAndAppend(note, "./db/db.json")
    res.json(note)
})

app.delete("/api/notes/:id", (req, res) => {

})


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

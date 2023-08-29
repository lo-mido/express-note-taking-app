const express = require('express');
const path = require('path');
// Helper fs functions
const {readFromFile, readAndAppend, readAndDelete} = require('./utils/helpers');
const {v4: uuidv4} = require("uuid")

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
// gets the html index file from the public folder and notes html file.
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
})
// reads the file
app.post("/api/notes", (req, res) => {
    const note = req.body;
    note.id = uuidv4();
// gets the code for a unique identifier for each different note created by user into database file
    readAndAppend(note, "./db/db.json")
    res.json(note)
})
// the request to delete a note from the database
app.delete("/api/notes/:id", (req, res) => {
    readAndDelete(req.params.id, "./db/db.json")
    res/json({ok: true})
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

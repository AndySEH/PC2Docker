const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Objeto para almacenar temporalmente las notas de los estudiantes
const notas = {};

// Función para manejar la solicitud de agregar una nota
app.post('/addNote', (req, res) => {
    const { idEstudiante, nota } = req.body;
    if (!idEstudiante || !nota) {
        return res.status(400).send('Faltan campos obligatorios');
    }
    if (!notas[idEstudiante]) {
        notas[idEstudiante] = [];
    }
    notas[idEstudiante].push(nota);
    res.status(201).send('Nota agregada correctamente');
});

// Función para manejar la solicitud de listar las notas de un estudiante
app.get('/listNotes/:idEstudiante', (req, res) => {
    const idEstudiante = req.params.idEstudiante;
    const studentNotes = notas[idEstudiante];
    if (!studentNotes) {
        return res.status(404).send('Estudiante no encontrado');
    }
    res.status(200).json(studentNotes);
});

// Función para manejar la solicitud de actualizar una nota de un estudiante
app.put('/updateNote/:idEstudiante', (req, res) => {
    const idEstudiante = req.params.idEstudiante;
    const { oldNote, newNote } = req.body;
    if (!idEstudiante || !oldNote || !newNote) {
        return res.status(400).send('Faltan campos obligatorios');
    }
    const studentNotes = notas[idEstudiante];
    if (!studentNotes) {
        return res.status(404).send('Estudiante no encontrado');
    }
    const index = studentNotes.indexOf(oldNote);
    if (index === -1) {
        return res.status(404).send('La nota no se encontró para este estudiante');
    }
    studentNotes[index] = newNote;
    res.status(200).send('Nota actualizada correctamente');
});

// Puerto en el que el servidor de notas escucha
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Notas server running on port ${PORT}`);
});

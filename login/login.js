const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Objeto para almacenar temporalmente los usuarios registrados
const users = {};

// Función para manejar la solicitud de registro (Signup)
app.post('/auth/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Faltan campos obligatorios');
    }
    if (users[username]) {
        return res.status(409).send('El usuario ya está registrado');
    }
    users[username] = password;
    res.status(201).send('Usuario registrado correctamente');
});

// Función para manejar la solicitud de inicio de sesión (Login)
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Faltan campos obligatorios');
    }
    if (users[username] && users[username] === password) {
        return res.status(200).send('Inicio de sesión exitoso');
    }
    res.status(401).send('Credenciales inválidas');
});

// Puerto en el que el servidor de login escucha
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Login server running on port ${PORT}`);
});

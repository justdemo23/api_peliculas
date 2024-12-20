const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',  // Usuario de la base de datos
    password: '', // Contraseña de la base de datos
    database: 'cineDB'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});


// GET - Obtener todas las peliculas
app.get('/peliculas', (req, res) => {
    db.query('SELECT * FROM peliculas', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

// post - Crear una nueva pelicula
app.post('/peliculas', (req, res) => {
    const { titulo, duracion, sala, clasificacion, tanda } = req.body;
    db.query('INSERT INTO peliculas (titulo, duracion, sala, clasificacion, tanda) VALUES (?, ?, ?, ?, ?)',
        [titulo, duracion, sala, clasificacion, tanda],
        (err, result) => {
            if (err) throw err;
            res.send('Pelicula creada!');
        });
});

// ELIMINAR PELICULA POR ID
app.delete('/peliculas/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM peliculas WHERE id = ?', id, (err, result) => {
        if (err) throw err;
        res.send('Pelicula eliminada!');
    });
});

// ACTUALIZAR PELICULA POR ID
app.put('/peliculas/:id', (req, res) => {
    const id = req.params.id;
    const { titulo, duracion, sala, clasificacion, tanda } = req.body;
    db.query('UPDATE peliculas SET titulo = ?, duracion = ?, sala = ?, clasificacion = ?, tanda = ? WHERE id = ?',
        [titulo, duracion, sala, clasificacion, tanda, id],
        (err, result) => {
            if (err) throw err;
            res.send('Pelicula actualizada!');
        });
});

// venta de peliculas
app.post('/ventas', (req, res) => {
    const { fecha_venta, pelicula_id, cantidad_tickets, numero_factura, tanda } = req.body;
    const sql = 'INSERT INTO ventas (fecha_venta, pelicula_id, cantidad_tickets, numero_factura, tanda) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [fecha_venta, pelicula_id, cantidad_tickets, numero_factura, tanda], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(404).send({ message: 'Error al agregar la venta', error: error });
        }
        res.send({ message: 'Venta agregada exitosamente', id: results.insertId });
    });
});

// ver todas las ventas
app.get('/ventas', (req, res) => {
    db.query('SELECT * FROM ventas', (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

// ELIMINAR VENTA POR ID
app.delete('/ventas/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM ventas WHERE id = ?', id, (err, result) => {
        if (err) throw err;
        res.send('Venta eliminada!');
    });
});

// ACTUALIZAR VENTA POR ID
app.put('/ventas/:id', (req, res) => {
    const id = req.params.id;
    const { fecha_venta, pelicula_id, cantidad_tickets, numero_factura, tanda } = req.body;
    db.query('UPDATE ventas SET fecha_venta = ?, pelicula_id = ?, cantidad_tickets = ?, numero_factura = ?, tanda = ? WHERE id = ?',
        [fecha_venta, pelicula_id, cantidad_tickets, numero_factura, tanda, id],
        (err, result) => {
            if (err) throw err;
            res.send('Venta actualizada!');
        });
});

// Obtener todas las ventas de una pelicula
app.get('/ventas/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM ventas WHERE pelicula_id = ?', id, (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hospital_management_system',
    password: '1234',
    port: 5432,
});

app.post('/addPatient', (req, res) => {
    const { name, gender, age, phone, date, department, time, symptoms, email } = req.body;
    pool.query('INSERT INTO patients (name, gender, age, phone, date, department, time, symptoms, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [name, gender, age, phone, date, department, time, symptoms, email],
        (error, result) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Error adding patient' });
            } else {
                res.status(200).json(result.rows[0]);
            }
        }
    );
});

// Route to fetch existing patient data
app.get('/getPatients', (req, res) => {
    pool.query('SELECT * FROM patients', (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Error fetching patients' });
        } else {
            res.status(200).json(result.rows);
        }
    });
});

app.delete('/deletePatient/:id', (req, res) => {
    const patientId = req.params.id;
    pool.query('DELETE FROM patients WHERE id = $1', [patientId], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Error deleting patient' });
        } else {
            res.status(200).json({ message: 'Patient deleted successfully' });
        }
    });
});



app.post('/addHospitalRecord', (req, res) => {
    const { name, hospitalId, residence, gender, dob, illness, doctor, lastVisited, stage } = req.body;
    pool.query('INSERT INTO hospital_records (name, hospital_id, residence, gender, dob, illness, doctor, last_visited, stage) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [name, hospitalId, residence, gender, dob, illness, doctor, lastVisited, stage],
        (error, result) => {
            if (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Error adding hospital record' });
            } else {
                res.status(200).json(result.rows[0]);
            }
        }
    );
});

app.get('/searchHospitalRecord/:id', (req, res) => {
    const hospitalId = req.params.id;
    pool.query('SELECT * FROM hospital_records WHERE hospital_id = $1', [hospitalId], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Error searching hospital record' });
        } else {
            res.status(200).json(result.rows);
        }
    });
});

app.get('/getHospitalRecords', (req, res) => {
    pool.query('SELECT * FROM hospital_records', (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Error fetching hospital records' });
        } else {
            res.status(200).json(result.rows);
        }
    });
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

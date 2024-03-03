# Hospital-Management-System
 using vanilla js and postgres database
CREATE TABLE hospital_records (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    hospital_id VARCHAR(20) NOT NULL,
    residence VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    dob DATE NOT NULL,
    illness VARCHAR(100) NOT NULL,
    doctor VARCHAR(100) NOT NULL,
    last_visited DATE NOT NULL




    CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    age INTEGER NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    department VARCHAR(100) NOT NULL,
    time VARCHAR(20) NOT NULL,
    symptoms TEXT NOT NULL,
    email VARCHAR(100) NOT NULL
);

import mysql2 from 'mysql2'

export const db = mysql2.createConnection({
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE, 
    host: process.env.HOST,
})
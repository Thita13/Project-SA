// src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// เชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'rootpassword',
  database: process.env.DB_NAME || 'it_ticket_db',
});

db.connect(err => {
  if (err) {
    console.error(' Database connection failed:', err);
  } else {
    console.log(' Connected to MySQL database');
  }
});

// ตัวอย่าง route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

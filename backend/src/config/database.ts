import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "AnjanaKavee@1924",
  database: process.env.DB_NAME || "library_management",
  port: Number(process.env.DB_PORT) || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testDatabase() {
  try {
    const connection = await pool.getConnection();

    console.log("✅ MySQL connected successfully!");

    const [rows] = await connection.query(
      "SELECT DATABASE() AS database_name"
    );

    console.log("Connected database:", rows);

    connection.release();

  } catch (error) {
    console.error("❌ MySQL connection failed:");
    console.error(error);
  }
}

testDatabase();

export default pool; 
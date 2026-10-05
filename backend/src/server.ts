import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import pool from "./config/database";

const app = express();

const PORT = 5000;

/*
  Allow React frontend to communicate
  with this backend.
*/
app.use(cors());

/*
  Allow Express to read JSON data
  sent by React.
*/
app.use(express.json());

/*
  Authentication routes
*/
app.use("/api/auth", authRoutes);

/*
  Test route
*/
app.get("/", (req, res) => {
  res.json({
    message: "Library Management API is running"
  });
});

/*
  Start server
*/
app.listen(PORT, () => {
  console.log(
    `Backend running on http://localhost:${PORT}`
  );
});
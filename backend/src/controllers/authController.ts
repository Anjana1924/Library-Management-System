import { Request, Response } from "express";
import bcrypt from "bcrypt";

import pool from "../config/database";


// ============================
// REGISTER
// ============================

export const registerUser = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      regNo,
      email,
      password
    } = req.body;

    if (
      !regNo ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        message:
          "Please fill in all fields."
      });

    }

    /*
      Check registration number
    */

    const [existingRegNo]: any =
      await pool.execute(
        `
        SELECT id
        FROM users
        WHERE reg_no = ?
        `,
        [regNo]
      );

    if (existingRegNo.length > 0) {

      return res.status(409).json({
        message:
          "Registration number already exists."
      });

    }

    /*
      Check email
    */

    const [existingEmail]: any =
      await pool.execute(
        `
        SELECT id
        FROM users
        WHERE email = ?
        `,
        [email]
      );

    if (existingEmail.length > 0) {

      return res.status(409).json({
        message:
          "Email already exists."
      });

    }

    /*
      Hash password
    */

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    /*
      Insert user into MySQL
    */

    await pool.execute(
      `
      INSERT INTO users
      (reg_no, email, password, role)
      VALUES (?, ?, ?, ?)
      `,
      [
        regNo,
        email,
        hashedPassword,
        "student"
      ]
    );

    return res.status(201).json({

      message:
        "Account created successfully."

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      message:
        "Server error."

    });

  }
};


// ============================
// LOGIN
// ============================

export const loginUser = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      regNo,
      password
    } = req.body;

    if (
      !regNo ||
      !password
    ) {

      return res.status(400).json({

        message:
          "Please enter registration number and password."

      });

    }

    /*
      Find user in MySQL
    */

    const [rows]: any =
      await pool.execute(
        `
        SELECT
          id,
          reg_no,
          email,
          password,
          role
        FROM users
        WHERE reg_no = ?
        `,
        [regNo]
      );

    if (rows.length === 0) {

      return res.status(401).json({

        message:
          "Invalid registration number or password."

      });

    }

    const user = rows[0];

    /*
      Compare entered password
      with hashed password
    */

    const passwordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordCorrect) {

      return res.status(401).json({

        message:
          "Invalid registration number or password."

      });

    }

    /*
      Send user information
      back to React
    */

    return res.status(200).json({

      message:
        "Login successful.",

      user: {

        id: user.id,

        regNo: user.reg_no,

        email: user.email,

        role: user.role

      }

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      message:
        "Server error."

    });

  }
};
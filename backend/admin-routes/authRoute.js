import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Admin login
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate user in DB
    const [rows] = await db.query(
      "SELECT * FROM admins WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = rows[0];

    // Return token to client
    res.status(200).json({
      message: "Login successful",
      admin
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

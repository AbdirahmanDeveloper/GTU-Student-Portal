import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { reg_number, unit_code, group } = req.body;

    // Get unit details from timetable
    const [unitRows] = await db.query(
      "SELECT unit_name, lecturer FROM timetable WHERE unit_code = ? LIMIT 1",
      [unit_code]
    );

    if (unitRows.length === 0) {
      return res.status(404).json({ message: "Unit not found in timetable" });
    }

    const { unit_name, lecturer } = unitRows[0];

    // Check if the user has already registered this unit
    const [existingUnit] = await db.query(
      "SELECT * FROM registered_courses WHERE reg_number = ? AND unit_code = ?",
      [reg_number, unit_code]
    );

    if (existingUnit.length > 0) {
      return res.status(400).json({ message: "Unit already registered" });
    }

    // Insert the registration
    await db.query(
      `INSERT INTO registered_courses
       (reg_number, unit_code, unit_name, \`group\`, lecturer)
       VALUES (?, ?, ?, ?, ?)`,
      [reg_number, unit_code, unit_name, group, lecturer]
    );

    return res.status(200).json({ message: "Unit registered successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async(req,res) => {
    try{

        const {reg_number} = req.query;
        const [rows] = await db.query("SELECT * FROM registered_courses WHERE reg_number = ?", [reg_number]);

        return res.status(200).json({message:"courses fetched succefully", courses: rows});
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
})

export default router;

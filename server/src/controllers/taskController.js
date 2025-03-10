import Task from "../models/Task.js";
import Agent from "../models/Agent.js";
import cloudinary from "../config/cloudinary.js";
import xlsx from "xlsx";
import csvParser from "csv-parser";
import streamifier from "streamifier";

export const uploadCSV = async (req, res) => {
  try {
    const file = req.files?.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Allowed file formats (CSV, XLSX, XLS)
    const allowedFormats = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!allowedFormats.includes(file.mimetype))
      return res.status(400).json({ message: "Invalid file format. Only CSV, XLSX, XLS are allowed." });

    // Upload file to Cloudinary (as a raw file)
    const cloudinaryUpload = async (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "raw" },
          (error, cloudinaryResult) => {
            if (error) reject(error);
            else resolve(cloudinaryResult);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const cloudinaryResult = await cloudinaryUpload(file.data);
    console.log("Cloudinary Upload Successful:", cloudinaryResult.url);

    // Parse CSV/XLSX/XLS
    const tasks = [];
    if (file.mimetype === "text/csv") {
      streamifier.createReadStream(file.data)
        .pipe(csvParser())
        .on("data", (row) => {
          if (!row.FirstName || !row.Phone || !row.Notes) {
            return res.status(400).json({ message: "CSV format error: Missing FirstName, Phone, or Notes" });
          }
          tasks.push({ firstName: row.FirstName, phone: row.Phone, notes: row.Notes });
        })
        .on("end", async () => await distributeTasks(res, tasks));
    } else {
      const workbook = xlsx.read(file.data, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = xlsx.utils.sheet_to_json(sheet);
      jsonData.forEach((row) => {
        if (!row.FirstName || !row.Phone || !row.Notes) {
          return res.status(400).json({ message: "XLSX/XLS format error: Missing FirstName, Phone, or Notes" });
        }
        tasks.push({ firstName: row.FirstName, phone: row.Phone, notes: row.Notes });
      });
      await distributeTasks(res, tasks);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const distributeTasks = async (res, tasks) => {
  try {
    const agents = await Agent.find();
    if (agents.length < 5) return res.status(400).json({ message: "Need at least 5 agents" });

    let agentIndex = 0;
    for (const task of tasks) {
      const agent = agents[agentIndex];
      await Task.create({ ...task, agent: agent._id });
      agentIndex = (agentIndex + 1) % 5;
    }

    res.status(201).json({ message: "Tasks distributed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error distributing tasks" });
  }
};

export const getTasksByAgent = async (req, res) => {
  try {
    const tasks = await Task.find({ agent: req.params.id });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

import express from "express";
import dotenv from "dotenv";
import cors from "cors";  // ✅ Import CORS
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import fileUpload from "express-fileupload";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Enable CORS for frontend (http://localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" })); 

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

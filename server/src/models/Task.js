 
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String, required: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;

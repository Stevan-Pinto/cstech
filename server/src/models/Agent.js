import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "agent" },
  },
  { timestamps: true }
);

// Hash password before saving
agentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare Password
agentSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;
 

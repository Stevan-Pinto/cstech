import Agent from "../models/Agent.js";

// ✅ Create a new agent
export const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const agentExists = await Agent.findOne({ email });
    if (agentExists) return res.status(400).json({ message: "Agent already exists" });

    const agent = await Agent.create({ name, email, mobile, password });

    if (agent) {
      res.status(201).json({ message: "Agent created successfully" });
    } else {
      res.status(400).json({ message: "Invalid agent data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all agents
export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select("-password");
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get a single agent by ID
export const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id).select("-password");
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update an agent
export const updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    agent.name = req.body.name || agent.name;
    agent.email = req.body.email || agent.email;
    agent.mobile = req.body.mobile || agent.mobile;

    if (req.body.password) {
      agent.password = req.body.password;
    }

    await agent.save();
    res.json({ message: "Agent updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete an agent
export const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    await agent.deleteOne();
    res.json({ message: "Agent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
 

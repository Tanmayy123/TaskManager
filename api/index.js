import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Taskrouter from "./routes/Task.route.js";

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 3000; // Default to port 3000 if not defined in .env

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend requests from this origin (adjust if necessary)
  })
);

// Routes
app.use("/api/task", Taskrouter); // Register task-related routes

// Database Connection
mongoose
  .connect(process.env.MONGODB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => {
    console.log("Database connection failed:", err.message);
    process.exit(1); // Exit the application if database connection fails
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

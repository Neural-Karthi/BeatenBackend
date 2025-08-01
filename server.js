const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");
const apiLogger = require("./middleware/apiLogger");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000","https://beatenproject.onrender.com","https://beatenproject.onrender.com/", "http://localhost:3001", "https://beaten1-1.onrender.com","https://beaten1-2.onrender.com", "*"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(apiLogger);

app.use("/public", express.static("public"));
app.use("/api", routes);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use(errorHandler);

const PORT = 8000;

connectDB();

app.listen(PORT, () => {
  // Silent startup - no logs
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

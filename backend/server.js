const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const swaggerSetup = require("./config/swagger");
const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const walkInLogRoutes = require("./routes/walkInLogRoutes");
const telcoTrendRoutes = require("./routes/telcoTrendRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
// Enable CORS for all routes, allowing the frontend origin
app.use(
  cors({
    origin: "http://localhost:5173", // Allow the frontend origin
    credentials: true, // Allow cookies/auth headers if needed
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/walkinlogs", walkInLogRoutes);
app.use("/api/telcotrends", telcoTrendRoutes);

// Swagger
swaggerSetup(app);

// Error Handling
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

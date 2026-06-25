require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectMongo = require("./config/mongo");
const pool = require("./config/mysql");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const connectSQL = require("./config/mysql");
const orderRoutes = require("./routes/orderRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const app = express();

app.use(cors());
app.use(express.json());

// Mongodb connection
connectMongo();

// MySql Connection
(async () => {
  try {
    let x = await pool.query("SELECT 1");
    console.log("MySQL connected");
  } catch (err) {
    console.error("MySQL connection error:", err.message);
  }
})();

// User Routes
app.use("/api/users", userRoutes);
// Product Routes
app.use("/api/products", productRoutes);
// Order Routes
app.use("/api/orders", orderRoutes);
// Weather routes
app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

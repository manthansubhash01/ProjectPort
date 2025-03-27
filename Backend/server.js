const express = require("express");
const connectDb = require("./config/dbConnection")
const dotenv = require("dotenv").config();
const cors = require("cors")

const app = express();

const PORT = process.env.PORT || 5000;

connectDb();

app.use(
  cors({
    origin: "*", // Allow all origins (Change this to your frontend domain for security)
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"))

app.get("/",(req,res) =>{
  res.send("Server is running")
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



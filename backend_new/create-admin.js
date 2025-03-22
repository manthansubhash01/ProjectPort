const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")

// Load environment variables
dotenv.config()

// Admin model schema
const adminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Create Admin model
const Admin = mongoose.model("Admin", adminSchema)

// Admin credentials
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "admin123"

// Connect to MongoDB and create admin user
async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Check if admin user already exists
    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME })

    if (existingAdmin) {
      console.log("Admin user already exists")
    } else {
      // Hash the password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt)

      // Create admin user
      const admin = new Admin({
        username: ADMIN_USERNAME,
        password: hashedPassword,
      })

      await admin.save()
      console.log("Admin user created successfully")
    }
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await mongoose.disconnect()
    console.log("MongoDB connection closed")
  }
}

// Run the function
createAdminUser()


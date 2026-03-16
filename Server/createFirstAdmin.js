import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI,{dbName: "TaskManager"});

    const adminExists = await User.findOne({ isAdmin: true });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    await User.create({
      name: "Super Admin",
      title: "System Administrator",
      role: "Admin",
      email: "admin@gmail.com",
      password: "Admin@1234",
      isAdmin: true,
      isActive: true,
    });

    console.log("✅ First admin created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createAdmin();

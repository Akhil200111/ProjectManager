import mongoose from "mongoose";

const dbConnection = async () => {
  try {
   const con=  await mongoose.connect(process.env.MONGODB_URI,{dbName:"TaskManager"});
    console.log(`DB : ${con.connection.name}`);
    console.log("Database Connected");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export default dbConnection;

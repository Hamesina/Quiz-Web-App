import mongoose from "mongoose";

export default async function connectToDB() {
  /* mongoose.set("strictQuery", true); */
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection succesful");
  } catch (error) {
    console.log("Some connection problem", error);
  }
}

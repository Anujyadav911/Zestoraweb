import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbname: "Zestora",
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(`Database connection failed! ${err}`);
    });
};

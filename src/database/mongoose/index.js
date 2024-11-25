import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGODB_URLD)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((error) => {
      console.error(
        "Something went wrong trying to connect with MongoDB. Message: ",
        error
      );
    });
};

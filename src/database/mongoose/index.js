import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose
    .connect(
      "mongodb+srv://higorfernandes998:3i5wCIDfNxyg4ZYI@nemly-cluster.fz7be.mongodb.net/?retryWrites=true&w=majority&appName=nemly-cluster"
    )
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((error) =>
      console.error(
        "Something went wrong trying to connect with MongoDB. Message: ",
        error
      )
    );
};

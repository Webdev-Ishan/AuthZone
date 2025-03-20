import mongoose from "mongoose";

const DBconnect = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/AuthZone`).then(() => {
    console.log("Mongodb Connected");
  });
};

export default DBconnect;

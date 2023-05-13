import mongoose from "mongoose";
const { Schema } = mongoose;

const usersSchema = new Schema({
    name: String,
    password : String,
  userId: String,
});

export default mongoose.model("UserDb", usersSchema);
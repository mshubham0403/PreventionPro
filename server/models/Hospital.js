import mongoose from "mongoose";
const { Schema } = mongoose;

const hospitalSchema = new Schema({
  name: String,
  hospitalId: String,
});

export default mongoose.model("HospitalDb", hospitalSchema);
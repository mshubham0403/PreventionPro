import mongoose from "mongoose";
const { Schema } = mongoose;

const hospitalSchema = new Schema({
  hospitalName: String,
  hospitalId: String,
});

export default mongoose.model("HospitalDb", hospitalSchema);
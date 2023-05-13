import mongoose from "mongoose";
const { Schema } = mongoose;

const diseaseSchema = new Schema({
  diseaseName: String,
  diseaseId: String,
});

export default mongoose.model("DiseaseDb", diseaseSchema);
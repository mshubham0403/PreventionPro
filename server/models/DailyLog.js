import mongoose from "mongoose";
const { Schema } = mongoose;

const dailyLogSchema = new Schema({
  
  hospitalName:String,
  hospitalId:String,
  diseaseCases:Number,
  diseaseName:String,
  diseaseId:String,
  date:Date,
  user:String,

});

export default mongoose.model("DailyLogDb", dailyLogSchema);
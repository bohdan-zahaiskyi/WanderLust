import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var WanderSchema = new Schema({
  destinations: Array,
  startDate: String,
  endDate: String,
  pickUp: String,
  aim: String,
  budget: Number,
  people: Number,
  description: String
});
export default mongoose.model('Wanders', WanderSchema);
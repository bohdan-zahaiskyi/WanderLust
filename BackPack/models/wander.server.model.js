import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let WanderSchema = new Schema({
  destinations: Array,
  startDate: String,
  endDate: String,
  pickUp: String,
  aim: String,
  budget: Number,
  people: Number,
  description: String,
    imgURL: String,
    initiator: String,
    participants: Array,
    invited: Array
});
export default mongoose.model('Wanders', WanderSchema);
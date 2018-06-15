import mongoose from 'mongoose'
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    email: String,
    password: String,
    pickUp: String,
    firstName: String,
    lastName: String,
    personCompany: String,
    phone: Array,
    country: String,
    state: String,
    city: String,
    confirmed: Boolean,
    token: String,
    friends: Array,
    description: String,
    avatar: String
});
export default mongoose.model('Users', UserSchema);
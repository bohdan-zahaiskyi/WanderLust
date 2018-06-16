import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let userComment = new Schema({
    commentor: String,
    user: String,
    text: String,
    date: String
});
export default mongoose.model('Usercomments', userComment);
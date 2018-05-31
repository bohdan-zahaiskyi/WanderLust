import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let CommentSchema = new Schema({
    commentor: String,
    wander: String,
    text: String,
    date: String
});
export default mongoose.model('Wandercomments', CommentSchema);
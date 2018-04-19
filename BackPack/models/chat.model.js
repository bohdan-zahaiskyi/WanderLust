import mongoose from 'mongoose'
let Schema = mongoose.Schema;
let ChatSchema = new Schema({
});
let MessageSchema = new Schema({
    text: String,
    date: Date,
    sender: Schema.Types.ObjectId,
    chatId: Schema.Types.ObjectId
});
let ChatCatalogSchema = new Schema({
    userId: Schema.Types.ObjectId,
    chatId: Schema.Types.ObjectId
});

const Chatcatalog = mongoose.model('Chatcatalog', ChatCatalogSchema);
const Messages = mongoose.model('Messages', MessageSchema);
const Chats = mongoose.model('Chats', ChatSchema);

export {
    Chatcatalog,
    Messages,
    Chats
}


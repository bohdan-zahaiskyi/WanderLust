import mongoose from 'mongoose'
let Schema = mongoose.Schema;
let MessageSchema = new Schema({
    text: String,
    date: Date,
    sender: String,
    chatId: String
});
let ChatCatalogSchema = new Schema({
    comunicators: Array,
});

const Chatcatalogs = mongoose.model('Chatcatalogs', ChatCatalogSchema);
const Messages = mongoose.model('Messages', MessageSchema);

export {
    Chatcatalogs,
    Messages
}


// ./express-server/app.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
//import bb from 'express-busboy';
import SourceMapSupport from 'source-map-support';
// import routes
import wandersRoutes from './routes/wander.server.route';
import usersRoutes from './routes/user.route';
import chatsRoutes from './routes/chat.route';
// define our app using express
const app = express();
// express-busboy to parse multipart/form-dat
//bb.extend(app);
// allow-cors
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
// configure app
app.use(logger('dev'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
//app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
// set the port
const port = process.env.PORT || 3000;
// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/wanderlust');

// add Source Map Support
SourceMapSupport.install();

app.use('/wanders', wandersRoutes);
app.use('/users', usersRoutes);
app.use('/chats', chatsRoutes);

app.get('/', (req,res) => {
  return res.end('Api working');
});
// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});
// start the server
app.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});
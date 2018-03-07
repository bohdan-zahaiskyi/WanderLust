import mongoose from 'mongoose';
import nodemailer from 'nodemailer'
import Users from '../models/user.model';

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "bohdan.zahaiskyi.pi.2014@lpnu.ua",
        pass: "15.08.1997"
    }
});

export const getUsers = () => {
    return new Promise((resolve, reject) => {
        Users.find().then(users => {
                resolve({'success':true,'message':'Wanders fetched successfully', users});
            },
            err => {reject({'success':false,'message':'Some Error'})})
    })
};

export const verifyEmail = (req, res) =>{

    const newUser = new Users(req.body);
    newUser.save().then(user =>{
        const link = "http://localhost:4200/verify/" + user._id;
        const mailOptions = {
            to : user.email,
            subject : "Please confirm your Email account",
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
        };
/*        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
                res.send("error");
            } else {
                console.log("Message sent: " + response.message);
                res.send("sent verification letter");
            }
        });*/
    });
};

export const confirmUser = (req, res) => {
    return Users.updateOne({_id: mongoose.Types.ObjectId(req.body.id)}, {confirmed: true}).then(user =>{
        res.json({user: user, message: "confirmed successfully"});
    }).catch(err => {
        res.json({success:false, message: err});
    })
};

export const emailExist = (req, res) => {
    Users.findOne({email: req.params.email}, (err, user) => {
        if(err){
            res.error(err);
        }
        else{
            if(user) {
                res.json(true);
            }
            else {
                res.json(false);
            }
        }
    });
};

export const addUser = (req,res) => {
    const newUser = new Users(req.body);
    newUser.save((err, user) => {
        if(err){
            return res.json({'success':false,'message':'Some Error'});
        }
        return res.json({'success':true,'message':'User added successfully', user});
    })
};
export const updateUser = (req,res) => {
    Users.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,user) => {
        if(err){
            return res.json({'success':false,'message':'Some Error','error':err});
        }
        return res.json({'success':true,'message':'Updated successfully',user});
    })
};
export const getUser = (req,res) => {
    Users.find({_id:req.params.id}).exec((err,user) => {
        if(err){
            return res.json({'success':false,'message':'Some Error'});
        }
        if(user.length){
            return res.json({'success':true,'message':'Wander fetched by id successfully',user});
        }
        else{
            return res.json({'success':false,'message':'Wander with the given id not found'});
        }
    })
};
export const deleteUser = (req,res) => {
    Users.findByIdAndRemove(req.params.id, (err,user) => {
        if(err){
            return res.json({'success':false,'message':'Some Error'});
        }
        return res.json({'success':true,'message':'Wander deleted successfully'});
    })
};
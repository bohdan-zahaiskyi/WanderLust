// ./express-server/controllers/todo.server.controller.js
import mongoose from 'mongoose';
//import models
import Wanders from '../models/wander.server.model';
import Wandercomments from '../models/comment.model';

export const getWanders = () => {
    return new Promise((resolve, reject) => {
        Wanders.find().then(wanders => {
                resolve({'success':true,'message':'Wanders fetched successfully', wanders});
            },
            err => {
              console.log('ERROR');
              reject({'success':false,'message':'Some Error'})
            })
    })
};

export const myWanders = (req,res) => {
    let params = req.body;
    Wanders.find()
        .then(wanders => {
            const filteredWanders = [];
            wanders.forEach(wander => {
              if(wander.initiator === params.email || wander.participants.indexOf(params.email) >= 0) {
                  filteredWanders.push({wander, priority: 1});
              }
            });
            filteredWanders.length > 0 ? res.json({success: true, filteredWanders}) : res.json({success: false, message: 'You have no wanders'});
        })
        .catch(error =>{})
};

export const getLatest = (req, res) => {
    const latest = [];
    const today = new Date().getTime();
    Wanders.find().then(wanders => {
        wanders.forEach(wander => {
            if(new Date(wander.endDate).getTime() < today) {
                latest.push(wander);
            }
        });
        sortDate(wanders);
        wanders.splice(5,wanders.length);
        res.json(wanders);
    })
};

export const topDestinations = (req, res) => {
    const topDestination = [];
    Wanders.find().then(wanders => {
        wanders.forEach(wander => {
            wander.destinations.forEach(destination => {
                const index = topDestination.indexOf(destination);
                if (index > -1) {
                    topDestination[index].priority++;
                } else {
                    topDestination.push({destination: destination, priority: 1});
                }
            });
        });
        topDestination.splice(6,topDestination.length);
        res.json(topDestination);
    });
};

export const searchWanders = (req,res) => {
    let params = req.body;
    Wanders.find().then(wanders => {
      const filteredWanders = [];
      wanders.forEach(wander => {
        let priority = 0;
        let destinationPassed = undefined;
        params.forEach(param => {
          if(destinationPassed === 0){
            return;
          }
          if(param.key === 'destinations') {
            const from = param.value[0];
            const to = param.value[1];
            const fromIndex = wander.destinations.indexOf(from);
            const toIndex = wander.destinations.indexOf(to);
            if (fromIndex >= 0 && toIndex >= 1 && fromIndex < toIndex){
              destinationPassed = 1;
              priority++;
            }
            else {
              destinationPassed = 0;
            }
            return;
          }
          if(param.key === 'budget') {
            if (wander.budget> param.value[0] && wander.budget < param.value[1]) {
                priority++;
            }
            return;
          }
          if(wander[param.key] === param.value){
            priority++;
          }
        });
        if(priority > 0 && destinationPassed === 1 && wander.people > wander.participants.length){
          filteredWanders.push({wander, priority});
        }
      });
      if(filteredWanders.length > 0){
          sort(filteredWanders);
          res.json({success: true, filteredWanders})
      }
       res.json({success: false, message: 'no such wanders found'});
    })
        .catch(err => res.json({success: false, message: err}));
};
function sort(items) {
    let length = items.length;
    for (let i = 0; i < length; i++) { //Number of passes
        for (let j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
            //Compare the adjacent positions
            if(items[j].priority > items[j+1].priority) {
                //Swap the numbers
                let tmp = items[j];  //Temporary variable to hold the current number
                items[j] = items[j+1]; //Replace current number with adjacent number
                items[j+1] = tmp; //Replace adjacent number with current number
            }
        }
    }
}

function sortDate(items) {
    let length = items.length;
    for (let i = 0; i < length; i++) { //Number of passes
        for (let j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
            //Compare the adjacent positions
            if(new Date(items[j].endDate).getTime() < new Date(items[j+1].endDate).getTime()) {
                //Swap the numbers
                let tmp = items[j];  //Temporary variable to hold the current number
                items[j] = items[j+1]; //Replace current number with adjacent number
                items[j+1] = tmp; //Replace adjacent number with current number
            }
        }
    }
}


  /*Wanders.find().exec((err, wanders) => {
  if(err){
    return {'success':false,'message':'Some Error'};
  }
  return {'success':true,'message':'Wanders fetched successfully', wanders};
  });*/

export const createWander = (req,res) => {
  const newWander = new Wanders(req.body);
  newWander.save((err,wander) => {
    if(err){
        return res.json({'success':false,'message':'Some Error'});
    }
    wander.save(error => {
        if(error) {
            return res.json({'success':false,'message':error});
        }
        return res.json({'success':true,'message':wander});
    });
  })
};
export const updateWander = (req,res) => {
  Wanders.findOneAndUpdate({ _id:req.body._id }, req.body, { new:true }, (err,wander) => {
    if(err){
        return res.json({'success':false,'message':'Some Error','error':err});
    }
    console.log(wander);
    return res.json({'success':true,'message':'Updated successfully',wander});
  })
};

export const commentWander = (req, res) => {
    const newComment = new Wandercomments(req.body);
    newComment.save((err, comment) => {
        if(err){
            return res.json({'success':false,'message':'Some Error'});
        }
        comment.save(error => {
            if(error) {
                return res.json({'success':false,'message':error});
            }
            return res.json({'success':true,comment});
        })
    })
};

export const getWanderComments = (req, res) => {
    console.log(req.params.id);
    Wandercomments.find({wander: req.params.id})
        .then(result => {
            console.log(result);
            res.json({success: true, comments: result});
        })
        .catch(error => {
            res.json({success: false, message: error});
        })
};

export const getWander = (req,res) => {
  Wanders.find({_id:req.params.id}).exec((err,wander) => {
    if(err){
        return res.json({'success':false,'message':'Some Error'});
    }
    if(wander.length){
        return res.json({'success':true,'message':'Wander fetched by id successfully',wander});
    }
    else{
        return res.json({'success':false,'message':'Wander with the given id not found'});
    }
  })
};
export const deleteWander = (req,res) => {
  Wanders.findByIdAndRemove(req.params.id, (err,wander) => {
    if(err){
        return res.json({'success':false,'message':'Some Error'});
    }
    return res.json({'success':true,'message':'Wander deleted successfully'});
  })
};

export const getInvited = (req, res) => {
    const email = req.params.email;
    console.log(email);
    const result = [];
    Wanders.find().then(wanders => {
        wanders.forEach(wander => {
            if (wander.invited.indexOf(email) > -1){
                result.push(wander);
            }
        });
       res.json(result);
    })
};
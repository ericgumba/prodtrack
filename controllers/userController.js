var User = require('../models/user') 
var Task = require('../models/task')
var Entry = require('../models/entry')
// register user

function grabUser(username){
    return User.findOne({username})

}

function findAndUpdateResults(error, succ){
    if(error){
        console.log(error)
    }else{
        console.log(succ)
    }
}

exports.user_create = ( req, res, next ) => {
 
    // create new user object~

    console.log("HERE IS NODY   ",     req.body)
    let user = new User(
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            entries: []
        }
    )

    console.log("tESTESTET") 

    user.save( (err) => {
        if ( err ){ 
            // console.log("HERE IS ERR≥>OR:  ", err)
             res.status(404).send('Sorry, we cannot find that!')
            }

        res.send("User registered.")

 
    })
} ;
 

exports.user_login = (req, res, next) =>{
    let user = User.findOne(
        {
            username: req.body.username,
            password: req.body.password
        }).then( (doc) => // because all mongoose things are docs
        {
            console.log("user found ", doc)

            if (!doc){
                res.send("Incorrect username or password")
            }

            res.send("OK")
        })
        .catch( (err) => {
            console.log("===============================")
            console.log(err)
            res.send("NOT OK")
        } ) 
}
exports.task_create = (req, res, next) =>{  
 
 
    let newTask = new Task(
        {
            name: req.body.name,
            minutesComplete: 0,
            hoursComplete: 0,
            pomodorosComplete: 0
        }
    )

    Entry.findOneAndUpdate( 
        {title: req.body.title},
        { $push: { tasks: newTask } }, 
        findAndUpdateResults(err, succ)
     )
 
    // example of updating a sub document
    // https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
    
    // var objFriends = { fname:"fname",lname:"lname",surname:"surname" };
    // Friend.findOneAndUpdate(
    //    { _id: req.body.id }, 
    //    { $push: { friends: objFriends  } },
    //   function (error, success) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log(success);
    //         }
    //     });
    // )
}


exports.entry_create = (req, res, next) => {

    let newEntry = new Entry
    (
        {
            title: req.body.title,
            tasks: [],
            minutesComplete: 0,
            hoursComplete: 0,
            pomodorosComplete: 0
        }
    )

        // todo finisih this one.
    User.findOneAndUpdate(
        {_id: req.body.id},
        { $push: { entries: newEntry } },
        findAndUpdateResults(error, succ)
    )

}

 
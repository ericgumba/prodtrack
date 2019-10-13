var User = require('../models/user') 
// var Task = require('../models/task')
// var Entry = require('../models/entry')
const nodemailer = require('nodemailer');
// register user
 

// function grabTask(tasks, taskName){
//     for ( let task of tasks ) {
//         if ( task.name == taskName ) {
//             return task
//         }
//     }
// }


// function grabEntry(entries, entryTitle){
//     for (let entry of entries){
//         if (entry.title == entryTitle) {
//             return entry
//         }
//     }
// }
 

// exports.update_task = ( req, res, next ) => {

//     User.findOne( {username: req.body.username}, (err, user) => {

//         if(err){
//             res.send(err)
//         }
 
//         let entry = grabEntry(user.entries, req.body.entryTitle) 
//         let task = grabTask(entry.tasks, req.body.taskName)
//         task.minutesComplete = req.body.minutesComplete
//         user.save((err, newUser) => { 
//             res.send(newUser)
//         })
//     } )
// }

// exports.edit_task = ( req, res , next ) => {
//     User.findOne( { username: req.body.username }, (err, user) => {
 
        
//         let entry = grabEntry(user.entries, req.body.entryTitle) 
//         let task = grabTask(entry.tasks, req.body.taskName)

//         console.log( { user, entry, task } )
//         task.name = req.body.newName

//         user.save((err, newUser) => {
//             res.send(newUser);
//         })
        
//     } )
// }

exports.email_info = (req, res, next) => {
    if (req.body.email){
 
        User.findOne({ email: req.body.email }, (err,user) =>{

            console.log("UISER IN EMAIL INFO METHOD", user)

            if (err){
                console.log("EROR", err)
                res.send({error: "ERROR"})
            }
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'ericgumba@gmail.com',
                pass: 'er1c092'
                }
            });
            
            const mailOptions = {
                from: 'ericgumba@gmail.com',
                to: req.body.email,
                subject: 'Sending Email using Node.js',
                text: `your password for ${user.username}: ${user.password},`
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                res.send({error:"error in sending mail"})
                } else {
                console.log('Email sent: ' + info.response);
                res.send({success: "Success"})
                }
            });
        })
    }
    else{

        
        res.send({error: "no email sent"})
    }
}

exports.user_update = ( req, res , next ) => {
    User.findOne( { username: req.body.username }, (err, user) => {

        console.log("Being updated:", user)
        user.entries = req.body.entries

        user.save((err, newUser) => {
            res.send(newUser);
        })
        
    } )
}

exports.user_create = ( req, res, next ) => {

    console.log("DOG MAN ARF ARF", req.body)
 
    // create new user object~ 
    let user = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            entries: req.body.entries
        }
    ) 

    console.log("USEROO", user)

    user.save( (err, prod) => {
        if ( err ){ 
            console.log("HERE IS ERR≥>OR:  ", err)
             res.status(404).send({msg:"cannot register that user", success:false})
            }

        res.send(prod)

 
    })
} ;
 

exports.user_login = (req, res, next) =>{
    console.log("RERA", req.body)
    User.findOne(
        {
            username: req.body.username,
            password: req.body.password
        }).then( (doc) => // because all mongoose things are docs
        {
            console.log("user found ", doc)

            if (!doc){
                res.send({msg:"Incorrect username or password"})
            }

            res.send(doc)
        })
        .catch( (err) => { 
            res.send({msg:"NOT OK"})
        } ) 
}


// TODO Finish this function
// exports.task_create = (req, res, next) =>{   
//     let newTask = new Task(
//         {
//             name: req.body.taskName,
//             minutesComplete: 0
//         }
//     )  
//     User.findOne( {username: req.body.username}, (err, user) => {

//         if(err){
//             res.send(err)
//         }
 
//         let entry = grabEntry(user.entries, req.body.entryTitle) 
//         entry.tasks.push(newTask)
//         user.save((err, newUser) => { 
//             res.send(newUser)
//         })
//     } ) 
// }

// exports.delete_task = (req, res, next) => {

//     console.log(req.body.username)

//     if (req.body.username === undefined) res.send("UNDEFINED USERNAME")
//     User.findOne( {username: req.body.username}, (err, user) => {

//         console.log("TESTESTESTSET")

//         if(err){
//             res.send(err)
//         }

//         let entry = grabEntry( user.entries, req.body.entryTitle )

//         entry.tasks = entry.tasks.filter( ( task ) => { 
//             return task.name != req.body.taskName
//         } )

//         console.log(entry.tasks)

//         user.save( (err, prod) =>{ 
//             res.send(prod)
//         }) 

//     } )
// }

// exports.entry_create = (req, res, next) => {

//     let newEntry = new Entry
//     (
//         {
//             title: req.body.title,
//             tasks: []
//         }
//     )

//     const doc =  User.findOne({username: req.body.username}, (err, username) => {

//         if (err){
//             res.send(err)
//         }
         
//         username.entries.push(newEntry)
        
//         var subdoc = username.entries[username.entries.length -1 ]
         
//         username.save( (err, prod) =>{ 
//             res.send(prod)
//         }) 
//     })
// }

 
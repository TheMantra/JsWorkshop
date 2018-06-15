const express = require('express');
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const app = express();
app.use(express.json());

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'jsWorkshop';


app.get('/' , (req , res) => {
res.send('hello world');
});

app.get('/get-users' , (req , res) => {
    let resultArray = [];
    mongo.connect(url , (err , client)=>{
        assert.equal(null , err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        let result = db.collection('users').find();
        result.forEach((doc,err)=>{
            assert.equal(null,err);
            resultArray.push(doc);
        }, () =>{
            client.close();
            res.send(resultArray);
            console.log("all users are retrieved");
        });
    });
}); 
app.post('/add-user' , (req , res)=>{
    var user = {
        username : req.body.username,
        password : req.body.password,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        role : req.body.role
    };
    mongo.connect(url , (err , client)=>{
        assert.equal(null , err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        db.collection('users').insertOne(user , (err , result) =>{
            assert.equal(null , err);
            console.log("user Inserted");
            res.send("user Created Successfully");
            client.close();
        });
    });
   
});

app.get('/get-courses' , (req , res) =>{
    let resultArray = [];
    mongo.connect(url , (err , client)=>{
        assert.equal(null , err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        let result = db.collection('courses').find();
        result.forEach((doc,err)=>{
            assert.equal(null,err);
            resultArray.push(doc);
        }, () =>{
            client.close();
            res.send(resultArray);
            console.log("all courses are retrieved");
        });
    });
});

app.post('/add-course' , (req , res) =>{
    let course = {
        name : req.body.name,
        code : req.body.code,
        teacher : {
            _id : req.body.teacher._id,
            firstname : req.body.teacher.firstname,
            lastname : req.body.teacher.lastname 
        },
        students : req.body.students
    };
    mongo.connect(url , (err , client)=>{
        assert.equal(null , err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        db.collection('courses').insertOne(course , (err , result) =>{
            assert.equal(null , err);
            console.log("course Inserted");
            res.send("course Created Successfully");
            client.close();
        });
    });
});

app.get('/get-events' , (req , res) =>{
    var resultArray = []
    mongo.connect(url , (err , client)=>{
        assert.equal(null , err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        let result = db.collection('events').find();
        result.forEach((doc,err)=>{
            assert.equal(null,err);
            resultArray.push(doc);
        }, () =>{
            client.close();
            res.send(resultArray);
            console.log("all events are retrieved");
        });
    });
});

app.post('/add-event', (req , res) =>{
    let event = {
        course :{
            _id : req.body.course._id,
            name : req.body.course.name
        },
        name: req.body.name,
        description : req.body.description,
        date : req.body.date
    };
    mongo.connect(url , (err , client)=>{
        assert.equal(null , err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        db.collection('events').insertOne(event , (err , result) =>{
            assert.equal(null , err);
            console.log("event Inserted");
            res.send("event Created Successfully");
            client.close();
        });
    });
});


app.listen(3000 , () => console.log('listening on port 3000'));
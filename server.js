var Model = require('./models/model.js')
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:'true'}));

var db = "mongodb://localhost/mean_end_to_end";

mongoose.connect(db, function(err, response){
     if(err){
         console.log('Connect To fail' + db);
     }else{
         console.log('Connected To' + db);
     }
});

var router = express.Router();

// GET API

router.get('/api/users', function(req, res){
    Model.find( function(err, users){
        if(err){
            res.status(404).send(err);
        }else{
            res.status(200).send(users);
        }
    })
});

//Post API

router.post('/api/users', function(req, res){
    var model = new Model();
    model.name = req.body.name;
    model.age = req.body.age;
model.save( function(err, user){
     if(err){
         res.status(500).send(err);
     }else{
         res.status(201).send(user);
     }
 })
})

// Delete API

router.delete('/api/users/:id', function(request, response){
   var id = request.params.id;
    Model.remove({_id: id}, function(err, res){
        if(err){
            response.status(500).send(err);
        }else{
            response.status(200).send({message : 'User is deleting'});
        }
    })
})

// Update API
router.put('/api/users', function(request, response){
     Model.findById(request.body._id, function(err, user){
         if(err){
            response.status(404).send(err);
         }else{
            user.update(request.body, function(err, success){
                 if(err){
                     response.send(err);
                 }else{
                   //response.status(200).send({message : 'success'}); 
                   response.status(200).send({message : 'Success'});
                 }
            }); 
         }
     })
})

app.use('/', router);
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res){
//    res.send(" WelCome to MEAN Stack ");
// })

var port = process.env.PORT || 3000

app.listen(port, function(){
    console.log("Server is running on port" + port);
})
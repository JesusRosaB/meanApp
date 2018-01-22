const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://172.17.0.3:27017/mean', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

//get 1 user
router.get('/users/:id', (req, res) => {
    connection((db) => {
        db.collection('users')
            .findOne({_id: ObjectID(req.params.id)})
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

//Crear usuario
router.post('/users', (req, res) => {
    var username = req.body;
    connection((db) => {
        db.collection('users')
            .save(username)
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });

    //return null;
});

//delete user
router.delete('/users/:id', (req,res) => {
    connection((db) => {
        db.collection('users')
        .remove({_id: ObjectID(req.params.id)})
        .then((users) => {
            response.data = users;
            res.json(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
    });
});

//actualizar
router.put('/users/:id', (req,res) => {

    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    var _user = { 
        name: req.body.name, 
        city: req.body.city 
    };

    connection((db) => {
        db.collection('users')
        .update(details,_user)
        .then((users) => {
            response.data = users;
            res.json(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
    });
});



module.exports = router;

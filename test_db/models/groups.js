var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.all = function (cb){
    db.get().collection('groups').find().toArray(function(err, docs) {
       cb(err, docs);
    })
}

exports.findById = function(id, cb){
    db.get().collection('groups').findOne({ _id: ObjectID(id) }, function(err, doc) {
        cb(err, doc);
    })
}

exports.add = function(artist, cb){
    db.get().collection('groups').insert(artist, function(err, result) {
        cb(err,result);
    })
}

exports.update = function(id, name, cb){
    db.get().collection('groups').updateOne(
        { _id: ObjectID(id) },
        { name: name },
        function(err, result){
            cb(err, result)
        }
    )
}

exports.delete = function(id, cb){
    db.get().collection('groups').deleteOne(
        { _id: ObjectID(id) },
        function(err, result){
            cb(err, result)
        }
    )
}
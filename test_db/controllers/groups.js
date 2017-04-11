var Groups = require('../models/groups');

exports.all = function(req, res){
    Groups.all(function(err, docs){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.findById = function(req, res){
    Groups.findById(req.params.id, function(err, doc){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}

exports.add = function(req, res){
    var artist = {
        name: req.body.name
    }
    Groups.add(artist, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        
        res.send(artist);
    })
}

exports.update = function(req, res){
    Groups.update(req.params.id, req.body.name, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
            
        res.sendStatus(200);
    })
}

exports.delete = function(req, res){
    Groups.delete(req.params.id, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}
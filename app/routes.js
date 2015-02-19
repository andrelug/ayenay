var func = require('../config/functions'),
    facebook = require('../config/facebook.js'),
    ip = require('ip'),
    fs = require("fs"),
    transloadit = require('node-transloadit'),
    async = require('async'),
    Feed = require('feed');

var client = new transloadit('195786e09f8911e495eae1be63259780', '360133efc358574ed2fef9c645c5fb62f65623af');

// Session check function
/*
var sessionReload = function(req, res, next){
    if('HEAD' == req.method || 'OPTIONS' == req.method){
        return next();
    }else{
        req.session._garbage = Date();
        req.session.touch();
    }
}
*/


var plusView = function(user){
    //check level
    var addLevel,
        points = user.gamification.points;
    
    if (points >= 100 && points < 300){
        addLevel = 2;
    } else if(points >= 300 && points < 600){
        addLevel = 3;
    } else if(points >= 600 && points < 1000){
        addLevel = 4;
    } else if(points >= 1000 && points < 2000){
        addLevel = 5;
    } else if(points >= 2000 && points < 3000){
        addLevel = 6;
    } else if(points >= 3000 && points < 4000){
        addLevel = 7;
    } else if(points >= 4000 && points < 5500){
        addLevel = 8;
    } else if(points >= 5500 && points < 7000){
        addLevel = 9;
    } else if(points >= 7000 && points < 10000){
        addLevel = 10;
    } else if(points >= 10000 && points < 15000){
        addLevel = 11;
    } else{
        addLevel = user.gamification.level;
    }
    Users.update({'_id': user._id}, {$inc: {'graph.visits': 1}, $set: {'gamification.level': addLevel}}, function(err){
        
    });
}

var managePoints = function(userId, points){
    Users.update({_id: userId},{$inc: {'gamification.points': points}}, function(err){
        
    });
}

module.exports = function (app, passport, mongoose) {
    app.get('/', function (req, res) {
        res.render('index', {title: "Aye Nay - Get your answers here"})
    });
}
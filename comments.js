// Create web server
// By: TeamRGE

// Module dependencies
var express = require('express');
var router = express.Router();
var comment = require('../models/comment.js');
var mongoose = require('mongoose');
var user = require('../models/user.js');

// Get all comments
router.get('/', function(req, res) {
    comment.find(function(err, comments) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(comments);
        }
    });
});

// Get comment by id
router.get('/:id', function(req, res) {
    comment.findById(req.params.id, function(err, comment) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(comment);
        }
    });
});

// Create comment
router.post('/', function(req, res) {
    var newComment = new comment({
        text: req.body.text,
        user: req.body.user,
        date: req.body.date,
        likes: req.body.likes,
        dislikes: req.body.dislikes
    });

    newComment.save(function(err, comment) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(comment);
        }
    });
});

// Update comment
router.put('/:id', function(req, res) {
    comment.findById(req.params.id, function(err, comment) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            comment.text = req.body.text;
            comment.user = req.body.user;
            comment.date = req.body.date;
            comment.likes = req.body.likes;
            comment.dislikes = req.body.dislikes;

            comment.save(function(err, comment) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.send(comment);
                }
            });
        }
    });
});

// Delete comment
router.delete('/:id', function(req, res) {
    comment.findByIdAndRemove(req.params.id, function(err, comment) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(comment);
        }
    });
});

module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const keys = require('../../config/keys');
const verify = require('../../utilities/verify-token');
const Message = require('../../models/Message');
const Conversation = require('../../models/Conversation');
const GlobalMessage = require('../../models/GlobalMessage');

// Get global messages
router.get('/global', (req, res) => {
    GlobalMessage.find()
        .populate('from')
        .exec((err, messages) => {
            if (err) {
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Failure' }));
                res.sendStatus(500);
            } else {
                res.send(messages);
            }
        });
});

router.post('/global', (req, res) => {
    // Verify and decode user from JWT Token
    let jwtUser = null;
    try {
        jwtUser = jwt.verify(verify(req), keys.secretOrKey);
    } catch (err) {
        console.log(err);
    }

    let message = new GlobalMessage({
        from: jwtUser.id,
        body: req.body.body,
    });

    req.io.sockets.emit('messages', req.body.body);

    message.save(err => {
        if (err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Failure' }));
            res.sendStatus(500);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Success' }));
        }
    });
});

router.post('/', (req, res) => {
    // Verify and decode user from JWT Token
    let jwtUser = null;
    try {
        jwtUser = jwt.verify(verify(req), keys.secretOrKey);
    } catch (err) {
        console.log(err);
    }

    Conversation.findOneAndUpdate(
        { from: jwtUser.id, to: req.body.to, global: req.body.global },
        { from: jwtUser.id, to: req.body.to, global: req.body.global },
        { upsert: true, new: true, setDefaultsOnInsert: true },
        function(err, conversation) {
            if (err) {
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Failure' }));
                res.sendStatus(500);
            } else {
                let message = new Message({
                    conversation: conversation._id,
                    body: req.body.body,
                });

                req.io.sockets.emit('messages', req.body.body);

                message.save(err => {
                    if (err) {
                        console.log(err);
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Failure' }));
                        res.sendStatus(500);
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Success' }));
                    }
                });
            }
        }
    );
});

module.exports = router;

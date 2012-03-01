// users.js
// Routes to CRUD users.

var User = require('../models/user');

// GET /users
exports.list = function (req, res, next) {
    User.getAll(function (err, users) {
        if (err) return next(err);
        res.render('users', {
            users: users
        });
    });
};

// POST /users
exports.create = function (req, res, next) {
    User.create({
        name: req.body['name']
    }, function (err, user) {
        if (err) return next(err);
        res.redirect('/users/' + user.id);
    });
};

// GET /users/:id
exports.show = function (req, res, next) {
    User.get(req.params.id, function (err, user) {
        if (err) return next(err);
        // TODO also fetch and show followers?
        user.getFollowingAndOthers(function (err, following, others) {
            if (err) return next(err);
            res.render('user', {
                user: user,
                following: following,
                others: others
            });
        });
    });
};

// POST /users/:id
exports.edit = function (req, res, next) {
    User.get(req.params.id, function (err, user) {
        if (err) return next(err);
        user.name = req.body['name'];
        user.save(function (err, user) {
            if (err) return next(err);
            res.redirect('/users/' + user.id);
        });
    });
};

// DELETE /users/:id
exports.del = function (req, res, next) {
    User.get(req.params.id, function (err, user) {
        if (err) return next(err);
        user.del(function (err) {
            if (err) return next(err);
            res.redirect('/users');
        });
    });
};

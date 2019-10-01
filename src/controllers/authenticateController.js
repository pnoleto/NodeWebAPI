const loginService = require('./../../services/authenticate.service');


exports.authenticate = (req, res, next) => {
    loginService.authenticate(req.body)
        .then((user) =>
            user ?
                res.json(user) :
                res.status(400)
                    .json({ message: 'Username or password is incorrect' }))
        .catch(err =>
            next(err));
};

exports.refreshToken = (req, res, next) => {
    loginService.authenticate(req.body)
        .then((user) =>
            user ?
                res.json(user) :
                res.status(400)
                    .json({ message: 'Username or password is incorrect' }))
        .catch(err =>
            next(err));
};
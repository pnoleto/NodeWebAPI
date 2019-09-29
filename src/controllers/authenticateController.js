const loginService = require('./../../services/authenticate.service');

exports.get = (req, res, next) => {
    res.status(200).send('Requisição recebida com sucesso!');
};

exports.post = (req, res, next) => {
    loginService.authenticate(req.body)
        .then((user) =>
            user ?
                res.json(user) :
                res.status(400)
                    .json({ message: 'Username or password is incorrect' }))
        .catch(err =>
            next(err));
};

exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`Requisição recebida com sucesso! ${id}`);
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Requisição recebida com sucesso! ${id}`);
};
const config = require('./../config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        const token = jwt.sign({ id: user.id, name: username }, config.secret, { expiresIn: config.expiresIn, algorithm: config.algorithm });
        const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenExpiresIn, algorithm: config.refreshTokenAlgorithm });
        return { ...userWithoutPassword, token, refreshToken };
    }
    throw { name:'InvalidCredential', message: 'Username or password is incorrect' };
}

async function refreshToken({ refreshToken }) {
    try {
        const decodedPlayload = jwt.verify(refreshToken, config.refreshTokenSecret);
        if (decodedPlayload) {
            const { password, ...userWithoutPassword } = decodedPlayload;
            const token = jwt.sign({ decodedPlayload }, config.secret, { expiresIn: config.expiresIn, algorithm: config.algorithm });
            return { ...userWithoutPassword, token };
        }
    } catch (err) {
        throw err;
    }
}

module.exports = { authenticate, refreshToken };
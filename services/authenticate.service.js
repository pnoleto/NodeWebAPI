const config = require('./../config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const { password, ...userWithoutPassword } = user;
        const token = jwt.sign({ id: user.id, name: username }, config.tokenOptions.secret, { expiresIn: config.tokenOptions.expiresIn, algorithm: config.tokenOptions.algorithm });
        const refreshToken = jwt.sign(user, config.tokenOptions.refreshTokenSecret, { expiresIn: config.tokenOptions.refreshTokenExpiresIn, algorithm: config.tokenOptions.refreshTokenAlgorithm });
        return { ...userWithoutPassword, token, refreshToken };
    }
    
    throw { name: 'InvalidCredential' };
}

async function refreshToken({ refreshToken }) {
    const decodedPlayload = jwt.verify(refreshToken, config.tokenOptions.refreshTokenSecret);

    if (decodedPlayload) {
        const { password, ...userWithoutPassword } = decodedPlayload;
        const token = jwt.sign({ decodedPlayload }, config.tokenOptions.secret, { expiresIn: config.tokenOptions.expiresIn, algorithm: config.tokenOptions.algorithm });
        return { ...userWithoutPassword, token };
    }

    throw { name: "UnauthorizedError" };
}

module.exports = { authenticate, refreshToken };
const config = require('./../config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign(
            { sub: user.id },
            config.secret,
            { expiresIn: config.expiresIn, algorithm: config.algorithm }
        );
        const refreshToken = jwt.sign(
            user,
            config.refreshTokenSecret,
            { expiresIn: config.refreshTokenLife }
        );
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token,
            refreshToken
        };
    }
}

async function refreshToken({ refreshToken }) {
    if (refreshToken) {
        const refreshToken = jwt.verify(
            refreshToken, config.refreshTokenSecret,
            (error, decoded) => {
                if (decoded) {
                    const token = jwt.sign(
                        { sub: user.id },
                        config.secret,
                        { expiresIn: config.expiresIn, algorithm: config.algorithm }
                    );
                }
            })
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token,
            refreshToken
        };
    }
}

module.exports = { authenticate };
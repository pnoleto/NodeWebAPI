const config = require('./../config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

async function createToken(playLoad, tokenOptions) {

    const Token = jwt.sign(playLoad,
        tokenOptions.secret, {
        expiresIn: tokenOptions.expiresIn,
        algorithm: tokenOptions.algorithm,
        audience: tokenOptions.audience,
        issuer: tokenOptions.issuer
    });

    return Token;
}

async function verifyToken(refreshToken, tokenOptions) {
    const decodedPlayLoad = jwt.verify(
        refreshToken,
        tokenOptions.secret, {
        audience: tokenOptions.audience,
        issuer: tokenOptions.issuer
    });

    return decodedPlayLoad;
}

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const { password, ...userWithoutPassword } = user;

        const token = await createToken({ ...userWithoutPassword }, config.tokenOptions);

        const refreshToken = await createToken({ ...userWithoutPassword }, config.refreshTokenOptions);

        return { ...userWithoutPassword, token, refreshToken };
    }

    throw { name: 'InvalidCredential' };
}

async function refreshToken({ refreshToken }) {

    const decodedPlayload = await verifyToken(refreshToken, config.refreshTokenOptions);

    if (decodedPlayload) {
        const user = users.find(u => u.id === decodedPlayload.id);

        const { password, ...userWithoutPassword } = user;

        const token = await createToken({ ...userWithoutPassword }, config.tokenOptions);

        return { ...userWithoutPassword, token };
    }

    throw { name: 'UnauthorizedError' };
}

module.exports = { authenticate, refreshToken };
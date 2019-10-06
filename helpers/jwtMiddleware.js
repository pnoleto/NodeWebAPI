const expressJwt = require('express-jwt');
const config = require('./../config.json');
const package = require("../package.json");

function jwtMiddleware() {
    const { secret } = config.tokenOptions;
    const { APIVersion } = package;
    return expressJwt({ secret })
        .unless({
            path: [
                // public routes that don't require authentication
                `/${APIVersion}`,
                `/${APIVersion}/users/token`,
                `/${APIVersion}/users/refreshToken`
            ]
        });
}

module.exports = jwtMiddleware;
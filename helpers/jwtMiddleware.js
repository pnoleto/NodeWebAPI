const expressJwt = require('express-jwt');
const config = require('./../config.json');
const currentVersion = require("../package.json")

function jwtMiddleware() {
    const { secret } = config;
    return expressJwt({ secret })
        .unless({
            path: [
                // public routes that don't require authentication
                `/${currentVersion.APIVersion}/users/token`
            ]
        });
}

module.exports = jwtMiddleware;
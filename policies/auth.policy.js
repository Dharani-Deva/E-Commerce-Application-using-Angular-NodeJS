const JWTService = require('../services/auth.service');

module.exports = (req, res, next) => {
    let tokenToVerify;

    if (req.header('Authorization')) {
        const parts = req.header('Authorization').split(' ');

        if (parts.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if (/^bearer$/.test(scheme)) {
                tokenToVerify = credentials;
            } else {
                return res.status(401).json({
                    status: 'FAILURE',
                    description: 'VP004',
                    msg: 'Format for Authorization: bearer [token]'
                });
            }
        } else {
            return res.status(401).json({
                status: 'FAILURE',
                description: 'VP004',
                msg: 'Format for Authorization: bearer [token]'
            });
        }
    } else if (req.body.token) {
        tokenToVerify = req.body.token;
        delete req.query.token;
    } else {
        return res.status(401).json({
            status: 'FAILURE',
            description: 'VP004',
            msg: 'No Authorization was found'
        });
    }

    return JWTService().verify(tokenToVerify, (err, thisToken) => {
        if (err) return res.status(401).json({ err });
        req.token = thisToken;

        return next();
    });
};
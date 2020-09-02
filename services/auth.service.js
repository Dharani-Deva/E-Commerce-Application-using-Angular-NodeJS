const jwt = require('jsonwebtoken');

const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : '12345-6262626-2888827';

const authService = () => {
    const issue = (payload) => jwt.sign(payload, secret, { expiresIn: 10800000 });
    const verify = (token, cb) => jwt.verify(token, secret, {}, cb);
    return {
        issue,
        verify,
    };
};

module.exports = authService;
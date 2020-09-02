const models = require('./../models');
const roleAccessService = () => {
    const grandPermission = async(token, method, routes, cb) => {
        try {
            const user = await models.User.findOne({
                where: {
                    id: token.id
                },
                include: [{ all: true }]
            });
            if (user === null) {
                return cb({ msg: 'Access Denied' });
            } else {
                return cb(null, {
                    user: token,
                    userDetails: user
                });
            }
        } catch (err) {
            return cb({ msg: 'Access Denied' });
        }
    };
    return {
        grandPermission
    };
};

module.exports = roleAccessService;
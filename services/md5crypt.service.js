var md5 = require('md5');

const md5CryptService = () => {
    const password = key => {
        return md5(key);
    };

    const comparePassword = (pw, hash) => bcrypt.compareSync(pw, hash);

    return {
        password,
        comparePassword
    };
};

module.exports = md5CryptService;
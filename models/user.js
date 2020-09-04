module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user', {
            name: {
                type: DataTypes.STRING(255)
            },
            email: {
                type: DataTypes.STRING(255)
            },
            password: {
                type: DataTypes.STRING(255)
            },
            isSeller: {
                type: DataTypes.BOOLEAN
            }
        }, {
            tableName: 'user'
        }
    );
    return user;
};
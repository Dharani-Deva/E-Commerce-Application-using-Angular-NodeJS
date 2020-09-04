module.exports = (sequelize, DataTypes) => {
    const userAddress = sequelize.define(
        'userAddress', {
            addr1: {
                type: DataTypes.STRING(255)
            },
            addr2: {
                type: DataTypes.STRING(255)
            },
            city: {
                type: DataTypes.STRING(255)
            },
            state: {
                type: DataTypes.STRING(255)
            },
            country: {
                type: DataTypes.STRING(255)
            },
            postalCode: {
                type: DataTypes.STRING(255)
            },
            user_id: {
                type: DataTypes.INTEGER
            }
        }, {
            tableName: 'userAddress'
        }
    );
    return userAddress;
};
const Sequelize = require('sequelize');
const models = require('../models');
const router = require('express').Router();

const jwt = require('jsonwebtoken');
const checkJWT = require('../services/auth.jwt');
const bcryptService = require('../services/bcrypt.service');

const jwt_secret = "3-C0mm3rc3"

router.get('/', (req, res) => {
    var user = {};
    user.name = "name";
    user.email = "email";
    user.password = "password";
    user.isSeller = "isSeller";

    var token = jwt.sign({
        user: user
    }, jwt_secret, {
        expiresIn: '7d'
    });

    console.log(token)
    res.json({
        success: true,
        message: 'Enjoy your token',
        token: token
    });
});

//sign up
router.post('/signup', async(req, res, next) => {

    const { name, email, password, isSeller } = req.body;

    var user = {};
    user.name = name;
    user.email = email;
    user.password = password;
    user.isSeller = isSeller;

    var userList = await models.user.findOne({
        where: { email: email }
    }).then((existingUser) => {
        console.log(existingUser)
        if (existingUser) {
            res.json({
                success: false,
                message: 'Account with that email is already exist'
            });
        } else {
            models.user.create({
                name: name,
                email: email,
                password: bcryptService().password(user),
                isSeller: isSeller
            }).then((createUser) => {
                var token = jwt.sign({
                    user: createUser
                }, jwt_secret, {
                    expiresIn: '7d'
                });
                res.json({
                    success: true,
                    message: 'Enjoy your token',
                    token: token
                });
            });
        }
    });
});

//Function to facilitate login feature
router.post('/login', (req, res, next) => {

    models.user.findOne({
        where: { email: req.body.email }
    }).then((user) => {
        console.log(user)
        if (!user) {
            res.json({
                success: false,
                message: 'Authenticated failed, User not found'
            });

        } else {
            console.log('else')
            console.log(req.body.password, user.password)
            var validPassword = bcryptService().comparePassword(req.body.password, user.password);
            console.log(req.body.password, user, validPassword)
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password'
                });
            } else {
                var token = jwt.sign({
                    user: user
                }, jwt_secret, {
                    expiresIn: '7d'
                });

                res.json({
                    success: true,
                    mesage: "Enjoy your token",
                    token: token
                });
            }
        }

    }).catch((err) => {
        console.log(err)
    });
});


//Function to handle Profile API (GET,POST) functionality for authenticated users 
router.route('/profile')
    .get(checkJWT, (req, res, next) => {
        models.user.findOne({
                where: { id: req.decoded.user.id }
            })
            .then((user) => {
                res.json({
                    success: true,
                    user: user,
                    message: "Successful"
                });
            });
    });

router.route('/profile/update')
    .post(checkJWT, (req, res, next) => {
        models.user.findOne({
                where: { id: req.decoded.user.id }
            })
            .then((user) => {

                if (req.body.name) user.name = req.body.name;
                if (req.body.email) user.email = req.body.email;
                if (req.body.password) user.password = req.body.password;

                user.isSeller = req.body.isSeller;
                user.password = bcryptService().password(user)
                models.user.update({
                    user
                }, {
                    where: { id: req.decoded.user.id }
                });

                res.json({
                    success: true,
                    message: 'Successfully edited your profile'
                });
            });
    });

router.route('/address')
    .get(checkJWT, (req, res, next) => {
        models.userAddress.findOne({
            where: { user_id: req.decoded.user.id }
        }).then((address) => {
            res.json({
                success: true,
                address: address,
                message: "Successful"
            });
        });
    });

router.route('/address')
    .post(checkJWT, async(req, res, next) => {
        var address = await models.userAddress.findOne({
            where: { user_id: req.decoded.user.id }
        })


        console.log(req.body, address)
        if (address) {

            if (req.body.addr1) address.addr1 = req.body.addr1;
            if (req.body.addr2) address.addr2 = req.body.addr2;
            if (req.body.city) address.city = req.body.city;
            if (req.body.state) address.state = req.body.state;
            if (req.body.country) address.country = req.body.country;
            if (req.body.postalCode) address.postalCode = req.body.postalCode;

            var address = models.userAddress.update({ address }, {
                where: { user_id: req.decoded.user.id }
            })
            res.json({
                success: true,
                message: 'Successfully edited your address'
            });
        } else {
            var createAddress = models.userAddress.create({
                addr1: req.body.addr1,
                addr2: req.body.addr2,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                postalCode: req.body.postalCode,
                user_id: req.decoded.user.id
            });

            res.json({
                success: true,
                message: 'Successfully created your address'
            });
        }
    });

//Exporting the module 
module.exports = router;
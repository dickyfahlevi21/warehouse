const {
    users,
    products
} = require("../models");
const {
    registerValidation,
    loginValidation
} = require("../../validation");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const response = {
    status: false,
    message: "",
    data: [],
};

class LoginController {

    static async login(req, res) {
        const {
            username,
            password
        } = req.body;

        // validate user's login
        const {
            error
        } = loginValidation(req.body);
        if (error) return res.status(400).json(error.details[0].message)

        // Check if it existing user's username
        const user = await users.findOne({
            where: {
                username: username
            }
        })
        if (!user) return res.status(400).json('Username is not found!')

        // Valid Password
        // if(user.password == password) return res.send('Logged in!')
        if (user.password != password) return res.status(400).send('Invalid password')
        // const validPass = await bcrypt.compare(password, user.password);
        // if (!validPass) return res.status(400).send('invalid password!')

        // Create and send a token
        const token = jwt.sign({
            id: user.id
        }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    }

    static async register(req, res) {
        const {
            username,
            password,
            email
        } = req.body;

        // validate before become user
        const {
            error
        } = registerValidation(req.body);
        if (error) return res.status(400).json(error.details[0].message)

        // Check if it existing user's email
        const emailExist = await users.findOne({
            where: {
                email: email
            }
        })

        // Check if it existing user's username
        const usernameExist = await users.findOne({
            where: {
                username: username
            }
        })

        // Hash passwords
        const salted = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salted);

        try {
            if (usernameExist) return res.status(404).json('Username already exists')
            else if (emailExist) return res.status(404).send('Email already exists')
            else {
                const savedUser = await users.create({
                    username,
                    password,
                    email,
                    salt: hashedPassword
                });
                response.data = {
                    Username: savedUser.username,
                    Salt: savedUser.salt,
                    Email: savedUser.email,
                };
                response.status = true;
                response.message = "Berhasil tambah data"
                res.status(201).json(response);
            }
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

module.exports = LoginController;
const { userGameModel } = require('../models/UserGameModel')
const CryptoJS = require('crypto-js');

class UserGameController {
    static async getAllData(req, res) {
        try {
            // 1. ambil semua data user game
            const allUserGame = await userGameModel.getAllUserGame();

            // 2. kirim semua data ke user
            res.json({ data: allUserGame });
        } catch(error) {
            console.log(error);
            res.status(500).send('Internal Server Error!');
        }  
    }

    static async getData(req, res) {
        try {
            // 1. ambil semua data user game
            const email = req.body.email;
            console.log(email);

            const userGame = await userGameModel.getUserGame(email);

            // 2. kirim semua data ke user
            res.json({ data: userGame });
        } catch(error) {
            console.log(error);
            res.status(500).send('Internal Server Error!');
        }  
    }

    static async insertData(req, res) {
        try {
            const data = req.body;
            console.log(data);

            const inputUserName = data.username;
            const inputEmail = data.email
            const inputPassword = data.password;
            const inputConfirmPassword = data.confirmPassword;
            const inputScores = data.scores;
            
            // check duplicate email
            const existingEmail = await userGameModel.checkDuplicateEmail(inputEmail);

            // check duplicate username
            const existingUsername = await userGameModel.checkDuplicateUsername(inputUserName);

            if (existingEmail) {
                console.log('Email Already Exists !');
                return res.status(400).json({ message: 'Email Already Exists !' });
            }

            if (existingUsername) {
                console.log('Username Already Exists !');
                return res.status(400).json({ message: 'Username Already Exists !' });
            }

            // check password and confirmPassword
            if (inputPassword !== inputConfirmPassword) {
                console.log('Password and Confirm Password Does Not Match !');
                return res.status(400).json({ message: 'Password and Confirm Password Does Not Match !' });
            }

            const hashedPassword = CryptoJS.HmacSHA256(inputPassword, process.env.SECRET_LOGIN).toString();

            const newData = {
                username: inputUserName,
                email: inputEmail,
                password: hashedPassword,
                scores: inputScores
            }

            await userGameModel.insertNewUserGame(newData);
            res.json({ status: 'success' });
        } catch(error) {
            console.log(error);
            res.status(500).send('Internal Server Error!');
        }  
    }
};

module.exports = { UserGameController }
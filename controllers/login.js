const { User } = require("../models/user");
const log = console.log;


// check if a user is logged in on the session cookie
const readCookie = (req, res) => {
    if (req.session.user) {
        res.send({
            currentUser: req.session.user,
            username: req.session.username,
            role: req.session.role,
            nickName: req.session.nickName
        });
    } else {
        res.status(401).send({currentUser: ''});
    }
};


const submit = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const errors = {
        username: '',
        password: '',
        usernameBool: false,
        passwordBool: false,
        checkBool: false
    };

    if (!username.trim()) {
        errors.username = 'Required';
        errors.usernameBool = true;
    }

    if (!password) {
        errors.password = 'Required';
        errors.passwordBool = true;
    }

    User.findByUsernamePwd(username, password)
        .then(user => {
            req.session.user = user._id;
            req.session.username = user.username;
            req.session.nickName = user.nickName;
            req.session.role = user.role;
            res.send({
                currentUser: user._id,
                username: user.username,
                role: user.role,
                nickName: user.nickName
            });
        })
        .catch(error => {
            log(error);
            errors.checkBool = true;
            res.status(400).send({ errors: errors });
        });
};


const signUp = (req, res) => {
    const { username, password, repeatPwd, nickName } = req.body;
    const errors = {
        username: "",
        password: "",
        repeatPwd: "",
        nickName: "",
        usernameBool: false,
        passwordBool: false,
        repeatPwdBool: false,
        nickNameBool: false
    };

    if (!username.trim()) {
        errors.username = 'Required';
        errors.usernameBool = true;
    }

    if (!password) {
        errors.password = 'Required';
        errors.passwordBool = true;
    }

    if (!repeatPwd) {
        errors.repeatPwd = 'Required';
        errors.repeatPwdBool = true;
    }

    if (!nickName) {
        errors.nickName = 'Required';
        errors.nickNameBool = true;
    }

    if (password && repeatPwd && password !== repeatPwd) {
        errors.repeatPwd = "Repeated password not match";
        errors.repeatPwdBool = true;
    }

    if (errors.usernameBool || errors.passwordBool || errors.repeatPwdBool || errors.nickNameBool) {
        res.status(400).send({ errors });
    } else {
        const user = new User({
            username: username,
            role: "user",
            password: password,
            nickName: nickName
        });

        user.save().then(
            user => {
                req.session.user = user._id;
                req.session.username = user.username;
                req.session.nickName = user.nickName;
                req.session.role = user.role;
                res.send({
                    currentUser: user._id,
                    username: user.username,
                    role: user.role,
                    nickName: user.nickName
                });
            },
            error => {
                log(error);

                if (error.name === 'MongoError' && error.code === 11000) {
                    if (Object.keys(error.keyValue)[0] === "nickName") {
                        errors.nickName = "Nick name already existed";
                        errors.nickNameBool = true;
                    }

                    if (Object.keys(error.keyValue)[0] === "username") {
                        errors.username = 'Username already existed';
                        errors.usernameBool = true;
                    }
                }

                if (error.name === 'ValidationError') {
                    errors.username = "Not valid email";
                    errors.usernameBool = true;
                }

                res.status(400).send({ errors }); // 400 for bad request
            }
        );
    }
};


const logout = (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            log(error);
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
};


module.exports = { readCookie, submit, signUp, logout };
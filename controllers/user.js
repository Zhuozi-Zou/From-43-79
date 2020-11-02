const { User } = require("../models/user");
const log = console.log;

exports.findAll = function (req, res) {
    User.find( {status: 'active'} ).then(
        users => {
            res.send({ users });
        },
        error => {
            console.log(error);
            res.status(500).send(error);
        }
    );
};

exports.findById = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        res.send({ user });
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
    })
};

exports.changePassword = function (req, res) {
    const { oldPwd, repeatPwd, newPwd, username } = req.body;
    const errors = {
        oldPwd: "",
        newPwd: "",
        repeatPwd: "",
        oldPwdBool: false,
        newPwdBool: false,
        repeatPwdBool: false
    };

    if (!oldPwd) {
        errors.oldPwd = 'Required';
        errors.oldPwdBool = true;
    }

    if (!newPwd) {
        errors.newPwd = 'Required';
        errors.newPwdBool = true;
    }

    if (!repeatPwd) {
        errors.repeatPwd = 'Required';
        errors.repeatPwdBool = true;
    }

    if (newPwd && repeatPwd && newPwd !== repeatPwd) {
        errors.repeatPwd = "Repeated new password not match";
        errors.repeatPwdBool = true;
    }

    if (errors.oldPwdBool || errors.repeatPwdBool || errors.newPwdBool) {
        res.status(400).send({ errors });
    } else {
        User.findByUsernamePwd(username, oldPwd)
            .then(user => {
                user.password = newPwd;
                user.save().then(
                    user => {
                        log("Current user password changed");
                        res.send({ user });
                    },
                    error => {
                        log(error);
                        res.status(500).send({ error });
                    }
                );
            })
            .catch(error => {
                log(error);
                errors.oldPwd = "Old password not match";
                errors.oldPwdBool = true;
                res.status(400).send({ errors });
            });
    }
};


exports.editAccount = function (req, res) {
    const { age, phone, nickName } = req.body;
    const errors = {
        age: "",
        phone: "",
        nickName: "",
        ageBool: false,
        phoneBool: false,
        nickNameBool: false
    };

    if (!nickName) {
        errors.nickName = "Required";
        errors.nickNameBool = true;
    }

    if (age) {
        if (isNaN(age)) {
            errors.age = "Age must be a number";
            errors.ageBool = true;
        } else {
            const ageInt = parseInt(age);
            if (ageInt < 12 || ageInt > 150) {
                errors.age = "Age must be between 12 to 150";
                errors.ageBool = true;
            }
        }
    }

    if (phone) {
        if (isNaN(phone)) {
            errors.phone = "Phone must be a number";
            errors.phoneBool = true;
        } else {
            if (phone.length > 16) {
                errors.phone = "Phone number too long";
                errors.phoneBool = true;
            }
        }
    }

    if (errors.nickNameBool || errors.ageBool || errors.phoneBool) {
        res.status(400).send({ errors });
    } else {
        const newInfo = {};
        Object.entries(req.body).forEach(([key, value]) => {
            newInfo[key] = value;
        });

        User.findByIdAndUpdate(req.params.id, {$set: newInfo}, {new: true})
            .then(user => {
                if (!user) {
                    log("No user found");
                    res.status(404).send();
                } else {
                    log("Current user account edited");
                    res.send({ user });
                }
            })
            .catch(error => {
                log(error);
                if (error.name === 'MongoError' && error.code === 11000) {
                    if (Object.keys(error.keyValue)[0] === "nickName") {
                        errors.nickName = "Nick name already existed";
                        errors.nickNameBool = true;
                    }
                }
                res.status(400).send({ errors });
            });
    }
};


exports.deleteUser = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: { status: "inactive" }}, {new: true})
        .then(user => {
            if (!user) {
                log("No user found");
                res.status(404).send();
            } else {
                log("Deleted user: " + user.username);
                res.send(user);
            }
        })
        .catch(error => {
            log(error);
            res.status(500).send(error);
        });
};
/* User mongoose model */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,   // custom validator
            message: 'Not valid email'
        }
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        min: 12,
        max: 150,
        default: null
    },
    gender: { type: String, default: "" },
    field: { type: String, default: "" },
    contact: { type: String, default: "" },
    phone: { type: Number, default: null },
    notes: { type: String, default: "" },
    aboutMe: { type: String, default: "" },
    status: {
        required: true,
        type: String,
        default: 'active'
    }
},
{
    timestamps: true
});


UserSchema.pre('save', function(next) {
    const user = this;

    // checks to ensure we don't hash password more than once
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next()
    }
});


// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePwd = function(username, password) {
    const User = this;

    return User.findOne({ username: username, status: "active" }).then((user) => {
        if (!user) {
            console.log("No user exists");
            return Promise.reject()
        }
        // if the user exists, make sure their password is correct
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user)
                } else {
                    console.log("Password does not match");
                    reject()
                }
            })
        })
    })
};


const User = mongoose.model('User', UserSchema, 'Users');
module.exports = { User };
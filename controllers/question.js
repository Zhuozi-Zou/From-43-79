const { Question } = require("../models/question");
const { Comment } = require("../models/comment");

exports.findAll = function (req, res) {
    Question.find({status: 'active'})
        .populate('user')
        .populate('type')
        .populate('region')
        .populate('theme')
        .populate({
            path: 'comments',
            model: 'Comment',
            populate: [
                {path: 'user', model: 'User'},
                {path: 'replyTo', model: 'Comment'}
            ]
        })
        .then(
        questions => {
            res.send({ questions });
        },
        error => {
            res.status(500).send(error);
        }
    );
};

exports.addNewQuestion = function (req, res) {
    const newQuestion = new Question({
        user:req.body.user,
        type: req.body.type,
        region: req.body.region,
        theme: req.body.theme,
        briefInfo: req.body.briefInfo,
        details: req.body.details,
        comments: [],
        postTime: Date.now()
    });
    newQuestion.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        });
};

exports.getQuestionById = function (req, res) {
    Question.findById(req.params.id)
        .populate('user')
        .populate('type')
        .populate('region')
        .populate('theme')
        .populate({
            path: 'comments',
            model: 'Comment',
            populate: [
                {path: 'user', model: 'User'},
                {path: 'replyTo', model: 'Comment'}
            ]
        })
        .then(
        result => {
            console.log("result:", result);
            res.send(result);
        },
        error => {
            console.log("error", error);
            res.status(500).send(error);
        }
    );
};

exports.addNewComment = function (req, res) {
    const comment = new Comment({
        user: req.body.user,
        comment: req.body.comment,
        replyTo: req.body.replyTo
    });
    const question = req.body.question;

    comment.save()
        .then(com => {
            Question.findByIdAndUpdate(question, { $push: {comments : com.id} }, {new: true})
                .then((result) => {
                    if (!result) {
                        res.status(404).send()
                    } else {
                        console.log("result:", result);
                        res.send(result)
                    }
                }).catch((error) => {
                    console.log(error);
                    res.status(400).send(error)
                })
            }).catch((error) => {
                console.log(error);
                res.status(400).send(error)
            })
};

exports.deleteQuestion = function (req, res) {
    Question.findByIdAndUpdate(req.params.id, {$set: { status: "inactive" }}, {new: true})
        .then(question => {
            if (!question) {
                console.log("No question found");
                res.status(404).send();
            } else {
                console.log("One question deleted!");
                res.send(question);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
};
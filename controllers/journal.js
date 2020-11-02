const { Journal } = require("../models/journal");
const { Comment } = require("../models/comment");

exports.findAll = function (req, res) {
    Journal.find({status: 'active'})
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
        journals => {
            res.send({ journals });
        },
        error => {
            res.status(500).send(error);
        }
    );
};

exports.getJournalById = function (req, res) {
    Journal.findById(req.params.id)
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
                res.send(result);
            },
            error => {
                res.status(500).send(error);
            }
        );
};

exports.addNewJournal = function (req, res) {
    const newJournal = new Journal({
            user:req.body.user,
            type: req.body.type,
            startDate: req.body.start,
            endDate: req.body.end,
            region: req.body.region,
            theme: req.body.theme,
            briefInfo: req.body.briefInfo,
            details: req.body.details,
            comments: [],
            postTime: Date.now()
    });
    newJournal.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        });
};

exports.addNewComment = function (req, res) {
    const comment = new Comment({
        user: req.body.user,
        comment: req.body.comment,
        replyTo: req.body.replyTo
    });
    const journal = req.body.journal;

    comment.save()
        .then(com => {
            Journal.findByIdAndUpdate(journal, { $push: {comments : com.id} }, {new: true})
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

exports.deleteJournal = function (req, res) {
    Journal.findByIdAndUpdate(req.params.id, {$set: { status: "inactive" }}, {new: true})
        .then(journal => {
            if (!journal) {
                console.log("No journal found");
                res.status(404).send();
            } else {
                console.log("One journal deleted!");
                res.send(journal);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
};


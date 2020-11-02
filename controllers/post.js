const { Post } = require("../models/post");
const { Comment } = require("../models/comment");

exports.findAll = function (req, res) {
    Post.find({status: 'active'})
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
        posts => {
            res.send({ posts });
        },
        error => {
            res.status(500).send(error);
        }
    );
};

exports.getPostById = function (req, res) {
    Post.findById(req.params.id)
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

exports.addNewPost = function (req, res) {
    const newPost = new Post({
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
    newPost.save().then(
        result => {
            console.log("result:", result);
            res.send(result);
        },
        error => {
            console.log(error)
            res.status(400).send(error); // 400 for bad request
        });
};

exports.addNewComment = function (req, res) {
    const comment = new Comment({
        user: req.body.user,
        comment: req.body.comment,
        replyTo: req.body.replyTo
    });
    const post = req.body.post;

    comment.save()
        .then(com => {
            Post.findByIdAndUpdate(post, { $push: {comments : com.id} }, {new: true})
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

exports.deletePost = function (req, res) {
    Post.findByIdAndUpdate(req.params.id, {$set: { status: "inactive" }}, {new: true})
        .then(post => {
            if (!post) {
                console.log("No post found");
                res.status(404).send();
            } else {
                console.log("One post deleted!");
                res.send(post);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
};
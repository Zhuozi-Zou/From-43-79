const { Tag } = require("../models/tag");

exports.findAll = function (req, res) {
    Tag.find().then(
        tags => {
            res.send({ tags });
        },
        error => {
            res.status(500).send(error);
        }
    );
};

exports.findById = function (req, res) {
    const id = req.params.id;
    Tag.findById(id)
        .then(tag => {
            if (!tag) {
                res.status(404).send();
            } else {
                res.send(tag);
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

exports.findByPage = function (req, res) {
    Tag.find({ page: req.params.page }).then(
        tags => {
            res.send({ tags });
        },
        error => {
            res.status(500).send(error);
        }
    );
};

exports.addNewTag = function (req, res) {
    const tag = new Tag({
        name: req.body.name,
        filter: req.body.filter,
        page: req.params.page,
        addedBy: req.body.user
    });

    tag.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error);
        }
    );
};

exports.updateTag = function (req, res) {
    const id = req.params.id;

    Tag.findByIdAndUpdate(id, {$set: { name: req.body.name, status: req.body.status }}, {new: true})
        .then(tag => {
            if (!tag) {
                res.status(404).send();
            } else {
                res.send({ tag });
            }
        });
};
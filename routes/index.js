module.exports = function (app) {
    const login = require("../controllers/login");
    const user = require("../controllers/user");
    const journal = require("../controllers/journal");
    const post = require("../controllers/post");
    const question = require("../controllers/question");
    const tag = require("../controllers/tag");

    app.get("/login/check-session", login.readCookie);
    app.get("/login/logout", login.logout);
    app.post("/login/submit", login.submit);
    app.post("/login/signUp", login.signUp);

    app.get("/users", user.findAll);
    app.get("/users/:id", user.findById);
    app.patch("/users/:id/changePassword", user.changePassword);
    app.patch("/users/:id/editAccount", user.editAccount);
    app.patch("/users/:id/deleteUser", user.deleteUser);

    app.get("/journals", journal.findAll);
    app.get("/journals/:id", journal.getJournalById);
    app.post("/journals/addNewJournal", journal.addNewJournal);
    app.post("/journals/addNewComment", journal.addNewComment);
    app.patch("/journals/delete/:id", journal.deleteJournal);

    app.get("/posts", post.findAll);
    app.get("/posts/:id", post.getPostById);
    app.post("/posts/addNewPost", post.addNewPost);
    app.post("/posts/addNewComment", post.addNewComment);
    app.patch("/posts/delete/:id", post.deletePost);

    app.get("/questions", question.findAll);
    app.get("/questions/:id", question.getQuestionById);
    app.post("/questions/addNewQuestion", question.addNewQuestion);
    app.post("/questions/addNewComment", question.addNewComment);
    app.patch("/questions/delete/:id", question.deleteQuestion);

    app.get("/tags", tag.findAll);
    app.get("/tags/:page", tag.findByPage);
    app.post("/tags/:page", tag.addNewTag);
    app.patch("/tags/:id", tag.updateTag);
};
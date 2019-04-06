const db = require('../models');

module.exports = function(app) {
    app.patch("/api/save", (req, res) => {
        db.Article.updateOne({ _id: req.body.id }, {$set: {isSaved: true}}, {}, data => {
            res.json(data)
        });
    });

    app.patch("/api/unsave", (req, res) => {
        db.Article.updateOne({ _id: req.body.id }, {$set: {isSaved: false}}, {}, data => {
            res.json(data)
        });
    });

    app.post("/api/note", (req, res) => {
        console.log(req.body)
        db.Note.create(req.body).then(dbNote => {
            console.log(dbNote);
        }).catch(err => {
            console.log(err);
        });
    });
};
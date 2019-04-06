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
};
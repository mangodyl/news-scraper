const db = require('../models');

module.exports = function(app) {
    app.patch("/api/articles", (req, res) => {
        db.Article.updateOne({ _id: req.body.id }, {$set: {isSaved: true}}, {}, data => {
            res.json(data)
        });
    });
};
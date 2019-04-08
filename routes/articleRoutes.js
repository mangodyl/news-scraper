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

    app.patch("/api/findnote", (req, res) => {
        db.Article.findOne({ _id: req.body.id })
            .populate("note")
            .then(dbArticle => {
                console.log("dbArticle response with note hopefully" + dbArticle)
                res.json(dbArticle);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/note/:id", (req, res) => {
        console.log(req.body)
        db.Note.create(req.body).then(dbNote => {
            console.log(`
            -----------
            dbNote id: ${dbNote._id}
            -----------`)
            db.Article.updateOne({ _id: req.params.id }, { note: dbNote._id}).then(response => {
                console.log("updated");
            })
        }).catch(err => {
            console.log(err);
        });
    });

    app.post("/api/deletenote/:id", (req, res) => {
        db.Article.findOne({ _id: req.params.id })
            .populate("note")
            .then(dbArticle => {
                console.log(dbArticle);
                const noteId = dbArticle.note._id;
                return db.Note.findByIdAndRemove(noteId);
            })
            .then(() => {
                res.json({ "message": "success" });
            })
            .catch(err => {
                res.json(err);
            });
    });
};
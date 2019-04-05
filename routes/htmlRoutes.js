const db = require('../models');

module.exports = function(app) {
    app.get("/", (req, res) => {
        res.render("index")
    });

    app.get("/articles", (req, res) => {
        db.Article.find({isSaved: false}, (error, data) => {
            if (error) {
                console.log(error);
            } else if (data.length === 0) {
                console.log("rendering index again");
                res.render("index")
            } else {
                console.log("rendering articles hbars");
                const hbarsObj = {
                    articles: data
                };
                res.render("articles", hbarsObj);
            }

        });
    });

    app.get("/saved", (req, res) => {
        db.Article.find({isSaved: true}, (error, data) => {
            if (error) throw error;
            const hbarsObj = {
                articles: data
              };
              console.log(hbarsObj);
              res.render("saved", hbarsObj);
        });
    });
};


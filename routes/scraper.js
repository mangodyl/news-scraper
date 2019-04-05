const axios = require('axios');
const cheerio = require('cheerio');

const db = require('../models');

module.exports = function(app) {
    app.get("/scrape", (req, res) => {
        axios.get("https://www.npr.org/sections/music-news/").then(response => {
            const $ = cheerio.load(response.data);

            const results = [];

            $("div.item-info").each((i, element) => {
                const title = $(element).children("h2").children().text();
                const link = $(element).children("h2").children().attr("href");
                const text = $(element).children("p").children().text();
                // const date = $(element).children("p").children().children().children().text();


                results.push({
                    title: title,
                    link: link,
                    text: text
                });
            });

            results.forEach((element, i) => {
                db.Article.find({title: results[i].title},  (err, data) => {
                    if (data.length === 0) {
                        db.Article.create(results[i]).then(dbArticle => {
                            console.log(dbArticle);
                            if(i === results.length -1){
                                res.send("Scrape complete");
                            }
                        }).catch(err => {
                            console.log(err)
                        });
                    } else {
                        console.log(`Found copy of ${results[i].title}`)
                        if(i === results.length -1){
                            res.send("Scrape complete");
                        }
                        return;
                    }
                });
            });
        });
    });
};
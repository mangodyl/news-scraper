const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express.Router();

const db = require('../models');

module.exports = function(app) {
    app.get("/scrape", (req, res) => {
        axios.get("https://www.npr.org/sections/music-news/").then(response => {
            const $ = cheerio.load(response.data);

            $("div.item-info h2").each((i, element) => {
                console.log(i);
                console.log(element);
            });
        });
    });
};
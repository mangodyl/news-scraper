const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

const PORT = 7070;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require('./routes/scraper')(app);
require('./routes/htmlRoutes')(app);
require('./routes/articleRoutes')(app);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articlesdb";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
    console.log("Database connected");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});
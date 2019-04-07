const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    text:  {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    isSaved: {
        type: Boolean,
        default: false
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
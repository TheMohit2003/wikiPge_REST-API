const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

const connectToDb = async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
connectToDb().catch(console.error);

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});
const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
    .get((req, res) => {
        Article.find({}, (err, foundArticles) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.send(foundArticles);
        });
    })
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save((err) => {
            if (!err) {
                res.send("sucess")
            } else {
                res.send(err.message)
            }
        })

    })
    .delete((req, res) => {
        Article.deleteMany({}, (err) => {
            if (!err) {
                res.send("Deleted")
            } else {
                res.send(err.message)
            }
        })
    })


app.route("/articles/:title")
     .get((req,res)=>{
        Article.findOne({title:req.params.title},(err,foundList)=>{
            if(!err){res.send(foundList)}
            else{res.send(err.message)}
        })
    })
    .put((req,res)=>{
        Article.replaceOne(
            {title:req.params.title},
            {title:req.body.title,content:req.body.content},
            (err)=>{res.send("added")}
        )
    })

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
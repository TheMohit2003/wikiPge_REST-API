const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"))


main().catch(err => console.log(err));
async function main() {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

}

const wikiSchema = new mongoose.Schema({
    title:String,
    content:String
})
const Page = new mongoose.model("article",wikiSchema);


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
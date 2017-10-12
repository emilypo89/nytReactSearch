// -------------------------------------------------
// Server Dependencies
// -------------------------------------------------
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Models schema
var Article = require("./models/Article");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3001;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("build"));

// -------------------------------------------------
// MongoDB configuration (Change this URL to your own DB)
// -------------------------------------------------
var databaseURL = "mongodb://localhost/nytreact";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect(databaseURL);
}
var db = mongoose.connection;


db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------
// ROUTES
// -------------------------------------------------


// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) { res.sendFile(__dirname + "/build/static/index.html"); });

// * `/api/saved` (get) - your components will use this to query MongoDB for all saved articles
app.get("/api/saved", function(req, res) {

  // This GET request will search for the latest clickCount
  Article.find({}).exec(function(err, doc) {

    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// * `/api/saved` (post) - your components will use this to save an article to the database
app.post("/api/saved", function(req, res) {
  // console.log(req.body);
  var article = req.body;
  console.log(article);
  console.log(article.web_url);
  console.log(article.headline.main);
  console.log(article.byline.original);
  console.log(article.pub_date);


  var savedArticle = new Article({headline: article.headline.main, byline: article.byline.original, pubDate: article.pub_date, url: article.web_url});

  savedArticle.save(function(err, savedArticle) {

    if (err) {
      return res.json({ error: 'there was an error saving the item' });
    } else {
      // console.log(savedItem)
      return res.json(savedArticle);
    }
  });
});

// * `/api/saved` (delete) - your components will use this to delete a saved article in the database
app.delete("/api/saved/:id", (req, res) => {
  console.log("made it to delete route")
  Article.remove({_id: req.params.id}, function (err, doc) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(doc);
    return res.json(doc);
  })
})

// -------------------------------------------------
// Starting express server
// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

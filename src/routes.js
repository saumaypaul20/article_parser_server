var express = require('express');
var router = express.Router();

var parser = require('horseman-article-parser');
const {
  extract 
} = require('article-parser');


router.get('/', function (req, res, next) {
  console.log("Got a GET request for the homepage");
  res.json('Hello GET');
  
});

router.get('/getparsed', function (req, res, next) {
  console.log("req",typeof req.query.url)
  console.log("Got a parse request for the homepage");
  // res.send(JSON.stringify(req));
  var options = {
    url: req.query.url,
    enabled: [ 'links', 'sentiment', 'entities', 'spelling', 'keywords']
  }
  
  parser.parseArticle(options)
    .then(function (article) {
  
      var response = {
        title: article.title.text,
        excerpt: article.excerpt,
        metadescription: article.meta.description.text,
        url: article.url,
        sentiment: { score: article.sentiment.score, comparative: article.sentiment.comparative },
        keyphrases: article.processed.keyphrases,
        keywords: article.processed.keywords,
        people: article.people,
        orgs: article.orgs,
        places: article.places,
        text: {
          raw: article.processed.text.raw,
          formatted: article.processed.text.formatted,
          html: article.processed.text.html
        },
        // spelling: article.spelling,
        // meta: article.meta,
        // links: article.links,
        // lighthouse: article.lighthouse
      }
  
      res.json(response);
    })
    .catch(function (error) {
      console.log(error.message)
      console.log(error.stack);
    })
});

router.get('/getparsed2', function (req, res, next) {
  if(!req.query.url){return res.status(403).send("bad data")}
  console.log("req",typeof req.query.url)
  console.log("Got a parse request for the homepage");
  // res.send(JSON.stringify(req));
  const url =  req.query.url;
  extract(url).then((article) => {
    console.log(article);
    return res.status(200).send({data : article});
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router
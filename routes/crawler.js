var express = require('express');
var router = express.Router();
var Crawler = require("simplecrawler");
// var request = require('request');
// var url = require('url');
// var parseRobots = require("robots-parser");


/* GET users listing. */
router.get('/', function(req, res, next) {

  var targetUrl = "www.xiachufang.com";
  var initialPort = 80;
  var initialPath = "/activity/site/?order=pop";

  var crawler = new Crawler(targetUrl, initialPath, initialPort);

  crawler.interval = 100;

  crawler.maxDepth = 2;

  crawler.on("crawlstart", function() {
    console.log("Crawl starting");
  });

  crawler.on("fetchstart", function(queueItem) {
    console.log("fetchStart", queueItem.url);
  });

  crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    console.log("Completed fetching resource:", queueItem.url);
    console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
    console.log("It was a resource of type %s", response.headers['content-type']);

    // Do something with the data in responseBuffer
  });

  crawler.on("complete", function() {
      console.log("Finished!");
  });

  crawler.start();


  res.send('respond with a resource');
});

module.exports = router;

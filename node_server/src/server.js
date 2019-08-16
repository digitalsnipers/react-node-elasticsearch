const express = require("express");
var elasticsearch = require("elasticsearch");
const fs = require("fs");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");

const PORT = 5000;

const client = new elasticsearch.Client({
  host: "127.0.0.1:9200",
  log: "error"
});

client.ping({ requestTimeout: 30000 }, function(error) {
  if (error) {
    console.error("elasticsearch cluster is down!\n");
  } else {
    console.log("Elasticsearch cluster is running\n");

    app.use(bodyParser.json());

    app.post("/submit", function(req, res) {
      client
        .index({
          index: "employe",
          type: "string",
          body: req.body
        })
        .then(
          function(resp) {
            console.log(req.body.name);
            res.send("New entry added : " + req.body.name);
          },
          function(err) {
            console.log(err.message);
          }
        );
    });

    app.post("/search", function(req, res) {
      let sbody;
      if (
        req.body.name == "" &&
        req.body.gender == "" &&
        req.body.year == "" &&
        req.body.cntry == "" &&
        req.body.color == ""
      ) {
        sbody = {
          size: 24,
          query: {
            match_all: {}
          }
        };
      } else {
        sbody = {
          size: 24,
          query: {
            bool: {
              must: []
            }
          }
        };

        //pushing items to should
        if (req.body.name != "")
          sbody.query.bool.must.push({
            match: {
              name: {
                query: req.body.name,
                fuzziness: "AUTO",
                operator: "and"
              }
            }
          });
        if (req.body.gender != "")
          sbody.query.bool.must.push({
            match: {
              gender: {
                query: req.body.gender
              }
            }
          });
        if (req.body.year != "")
          sbody.query.bool.must.push({
            match: {
              year: {
                query: req.body.year
              }
            }
          });
        if (req.body.cntry != "")
          sbody.query.bool.must.push({
            match: {
              cntry: {
                query: req.body.cntry
              }
            }
          });
        if (req.body.color != "")
          sbody.query.bool.must.push({
            match: {
              color: {
                query: req.body.color
              }
            }
          });
      } //else closing

      client
        .search({
          index: "employe",
          type: "string",
          body: sbody
        })
        .then(
          function(resp) {
            res.json(resp.hits.hits);
          },
          function(err) {
            console.log(err.message);
          }
        );
    });
    app.post("/index", function(req, res) {
      client.indices
        .create({
          index: "employe"
        })
        .then(
          function(resp) {
            console.log(" Index created ", resp);
            res.send("done");
          },
          function(err) {
            console.log(err.message);
            res.send(" Error creating index!! please delete existing index");
          }
        );
    });
    app.get("/delete", function(req, res) {
      //manually deleate using url

      client.indices.delete(
        {
          index: "_all"
        },
        function(err, resp) {
          if (err) {
            console.error(err.message);
          } else {
            console.log("Indexes have been deleted!", resp);
            return res.json(resp);
          }
        }
      );
    });
  }
});

app.listen(PORT, function() {
  console.log("\nServer is running on PORT:", PORT);
});

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000; //(browser)local host 8001

app.use(bodyParser.json());

app.get('/posts', function(req, res) { //GET [DATABASE_URL],
      //   knex.raw("SELECT * FROM posts1").then((result)=> { //sel (all) from [table name].then return [result]
      //     res.json(result.rows)     //return result + rows
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   });
      // });
      app.get('/posts', function(req, res) {
            knex.select().from('posts').then(function(posts) { //SELECT(all) FROM "posts"
              res.send(posts); //THEN sent to "posts" table
            });

            app.get('/posts/:id', function(req, res) {
              //   knex.raw("SELECT * FROM posts1 WHERE id=" + req.params.id).then((result) => {
              //             res.json(result.rows)
              //          })
              //          .catch((err) => {
              //             console.error(err)
              //          });
              // });
              knex.select().from('posts').where('id', req.params.id).then(function(posts) {
                res.send(posts);
              })
            })

            app.post('/posts', function(req, res) {
              //    knex.raw(`INSERT INTO posts1 (content, author, upvotes)  VALUES(
              //        '${
              //          req.body.content
              //       }', '${
              //          req.body.author
              //       }', ${
              //          req.body.upvotes
              //       }
              //       )`).then(() => {
              //       res.sendStatus(200);
              //    });
              // });    //never send ID, texts req '' or "".
              knex('posts').insert({ //INSERT (content) into "posts" table.
                  content: req.body.content,
                  author: req.body.author,
                  upvotes: req.body.upvotes,
                })
                .then(function() {
                  knex.select().from('posts').then(function(posts) { //select * FROM "posts"
                    res.send(posts); //THEN send to "posts"
                  });
                });
            });

            app.delete('/posts/:id', function(req, res) {
              //   knex.raw(`DELETE FROM posts1 WHERE id = ${req.params.id}`).then(() => { //req.[params not body].id
              //     res.sendStatus(200);
              //   });
              // });
              knex('posts').where('id', req.params.id)
                .del()
                .then(function() {
                  knex.select()
                    .from('posts')
                    .then(function(posts) {
                      res.send(posts);
                    });
                });
            });

            app.patch('/posts/:id', function(req, res) {
              //   knex.raw(`UPDATE posts1 SET content='${req.body.content}',author='${req.body.author}',upvotes='${req.body.upvotes}' WHERE id=${req.params.id}`).then(() => {
              //     res.sendStatus(200);
              //   });
              // });
              knex('posts').where('id', req.params.id).update({ //selecting student ID
                  name: req.body.name, //insert name
                  age: req.body.age //insert age
                })
                .then(function() {
                  knex.select().from('posts').then(function(posts) {
                    res.send(posts);
                  })
                })
            })

            app.listen(port, function() {
              console.log('Listening on', port);
            });
const express = require('express')
const router = express.Router()
var mongojs = require('mongojs')
var db = mongojs('mongodb://PhilDelfia:jontetomte12@ds012188.mlab.com:12188/development')
// use model,snippet.js
const Snippet = require('../models/Snippet')

router.get('/snippy', (req, res) => {
  res.render('snippy')
})
router.post('/snippy', (req, res) => {
  let text = req.body.text

  // Create object to save
  let snip = new Snippet({
    text: text
  })
  snip.save().then(function () {
    // Successful
    res.redirect('/snippy')
  }).catch(function (err) {
    console.log(err.message)

    res.redirect('snippy')
  })
})
//router.delete('delete/:id')
//   let CollectedSnippets = db.collection('snippy').find().toArray(function(err, results) {
//     console.log(results)
//   })
// })
// router.post('/snippy', (req, res) => {
//   db.collection('snippy').save(req.body, (err, result) => {
//     if (err) return console.log(err)
// console.log(req.body)
//     console.log('saved to database')
//     res.redirect('/')
//   })
// })

//   router.get('/snippy', function(req, res, next){
//     db.tasks.find(function(err, tasks){
//         if(err){
//             res.send(err)
//         }
//         res.json(tasks)
//     })
// })

// router.get('/snippy/:id', function(req, res, next){
//   db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
//       if(err){
//           res.send(err)
//       }
//       res.json(task)
//   })
// })
// // Save Task
// router.post('/snippy', function(req, res, next){
//     var task = req.body
//     if(!task.title || !(task.isDone + '')){
//         res.status(400);
//         res.json({
//             "error": "Bad Data"
//         });
//     } else {
//         db.tasks.save(task, function(err, task){
//             if(err){
//                 res.send(err)
//             }
//             res.json(task)
//         })
//     }
// })

// // Delete Task
// router.delete('/task/:id', function(req, res, next){
//     db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
//         if(err){
//             res.send(err);
//         }
//         res.json(task);
//     });
// });

  // // get Single Task
  // router.route('/snippy/:id').get (function (req, res, next) {
  //   db.task.findOne({_id: mongojs.objectId(req.params.id)}, (function(err, task) {
  //     if(err){
  //       res.render(err)
  //     }
  //     res.json(task)

  //   })
  // )
  // })

//   Snippet.find().then(Snippet => {
//     console.log(Snippet)
//   })
//   res.render('snippy')
//   const note = { text: req.body.body, title: req.body.title}
//   console.log(note)

//  // })
// })
// router.get('/snippy', (req, res) => {
//   res.render('snippy')
// })
// function validSnip (snippet) {
//   return typeof snippet.text == 'string' && snippet.text.trim() !== ''
// }

// router.post('/snippy', (req, res, err) => {
//   if (validSnip(req.body)) {
//     return (err)
//    } else if (res) {
//       console.log(req.body)
//       res.redirect('/')
//     }
//   })

// router.route('/new').get(function (req, res, next) {
//         res.render('snippy', {Snippet: Snippet})
//   })
// // TODO CHECK USER LOGED IN/ AUTHORIZE
//   Snippet.find({}, function (error, data) {
//     if (error) {
//       req.session.flash = {
//         type: 'failure',
//         message: 'Could not retrieve data from the database'
//       }
//       throw new Error('Something went wrong with the database!')
//     }

//     let context = {
//       snippets: data.map(function (snippet) {
//         return {
//           text: snippet.text,
//           createAt: snippet.createdAt,
//           id: snippet._id
//         }
//       })
//     }
//     res.render('snippy', context)
//   })
    // res.send({type: 'GET'})
// })
// router.get('snippy')
// .get(function (req, res) {
//     // authorize(req, res, res.render('snippet/create'));
//     res.render('/snippy')
// })
// .post(function (request, response) {
//     let snippetText = request.body.SnippetText

//     let snippet = new Snippet({
//         text: snippetText
//     })
// })
//   })

module.exports = router

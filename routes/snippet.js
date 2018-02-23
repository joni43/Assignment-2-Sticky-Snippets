const express = require('express')
const router = express.Router()
// use model,snippet.js
const Snippet = require('../models/Snippet')

router.route('/snippy')
.get(function (req, res) {
// TODO CHECK USER LOGED IN/ AUTHORIZE
  Snippet.find({}, function (error, data) {
    if (error) {
      req.session.flash = {
        type: 'failure',
        message: 'Could not retrieve data from the database'
      }
      throw new Error('Something went wrong with the database!')
    }

    let context = {
      snippets: data.map(function (snippet) {
        return {
          text: snippet.text,
          createAt: snippet.createdAt,
          id: snippet._id
        }
      })
    }
    res.render('snippy', context)
  })
    // res.send({type: 'GET'})
})
router.get('snippy/create')
.get(function (req, res) {
    // authorize(req, res, res.render('snippet/create'));
    res.render('/create')
})
.post(function (request, response) {
    let snippetText = request.body.SnippetText

    let snippet = new Snippet({
        text: snippetText
    })
})
module.exports = router

const { Comment, Post } = require('../models')

module.exports = app => {
  app.get('/comments', (req, res) => {
    Comment.find({})
      .populate('post')
      .then(comments => res.json(comments))
      .catch(e => console.log(e))
  })
  app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id, (e, comment) => {
      if (e) throw e
      res.json(comment)
    })
  })
  // honestly not super sure about this one
  app.post('/comments', (req, res) => {
    Comment.create(req.body)
      .then(({ _id }) => {
        Post.findByIdAndUpdate(req.body.post, { $push: { comments: _id } })
          .then(_ => res.sendStatus(200))
          .catch(e => console.log(e))
      })
      .catch(e => console.log(e))
  })
  app.put('/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, e => {
      if (e) throw e
      res.sendStatus(200)
    })
  })
  app.delete('/comments/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id, e => {
      if (e) throw e
      res.sendStatus(200)
    })
  })
}

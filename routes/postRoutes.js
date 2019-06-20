const { Post, Comment } = require('../models')

module.exports = app => {
  app.get('/posts', (req, res) => {
    Post.find({})
      .populate('comments')
      .then(posts => res.json(posts))
      .catch(e => console.log(e))
  })
  app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (e, post) => {
      if (e) throw e
      res.json(post)
    })
  })
  app.post('/posts', (req, res) => {
    Post.create(req.body)
      .then(_ => res.sendStatus(200))
      .catch(e => console.log(e))
  })
  app.put('/posts/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, e => {
      if (e) throw e
      res.sendStatus(200)
    })
  })
  app.delete('/posts/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id, e => {
      if (e) throw e
      res.sendStatus(200)
    })
  })
}

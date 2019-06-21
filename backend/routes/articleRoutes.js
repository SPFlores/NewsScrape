const { Article, Comment } = require('../models')

module.exports = app => {
  app.get('/articles', (req, res) => {
    Article.find({})
      .populate('comments')
      .then(articles => res.json(articles))
      .catch(e => console.log(e))
  })

  app.get('/articles/:id', (req, res) => {
    Article.findById(req.params.id, (e, article) => {
      if (e) throw e
      res.json(article)
    })
  })

  app.post('/articles', (req, res) => {
    Article.create(req.body)
      .then(_ => res.sendStatus(200))
      .catch(e => console.log(e))
  })

  app.put('/articles/:id', (req, res) => {
    Article.findByIdAndUpdate(req.params.id, req.body, e => {
      if (e) throw e
      res.sendStatus(200)
    })
  })

  app.delete('/articles/:id', (req, res) => {
    Article.findByIdAndDelete(req.params.id, e => {
      if (e) throw e
      res.sendStatus(200)
    })
  })
  
}

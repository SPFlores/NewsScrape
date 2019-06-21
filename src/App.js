import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import cheerio from 'cheerio'
import Navbar from './components/Navbar'
import Article from './components/Article'

class App extends Component {
  state = {
    data: null,
    articles: []
  }

  seedArticles() {
    let articleArr = []
    axios.get('https://cors-anywhere.herokuapp.com/https://www.nytimes.com/')
      .then(({ data }) => {
        const $ = cheerio.load(data)
        $('div.css-1ez5fsm.esl82me1').each((i, elem) => {
          let title = $(elem).children('h2').text()
          let description = $(elem).parent().children('ul').children('li').text()
          articleArr.push({
            link: `https://www.nytimes.com/${$(elem).parent().attr('href')}`,
            title: title,
            description: `${!description ? title : description}`
          })
        })
        axios.post('/articles', articleArr)
          .then(_ => {
            this.setState({ article: articleArr })
            console.log('some articles were added')
          })
          .catch(e => console.log(e))
      })
      .catch(e => console.log(e))
  }

  getArticles = () => {
    axios.get('/articles')
      .then(articles =>
        this.setState({ articles: articles.data }))
      .catch(e => console.log(e))
  }

  deleteArticles = e => {
    axios.delete(`/articles/${e.target.id}`)
      .then(_ => this.getArticles())
  }

  componentDidMount() {
    this.fetchArticles()
      .then(res => this.setState({ data: res.express }))
      .catch(e => console.log(e))
  }

  fetchArticles = async () => {
    const response = await fetch('/articles')
    const main = await response.json()
    if (response.status !== 200) {
      throw Error(main.message)
    }
    return main
  }

  render() {
    return (
      <>
        <Navbar seed={this.seedArticles} get={this.getArticles} />
        <Article articles={this.state.articles} delete={this.deleteArticles} />
      </>
    )
  }
}

export default App

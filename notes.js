import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import cheerio from 'cheerio'

class App extends Component {
  state = {
    data: null
  }

  getArticles() {
    axios.get('https://cors-anywhere.herokuapp.com/https://www.nytimes.com/')
      .then(({ data }) => {
        const $ = cheerio.load(data)
        let articleArr = []
        $('div.css-1ez5fsm.esl82me1').each((i, elem) => {
          let title = $(elem).children('h2').text()
          let description = $(elem).parent().children('ul').children('li').text()
          articleArr.push({
            link: `www.nytimes.com/${$(elem).parent().attr('href')}`,
            title: title,
            description: `${!description ? title : description}`
          })
        })
        console.log(articleArr)
        axios.post('/articles', articleArr)
          .then(_ => console.log('OK'))
          .catch(e => console.log(e))
      })
      .catch(e => console.log(e))
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err))
  }

  callBackendAPI = async () => {
    const response = await fetch('/articles')
    const body = await response.json()
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }
  render() {

    return (
      <>
        <h1>hello world news</h1>
      </>
    )
  }
}

export default App
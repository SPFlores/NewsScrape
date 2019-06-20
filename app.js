const axios = require('axios')

const cheerio = require('cheerio')
const db = require('mongojs')('news_db')

axios.get('https://www.nytimes.com/')
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
    // grab all articles in the db
    // db.articles.find()
    // check to see if the article is in the db
    // remove from articleArr if it is
    // insert into db if it isn't
    // return an array of articles
    // db.articles.insert(articleArr, _ => console.log('some articles added!'))
  })
  .catch(e => console.log(e))

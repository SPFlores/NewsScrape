import React, { Component } from 'react'
import Comment from '../Comment'

class Article extends Component {
  // need to make this work for comments
  // state = {
  //   comments: []
  // }

  render () {
    return (
      <>
        {this.props.articles.map(article => (
          <div className='article'>
            <li>Title: {article.title}</li>
            <li>Description: {article.description}</li>
            <li>Link: <a href={article.link}>Click here for article</a></li>
            <button id={article._id} onClick={this.props.delete}>Delete</button>
            {/* <Comment delete={this.props.delete} /> */}
          </div>
        ))}
      </>
    )
  }
}

export default Article

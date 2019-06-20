import React, { Component } from 'react'

class Comment extends Component {
  render() {
    return (
      <>
        {this.props.comments.map(comment => (
          <div className='article'>
            <li>Title: {comment.body}</li>
            <button id={comment._id} onClick={this.props.delete}>Delete</button>
          </div>
        ))}
      </>
    )
  }
}

export default Comment

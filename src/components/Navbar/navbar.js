import React, { Component } from 'react'

class Navbar extends Component {
  render() {
    return (
      <>
        <div id='nav'>
          <div className='navbar-fixed'>
            <nav>
              <div className='nav-wrapper black'>
                <a href='/' className='brand-logo center'>Article Finder</a>
                <div id='nav-mobile' className='left'>
                  <button className='btn blue' onClick={this.props.get}>Show</button>
                </div>
                <div id='nav-mobile' className='right'>
                  <button className='btn blue' onClick={this.props.seed}>Reset</button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </>
    )
  }
}

export default Navbar

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {logOut} from '../actions/authedUser'
class Nav extends Component  {
  handleClick = ()=>{
    const {dispatch} = this.props
    dispatch(logOut())
  }
  render(){
    const {same,avatar,authedUser} = this.props
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to={same?'/':'/dash_board'} exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={same?'/':'/add'} activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to={same?'/':'/leaderboard'} activeClassName='active'>
          Leader Board
          </NavLink>
        </li>
        {authedUser===null?null:
        <Fragment>
        <li>
          <img src = {avatar} alt="" className="avatar"/>
          
        </li>
        <li>Hello,{authedUser}</li>
        <li>
        <NavLink to='/' activeClassName='active' onClick={this.handleClick}>
          Log Out
          </NavLink>
          
        </li>
        </Fragment>}
      </ul>
    </nav>
  )
}
}

function mapStateToProps ({ users,authedUser }) {
  
  
  
  return {
    authedUser:authedUser===null?null:users[authedUser].name,
    avatar:authedUser===null?null:users[authedUser].avatarURL,
    same:authedUser===null
    
  }
}

export default connect(mapStateToProps)(Nav)
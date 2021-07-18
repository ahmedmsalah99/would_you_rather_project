import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'

import LoadingBar from 'react-redux-loading'
import QuestionGeneral from './QuestionGeneral'
import Nav from './Nav'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import SignIn from './SignIn'
import Page404 from './Page404'
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  state = {
    warning:false,
  }
  render() {
    const {loading} = this.props
    console.log(this.props)
    return (
 
      <Router>
        <Fragment>
          <LoadingBar />
          
            
            {
                  loading===true?null:
                  <Fragment>
                  <Nav />
                  <Route path='/' exact component={SignIn} /> 
                  <Route path='/dash_board' exact component={Dashboard} />
                  <Route path='/questions/:qid' component={QuestionGeneral} />
                  <Route path='/add' component={NewQuestion} />
                  <Route path='/leaderboard' component={LeaderBoard} />
                  <Route path='/page404' component={Page404} />
                  </Fragment>}
                
          
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ loading,authedUser }) {
  
  return {
    loading ,
    authedUser
  }
}

export default connect(mapStateToProps)(App)
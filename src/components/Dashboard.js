import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import {  Redirect } from 'react-router-dom'
class Dashboard extends Component {
  state = {
    viewAnswered:false
  }
  viewAnsweredQs = ()=>{
    this.setState(()=>({
      viewAnswered:true
    }
    ))
  }
  viewUnAnsweredQs = ()=>{
    this.setState(()=>({
      viewAnswered:false
    }
    ))
  }
  render() {
    const {authedUser} = this.props
    if(authedUser===null){
      alert('Please SignIn !')
      return <Redirect to="/"/>
    }
    const {answeredQuestionsIds,questionIds} =  this.props
    const { viewAnswered } = this.state
    return (
      <div className='container'>
        <div>
          
        <button className = {!viewAnswered?'btn2':"btn"} onClick={this.viewUnAnsweredQs} >Unanswered Questions</button>
        <button className = {viewAnswered?'btn2':"btn"} onClick={this.viewAnsweredQs} >Answered Questions</button>
        </div>
        <ul className='dashboard-list'>
          {questionIds.filter((id)=>(
            viewAnswered ? answeredQuestionsIds.includes(id) : !answeredQuestionsIds.includes(id)

          )).map((qid) => (
            <li key={qid}>
              <Question qid={qid} viewAnswered={viewAnswered} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions,users,authedUser }) {
  if(authedUser===null){
    return {
      authedUser
    }
  }
  let answeredQuestionsIds = Object.keys(users[authedUser].answers)
  .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  console.log(answeredQuestionsIds)
  return {
    answeredQuestionsIds,
    questionIds: Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    
  }
}

export default connect(mapStateToProps)(Dashboard)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QuestionPage from './QuestionPage'
import AnswerQuestion from './AnswerQuestion'
class QuestionGeneral extends Component {
  render() {
    const {authedUser,isQuestion,isAnswered} = this.props
    if (!isQuestion){

      alert('Please SignIn !')
      return <Redirect to="/Page404"/>
  }
    if(authedUser===null || isAnswered===null){
      alert('Please SignIn !')
      return <Redirect to="/"/>
    }
    
    
    const {qid} = this.props
    return (
        <div>
        {isAnswered?
        <QuestionPage qid={qid}/>
            :<AnswerQuestion qid={qid}/ >
        }
        </div>
     
        
    )
  }
}

function mapStateToProps ({ authedUser,questions}, props) {
    const questionsIds = Object.keys(questions)
 
    const qid = props.match.params.qid
  if(!questionsIds.includes(qid)){
  return{
      isQuestion:false,
      authedUser
  }
  }
  

  const isAnswered = typeof props.location.state === 'undefined'?null:props.location.state.isAnswered
  
  
  return {
    isQuestion:true,
     authedUser,
     qid,
     isAnswered
      
  }
}

export default connect(mapStateToProps)(QuestionGeneral)
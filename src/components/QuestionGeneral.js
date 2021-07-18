import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QuestionPage from './QuestionPage'
import AnswerQuestion from './AnswerQuestion'
class QuestionGeneral extends Component {
  render() {
    const {authedUser,isQuestion,qid} = this.props
    if (!isQuestion){

      alert('Please SignIn !')
      return <Redirect to="/Page404"/>
  }
  const { isAnswered} = this.props
    if(authedUser===null || isAnswered===null){
      alert('Please SignIn !')
      return <Redirect to={{
        pathname:"/",
        state: {goTo:`/questions/${qid}`}
      }}/>
    }
    
    
    
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

function mapStateToProps ({ authedUser,questions,users}, props) {
    const questionsIds = Object.keys(questions)
 
    const qid = props.match.params.qid
  if(!questionsIds.includes(qid)){
  return{
      isQuestion:false,
      authedUser
  }
  }
  

  const isAnswered = typeof users[authedUser] ==="undefined"?null: Object.keys(users[authedUser].answers).includes(qid)
   
  
  
  return {
    isQuestion:true,
     authedUser,
     qid,
     isAnswered
      
  }
}

export default connect(mapStateToProps)(QuestionGeneral)
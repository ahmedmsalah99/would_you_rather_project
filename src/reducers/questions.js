import { RECEIVE_QUESTIONS,ADD_QUESTION , SET_ANSWER } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case SET_ANSWER:
      const {authedUser, qid, answer} = action
      if (authedUser in state[qid][answer].votes){
        return state
      }
      const notAnswer = answer === 'optionOne' ? 'optionTwo':'optionOne'
        return {
          ...state,
          [qid]:{
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          },
          [notAnswer]:{
            ...state[qid][notAnswer],
            votes: state[qid][notAnswer].votes.filter((vote)=>(vote !== authedUser))

          }
  
        }
  
        }

      
     
      
    case ADD_QUESTION :
      const { question } = action


      return {
        ...state,
        [question.id]: action.question,
        
      }
    default :
      return state
  }
}
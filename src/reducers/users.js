import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION , SET_ANSWER } from '../actions/questions'
export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
      case ADD_QUESTION:
        
        return {
          ...state,
          [action.authedUser]:{
            ...state[action.authedUser],
            questions:state[action.authedUser].questions.concat([action.question.id])
          }
        }

      case SET_ANSWER:
       
        return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            answers: {
              ...state[action.authedUser].answers,
              [action.qid]: action.answer
            }
          }
        }

    default :
      return state
  }
}
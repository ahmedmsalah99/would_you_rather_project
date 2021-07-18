import {  saveQuestion,saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SET_ANSWER = 'SET_ANSWER'
function addQuestion ({authedUser,question}) {
  return {
    type: ADD_QUESTION,
    question,
    authedUser,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion ({
      optionOneText,
      optionTwoText,
      author: authedUser,
      
    })
      .then((question) => dispatch(addQuestion({authedUser,question})))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function setQuestionAnswer ({ authedUser, qid, answer }) {
  return {
    type: SET_ANSWER,
    qid,
    authedUser,
    answer
  }
}

export function handleSetAnswer (info) {
  return (dispatch) => {
    dispatch(setQuestionAnswer(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in saving answer: ', e)
        dispatch(setQuestionAnswer(info))
        alert('The was an error saving the answer. Try again.')
      })
  }
}
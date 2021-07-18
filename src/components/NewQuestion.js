import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne:'',
    optionTwo:'',
    toHome:false,
  }
  handleSubmit = (e)=>{
    e.preventDefault()
    const optionOneText = this.state.optionOne
    const optionTwoText = this.state.optionTwo
    this.props.dispatch(handleAddQuestion(optionOneText,optionTwoText)).then(()=>{
    this.setState({
      optionOne:'',
    optionTwo:'',
    })})
this.setState(()=>({
  toHome:true
}))
  }
  updateOptionOne = (e)=>{
      this.setState({
        optionOne:e.target.value
      })
  }
  updateOptionTwo = (e)=>{
    this.setState({
      optionTwo:e.target.value
    })
}
  render() {
    const {authedUser} = this.props
    if(authedUser===null){
      alert('Please SignIn !')
      return <Redirect to="/"/>
    }
    if (this.state.toHome===true){
      return <Redirect to="/dash_board"/>
    }
    return (<div className='container'>
            <h4>Create New Question</h4>
            <p>Complete this question:</p>
            <h3>Would you rather...</h3>
            <div >
            <input type="text" name="optionOne" value={this.state.optionOne} onChange={this.updateOptionOne} placeholder="Enter Question one text here"/><br/>
            <p>OR</p>
            <input type="text" name="optionTwo" value={this.state.optionTwo} onChange={this.updateOptionTwo} placeholder="Enter Question two text here"/>
            </div>
            
            <button className='btn' type="submit" onClick={this.handleSubmit}>Submit</button>
            
            
            </div>)
    
      
    
  }
}
function mapStateToProps ({ authedUser }) {
return {
  authedUser
}

}
export default connect(mapStateToProps)(NewQuestion)
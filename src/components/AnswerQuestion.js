import React, { Component } from 'react'
import { connect } from 'react-redux'
import {handleSetAnswer} from '../actions/questions'

import { Link } from 'react-router-dom'
class AnswerQuestion  extends Component {
    state = {
        optionOne:true
    }
    
    handleSubmit = (e)=>{
        const { authedUser, qid,dispatch } = this.props
        
        dispatch(handleSetAnswer({
            authedUser,
            qid,
            answer: this.state.optionOne? 'optionOne': 'optionTwo' 
        }))
        

    }
    toggle = ()=>{
        this.setState({
            optionOne:!this.state.optionOne
        })
    }
    
    render (){
        

        return (<div className='container'>
            <h3>{this.props.name}asks: </h3>
            <h4>Would you rather ...</h4>
            <div className='container'>
                <img className='avatar' alt="" src={this.props.avatar}/>
                <div>
                    <input type="radio" onChange={this.toggle}  checked={this.state.optionOne}  name="optionOne" value="optionOne"/>{this.props.optionOne}
                    
                    <input type="radio" onChange={this.toggle}  name="optionTwo" checked={!this.state.optionOne} value="optionTwo"/>{this.props.optionTwo}
                    
                </div>
                
                
                <Link to='/dash_board'  onClick={this.handleSubmit}>
                
                <button className='btn'>Submit</button>
                </Link>
                
                
                
                
                

                
                
            </div>
        </div>)
    }
}
function mapStateToProps ({ questions,users,authedUser },{qid}) {
    
    const q = questions[qid]
  
    const author = users[q.author]
    return {
        name:author.name,
        optionOne:q.optionOne.text,
        optionTwo:q.optionTwo.text,
        avatar: author.avatarURL,
        authedUser,
        qid
    }
    

}
export default connect(mapStateToProps)(AnswerQuestion)
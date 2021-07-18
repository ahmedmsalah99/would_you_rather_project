import React, { Component } from 'react'
import { connect } from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import {  Redirect } from 'react-router-dom'
class SignIn extends Component {
  
    state = {
        selected:this.props.usersIds[0],
        toHome:false,

    }
    handleChange = (e)=>{
        this.setState({
            selected:e.target.value
        })
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        const {dispatch} = this.props
        const {selected} = this.state
        
        dispatch(setAuthedUser(selected))
        this.setState({
            toHome:true
        })
        
    }
  render() {
    console.log(this.state)
    if (this.state.toHome===true){
      console.log('yeah')
        return <Redirect to="/dash_board"/>
        }
    const {users,usersIds} = this.props
    return (
      <div className='sign-in-container'>
       <select name="users"  onChange={this.handleChange}>
           {usersIds.map((id)=>(
              
                   
                    <option key={id} value={id}>
                        {users[id].name}
                        </option>
               
            ))}
            
    </select>
        <div>
        <button className='btn' type="submit" onClick={this.handleSubmit}>Sign In</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users,
    usersIds:Object.keys(users)
  }
}

export default connect(mapStateToProps)(SignIn)
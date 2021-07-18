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
    const {goTo} = this.props
    if (this.state.toHome===true){
      
        return <Redirect to={goTo}/>
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

function mapStateToProps ({ users },props) {
  
  const goTo = typeof props.location.state === 'undefined'?"/dash_board":props.location.state.goTo
  console.log(props)
  return {
    users,
    usersIds:Object.keys(users),
    goTo
  }
}

export default connect(mapStateToProps)(SignIn)
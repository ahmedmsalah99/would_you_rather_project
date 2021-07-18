import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component {
  render() {
    const {authedUser} = this.props
    if(authedUser===null){
      alert('Please SignIn !')
      return <Redirect to="/"/>
    }
    const {users,usersIds} = this.props
    
    return (
     <div>
         <ul className="container">
      {usersIds.map(userId =>(
          
          <li className="leader_board_element">
            <div className='element-container'>
            <img src={users[userId].avatarURL} alt="" className='avatar'/>
            </div>
              
              <div className='element-container'>
              <p>{users[userId].name}</p>
              <p>Answered Questions {Object.keys(users[userId].answers).length}</p>
              <p>Created Quetions {users[userId].questions.length} </p>
              </div>
              <div className='element-container'>
                  
             <h3>Score</h3> 
            {users[userId].questions.length+Object.keys(users[userId].answers).length}
              
              </div>
          </li>


      ))}
      </ul>
     </div>
        
    )
  }
}
function get_score(user){
  return user.questions.length+Object.keys(user.answers).length
}
function mapStateToProps ({ users,authedUser}) {
  
  return {
      users,
      usersIds:Object.keys(users).sort((a,b)=>get_score(users[b])-get_score(users[a])),
      authedUser
  }
}

export default connect(mapStateToProps)(LeaderBoard)
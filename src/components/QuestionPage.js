import React, { Component } from 'react'
import { connect } from 'react-redux'


class QuestionPage extends Component {
  render() {
    
    return (
     <div className='container'>
       <h3>Asked by {this.props.name}</h3>
        <div>
          <img alt="" src={this.props.avatar} className='avatar'/>
          <div>
            <h4>Results</h4>
            <div>
            Would you rather {this.props.optionOne} ?
              <p>{this.props.optionOneVotes}  out of {this.props.totalVotes}</p>
              {this.props.yourVote === 'optionOne' && <p>Your Vote</p>}
            </div>
            <div>
            Would you rather {this.props.optionTwo} ?
            <p>{this.props.optionTwoVotes}  out of {this.props.totalVotes}</p>
            {this.props.yourVote === 'optionTwo' && <p>Your Vote</p>}
            </div>

          </div>
        </div>
     </div>
        
    )
  }
}

function mapStateToProps ({ questions, users,authedUser}, {qid}) {
  
  const q = questions[qid]
  let yourVote = null
  if (q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser)){
   yourVote = q.optionOne.votes.includes(authedUser) ? 'optionOne' :'optionTwo'
}
  const author = users[q.author]
  const optionOneVotes = q.optionOne.votes.length
  const optionTwoVotes = q.optionTwo.votes.length
  const totalVotes = optionOneVotes+optionTwoVotes
  return {
      name:author.name,
      optionOne:q.optionOne.text,
      optionTwo:q.optionTwo.text,
      optionOneVotes,
      optionTwoVotes,
      totalVotes,
      yourVote,
      avatar: author.avatarURL,
      
  }
}

export default connect(mapStateToProps)(QuestionPage)
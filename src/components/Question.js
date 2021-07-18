import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

class Question  extends Component {
    
    render (){
        const {avatar,name,text,qid,viewAnswered} = this.props
        return (<div>
            <h3>{name}asks: </h3>
            <h4>Would you rather</h4>
            <div className='container'>
                <img className='avatar' alt="" src={avatar}/>
                <p>{text}</p>
                
                <Link to={{
                    pathname:`/questions/${qid}`,
                    state: { isAnswered: viewAnswered }
                    }}>
                <button className='btn'>View Poll</button>
                </Link>
                
                
                


            </div>
        </div>)
    }
}
function mapStateToProps ({ questions,users },{qid,viewAnswered}) {
    
    const q = questions[qid]
    
    const author = users[q.author]
    return {
        name:author.name,
        text:q.optionOne.text,
        avatar: author.avatarURL,
        qid,
        viewAnswered
    }
    

}
export default connect(mapStateToProps)(Question)
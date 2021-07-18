import React from 'react'
import { Link } from 'react-router-dom'


export default function Page404 () {

return (<div className="container">
    <p>404 Page not found !!</p>
    <Link to='/'>
    <button className="btn" >Go To Sign In Page</button>
    </Link>
</div>)

}

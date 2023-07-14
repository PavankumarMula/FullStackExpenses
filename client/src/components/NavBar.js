import React from 'react'
import '../styles/NavBar.css'
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <>
        <div className='nav-container'>
            <Link to='/login'>Home</Link>
            <Link to='/expenses'>Expenses</Link>
        </div>
    </>
  )
}

export default NavBar
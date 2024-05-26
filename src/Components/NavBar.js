import React from 'react'
import { NavLink } from 'react-router-dom'
import {Nav,Stack} from 'react-bootstrap'

const NavBar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                </li>
            </ul>
            <Nav>
                <Stack direction='horizontal' gap={1}>
                <li className="nav-item">
                    <NavLink className="nav-link text-light" aria-current="page" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-light" aria-current="page" to="/signup">Signup</NavLink>
                </li>
                </Stack>
            </Nav>
            </div>
        </div>
        </nav>
    </div>
  )
}

export default NavBar

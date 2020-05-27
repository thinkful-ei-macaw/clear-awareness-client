import React from 'react'
import './Header.css'
import { Link } from "react-router-dom";

function Header() {
  return (
    <section>
        <h1>Clear Mind</h1>
        <nav>
        <Link to="/login">Login</Link> ||
        <Link to="/register">Register</Link>
        </nav>
    </section>
  )
}

export default Header

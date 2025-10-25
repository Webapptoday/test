
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section>
      <h1 className="display-5">YouMatter: Mental Health Resources & Support</h1>
      <p className="lead">A student-built hub to learn, find help, and build community — inspired by Mental Health America.</p>
      <ul>
        <li><Link to="/learn">Learn about common conditions</Link></li>
        <li><Link to="/resources">Find hotlines and local services</Link></li>
        <li><Link to="/appointments">Book a counseling appointment</Link></li>
        <li><Link to="/community">Join a supportive community</Link></li>
      </ul>
    </section>
  )
}

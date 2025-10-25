import React from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'
import Resources from './pages/Resources.jsx'
import Appointments from './pages/Appointments.jsx'
import Community from './pages/Community.jsx'
import Blog from './pages/Blog.jsx'
import Stories from './pages/Stories.jsx'
import About from './pages/About.jsx'
import Accessibility from './pages/Accessibility.jsx'
import WorksCited from './pages/WorksCited.jsx'
import Contact from './pages/Contact.jsx'
import Search from './pages/Search.jsx'

function SkipLink(){
  const hidden = {position:'absolute', left:'-9999px', width:'1px', height:'1px', overflow:'hidden'}
  const [style,setStyle] = React.useState(hidden)
  return <a href="#main" style={style} onFocus={()=>setStyle({})} onBlur={()=>setStyle(hidden)}>Skip to main content</a>
}

function CrisisBanner(){
  return (
    <div role="region" aria-label="Crisis help" className="alert alert-danger text-center" style={{borderRadius:8, margin:"8px 0"}}>
      <strong>If you are in crisis:</strong> Call or text <strong>988</strong>, dial <strong>911</strong>, or go to the nearest emergency room. This website does not provide medical advice.
    </div>
  )
}

function Layout(){
  return (
    <div>
      <SkipLink/>
      <header role="banner" className="navbar navbar-expand-lg navbar-light bg-light" style={{padding:'0.8rem 1rem'}}>
        <Link to="/" className="navbar-brand"><span className="h4 mb-0">YouMatter</span></Link>
        <nav aria-label="Primary">
          <ul className="navbar-nav" style={{gap:'0.5rem'}}>
            <li className="nav-item"><NavLink to="/learn" className="nav-link">Learn</NavLink></li>
            <li className="nav-item"><NavLink to="/resources" className="nav-link">Resources</NavLink></li>
            <li className="nav-item"><NavLink to="/appointments" className="nav-link">Appointments</NavLink></li>
            <li className="nav-item"><NavLink to="/community" className="nav-link">Community</NavLink></li>
            <li className="nav-item"><NavLink to="/blog" className="nav-link">Blog</NavLink></li>
            <li className="nav-item"><NavLink to="/stories" className="nav-link">Stories</NavLink></li>
            <li className="nav-item"><NavLink to="/about" className="nav-link">About</NavLink></li>
          </ul>
        </nav>
      </header>
      <main id="main" tabIndex="-1" className="container" style={{padding:'1rem 0'}}>
        <CrisisBanner/>
        <Outlet/>
      </main>
      <footer className="bg-dark text-white text-center p-3" role="contentinfo">
        <p className="mb-1">© {new Date().getFullYear()} YouMatter</p>
        <nav aria-label="Footer">
          <a className="text-white mx-2" href="/works-cited">Works Cited</a>
          <a className="text-white mx-2" href="/accessibility">Accessibility</a>
          <a className="text-white mx-2" href="/contact">Contact</a>
          <a className="text-white mx-2" href="/search">Search</a>
        </nav>
      </footer>
    </div>
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/learn" element={<Learn/>}/>
          <Route path="/resources" element={<Resources/>}/>
          <Route path="/appointments" element={<Appointments/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/stories" element={<Stories/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/accessibility" element={<Accessibility/>}/>
          <Route path="/works-cited" element={<WorksCited/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/search" element={<Search/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

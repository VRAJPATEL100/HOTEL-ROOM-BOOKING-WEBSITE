import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import { NavDropdown} from 'react-bootstrap'
import { logout } from '../actions/Useractions'
import { useDispatch, useSelector } from "react-redux";
import $ from 'jquery';
import jquery from 'jquery';
// for changing navbar  color
jquery(window).scroll(function() {
jquery('nav').toggleClass('scrolled', jquery(this).scrollTop()>0);
})

const Navbar = () => {
    const dispatch = useDispatch();
    const userLogin=useSelector((state)=>state.userLogin)
  const{userInfo}=userLogin
//   useEffect(() => {
//     const hasVerticalScrollbar = $(document).height() > $(window).height();

// Set the background color based on the presence of the vertical scrollbar
// $('nav').toggleClass('scrolled', !hasVerticalScrollbar);

// Add an event listener to adjust the background on window resize
// $(window).on('resize', function () {
//   const hasVerticalScrollbar = $(document).height() > $(window).height();
//   $('nav').toggleClass('scrolled', !hasVerticalScrollbar);
// });
    
// }, [])
  function logouthandler(){
    dispatch(logout())
  }
    return (
    <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-transparent py-2 fixed-top dark-background">
            <div className="container-fluid ">
                <Link to="/"><span className="navbar-brand font-weight-bolder text-white">Luxury Inn</span></Link>
                <a href="void(0)" className="navbar-toggler " data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    {/* <span>
                        <FaAlignRight className="navbar-togler-icon" /></span> */}
                        <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </span>
                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white" activeClassName="active_class" exact to="/">Home</Link>
                        </li>
                        <li className="nav-item ">
                        {userInfo?(<>
                 
                 <NavDropdown title={<span style={{userSelect:"none",color:"white"}}>
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   width="20"
                   height="20"
                   fill="currentColor"
                   class="bi bi-person-fill"
                   viewBox="0 2 16 16"
                 >
                   <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                 </svg>{" "}
                   {userInfo.name}</span>} id="username"><NavDropdown.Item style={{ userSelect:"none"}}>
                   <Link style={{textDecoration:"none ",color:"black"}}  to="/profile" className="nav-link" data-toggle="collapse"
           data-target="#navbarNav">Profile</Link></NavDropdown.Item>
                   
                   <NavDropdown.Item onClick={logouthandler} data-toggle="collapse"
           data-target="#navbarNav"><Link to="/" className="nav-link" style={{textDecoration:"none ",color:"black"}}>Logout</Link></NavDropdown.Item>
                 </NavDropdown>
                 </>):(<Link className="nav-link text-white" exact to="/login" data-toggle="collapse"
               data-target="#navbarNav">
               <div
                 style={{
                userSelect:"none"
                 }}
               >
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   width="20"
                   height="20"
                   fill="currentColor"
                   class="bi bi-person-fill"
                   viewBox="0 0 16 16"
                 >
                   <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                 </svg>{" "}
                 Login
               </div>
             </Link>)}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" activeClassName="active_class" exact to="/rooms">Rooms</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" activeClassName="active_class" exact to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" activeClassName="active_class" exact to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
    );
}
export default Navbar;
import React,{useEffect} from 'react'
import Hero from '../components/Hero'
import $ from 'jquery';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import RoomsContainer from '../components/RoomsContainer';
const Rooms = () => {

    useEffect(() => {
    //     const hasVerticalScrollbar = $(document).height() > $(window).height();
    
    // // Set the background color based on the presence of the vertical scrollbar
    // $('nav').toggleClass('scrolled', !hasVerticalScrollbar);
    
    // // Add an event listener to adjust the background on window resize
    // $(window).on('resize', function () {
    //   const hasVerticalScrollbar = $(document).height() > $(window).height();
    //   $('nav').toggleClass('scrolled', !hasVerticalScrollbar);
    // });
        
    }, [])
    return (
    <div>
        <Hero hero="roomsHero">
        </Hero>
        <Banner title="Available Rooms" subtitle="Best in Class Room">
                <Link to="/" className="btn btn-warning">
                      RETURN HOME
                </Link>
        </Banner>
        <RoomsContainer/>
    </div>
    )
}

export default Rooms

import React,{useEffect} from 'react'
import $ from 'jquery';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';

export default function Home() {
    useEffect(() => {
      
            const hasVerticalScrollbar = $(document).height()>$(window).height();

            // Set the background color based on the presence of the vertical scrollbar
            $('nav').toggleClass('scrolled', !hasVerticalScrollbar);
            // Add an event listener to adjust the background on window resize
            $(window).on('resize', function () {
              const hasVerticalScrollbar = $(document).height() > $(window).height();
              $('nav').toggleClass('scrolled', !hasVerticalScrollbar);
            });

        
        
        
    }, [])

    return (
        <>
        <Hero hero="defaultHero">
        </Hero>
        <Banner title="Luxurious Rooms" subtitle="deluxe rooms starting at Rs2000">
                <Link to="/rooms" className="btn btn-primary">
                      Our Rooms
                </Link>
        </Banner>
        <FeaturedRooms/>
        <Services/> 
        </>

    )
}

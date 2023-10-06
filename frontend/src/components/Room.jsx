import React from 'react';
import {Link} from 'react-router-dom';
import defaultImg from '../images/room-1.jpeg';

export default function Room(props) {
   
    return (
        <div className="col-md-4 col-12 mx-auto p-2">
            <div className="card shadow-lg border-0 room">
                <img src={props.image} alt="single room" className="img-fluid"/>
                <div className="price-top">
                    <h6>Rs {props.price}</h6>
                    <p>per night</p>
                </div>
                <Link to={`/room/${props.id}`} className="btn-warning room-link text-center" >Features</Link>
              <p className="room-info"><Link to={`/room/${props.id}`} style={{textDecoration:'none',color:'black'}}>{props.name}</Link></p>
            </div>
        </div>
    )
}
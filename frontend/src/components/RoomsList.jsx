import React,{useEffect} from 'react'
import Room from './Room';
export default function RoomsList(props) {
    
    if(props.rooms.length === 0){
       return (
            <div className="container my-5">
                <div className="card shadow-lg border-0 p-4">
                    <div className="row">
                        <div className="col-md-6 col-12 my-auto">
                            <img src={require('../images/notfound.svg')}  alt="not found" className="img-fluid"/>
                        </div>
                        <div className="col-md-6 col-12 mx-auto">
                            <div className="empty-search">
                                <h3 className="display-4">Unfortunately no rooms matched your search parameters</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       )
    }
    return (
        <section className="container">
            <div className="row my-5">
               {props.rooms.map(i => {
                    return <Room name={i.name} price={i.price} image={i.img} id={i.id} />;
                })
               }
            </div>
        </section>
    );
}

import React, {useEffect } from 'react'
import Loader from './Loader';
import Room from './Room';
import Title from './Title'; 
import { useDispatch, useSelector } from "react-redux";
import { listRooms } from '../actions/Roomactions'
export default function FeaturedRooms() {
    const dispatch = useDispatch();
    const roomList = useSelector((state) => state.roomList);
    const { error, loading, rooms } = roomList;
  useEffect(() => {
    dispatch(listRooms());
}, [dispatch]);
        return (
 
            <section className="featured-rooms container">
                <Title  title="Featured Rooms" />
                <div className="row">
                  {loading ? <Loader/> :<>
                  {
                    rooms.map((i)=>{
                        return(<Room name={i.name} price={i.price} image={i.img} id={i.id}></Room>)
                    })
                  }
                  </>
                  }
                </div>
            </section>
        )
    }

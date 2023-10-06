import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { listRooms } from '../actions/Roomactions'
import RoomsList from './RoomsList';
import Loader from './Loader';

function RoomsContainer(){
    const dispatch = useDispatch();
    const roomList = useSelector((state) => state.roomList);
    const { error, loading, rooms } = roomList;
  useEffect(() => {
    dispatch(listRooms());
}, [dispatch]);
    if(loading)
    {
        return <Loader/>;
    }
    return(
        <>
            {/* <RoomsFilter rooms={rooms}/> */}
            <RoomsList rooms = {rooms}/>
        </>
    );

}
export default RoomsContainer

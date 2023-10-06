import axios from 'axios'
import { ROOM_LIST_REQUEST,
    ROOM_LIST_SUCCESS,
    ROOM_LIST_FAIL,
    ROOM_DETAIL_REQUEST,
    ROOM_DETAIL_SUCCESS,
    ROOM_DETAIL_FAIL,
     } from '../constants/Roomconstants'
     export const listRooms=()=>async(dispatch)=>{
        try{
            dispatch({type:ROOM_LIST_REQUEST})
            const {data}=await axios.get('/hotel/rooms/')
            dispatch({
                type:ROOM_LIST_SUCCESS,
                payload:data
            })
        }catch(error){
            dispatch({
                type:ROOM_LIST_FAIL,
                payload:error.response && error.response.data.detail?error.response.data.detail:error.response
            })
        }
    }

    export const listroomDetail=(id)=>async(dispatch)=>{
        try{
            dispatch({type:ROOM_DETAIL_REQUEST})
            const {data}=await axios.get(`/hotel/room/${id}`)
            dispatch({
                type:ROOM_DETAIL_SUCCESS,
                payload:{id: data.id,
                name: data.name,
                description: data.description,
                price: data.price,
                img: data.img,
                capacity:data.capacity,
                pets:data.pets,
                breakfast:data.breakfast,
                size:data.size,
                img1:data.img1,
                img2:data.img2,
                img3:data.img3,
                extras:data.extras}
            })
        }catch(error){
            dispatch({
                type:ROOM_DETAIL_FAIL,
                payload:error.response && error.response.data.detail?error.response.data.detail:error.response
            })
        }
    }
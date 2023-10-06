import { ROOM_LIST_REQUEST,
    ROOM_LIST_SUCCESS,
    ROOM_LIST_FAIL,
    ROOM_DETAIL_REQUEST,
    ROOM_DETAIL_SUCCESS,
    ROOM_DETAIL_FAIL, } from '../constants/Roomconstants'
    export const roomListReducer=(state={rooms:[]},action)=>{
        switch(action.type){
            case ROOM_LIST_REQUEST:
                return{loading:true,rooms:[]}
            case ROOM_LIST_SUCCESS:
                return{loading:false,rooms:action.payload}
            case ROOM_LIST_FAIL:
                return{loading:false,error:action.payload}
            default:
                return state
        }
    }

    export const roomDetailReducer=(state={room:[]},action)=>{
        switch(action.type){
            case ROOM_DETAIL_REQUEST:
                return{loading:true,...state}
            case ROOM_DETAIL_SUCCESS:
                return{loading:false,room:action.payload}
            case ROOM_DETAIL_FAIL:
                return{loading:false,error:action.payload}
            default:
                return state
        }
    }
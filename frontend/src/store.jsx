import {legacy_createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { roomListReducer,roomDetailReducer } from './reducers/Roomreducer'
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer} from'./reducers/Userreducer'
import { bookingCreateReducer,bookingDetailsReducer,bookingListMyReducer,bookingPayReducer } from './reducers/Bookingreducer'
const reducer=combineReducers({
    roomList:roomListReducer,
    roomDetail:roomDetailReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    bookingCreate:bookingCreateReducer,
    bookingDetails:bookingDetailsReducer,
    bookingPay:bookingPayReducer,
    bookingListMy:bookingListMyReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
})


const userInfoFromStorage=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null
const initialState={userLogin:{userInfo:userInfoFromStorage}}








const middleware=[thunk]


const store=legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
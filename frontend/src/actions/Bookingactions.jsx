import axios from 'axios'
import {
    BOOKING_CREATE_REQUEST,
    BOOKING_CREATE_SUCCESS,
    BOOKING_CREATE_FAIL,
    
    BOOKING_DETAILS_REQUEST,
    BOOKING_DETAILS_SUCCESS,
    BOOKING_DETAILS_FAIL,
    
    BOOKING_PAY_REQUEST,
    BOOKING_PAY_SUCCESS,
    BOOKING_PAY_FAIL,
    BOOKING_PAY_RESET,

    BOOKING_LIST_MY_REQUEST,
    BOOKING_LIST_MY_SUCCESS,
    BOOKING_LIST_MY_FAIL,
    BOOKING_LIST_MY_RESET,
    
  } from "../constants/Bookingconstants";
  export const createBooking = (booking) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BOOKING_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/hotel/booking/add/`,
            booking,
            config
        )

        dispatch({
            type: BOOKING_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: BOOKING_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getBookingDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BOOKING_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/hotel/booking/${id}/`,
            config
        )

        dispatch({
            type: BOOKING_DETAILS_SUCCESS,
            payload: data
        })
        

    } catch (error) {
        dispatch({
            type: BOOKING_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const payBooking = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BOOKING_PAY_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/hotel/booking/${id}/pay/`,
            paymentResult,
            config
        )

        dispatch({
            type: BOOKING_PAY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: BOOKING_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listMyBookings = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: BOOKING_LIST_MY_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/hotel/mybookings/`,
            config
        )

        dispatch({
            type: BOOKING_LIST_MY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: BOOKING_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
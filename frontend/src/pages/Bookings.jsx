//sb-5mjyk27287097@personal.example.com
//foodorder
import React, { useState, useEffect } from 'react'
import { jsPDF } from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import {  useParams,useNavigate } from 'react-router-dom';
import { getBookingDetails,payBooking } from '../actions/Bookingactions';
import { PayPalButton } from 'react-paypal-button-v2'
import { BOOKING_PAY_RESET } from '../constants/Bookingconstants';
import $ from 'jquery'
import Loader from '../components/Loader'
import Messageorderscreen from '../components/Messageorderscreen'
function Bookings() {

    const {id} = useParams()
    const dispatch = useDispatch()

    const navigate=useNavigate()
    const [sdkReady, setSdkReady] = useState(false)

    const bookingDetails = useSelector((state) => state.bookingDetails)
    const { booking,error, loading } = bookingDetails
    const bookingPay = useSelector((state) => state.bookingPay)
    const { loading: loadingPay, success: successPay } = bookingPay

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    // if (!loading && !error) {
    //     order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
    // }
    

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AfRHaP6G8Cf10KYGTuCopdPbCg1F8aiBAS040dgvTDzAaBPyART33IsvUT95ABM0Jev9fb80n8tRWnO_'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    useEffect(() => {

        const hasVerticalScrollbar = $(document).height() > $(window).height();

    // Set the background color based on the presence of the vertical scrollbar
    $('nav').toggleClass('scrolled', !hasVerticalScrollbar);

    // Add an event listener to adjust the background on window resize
    $(window).on('resize', function () {
      const hasVerticalScrollbar = $(document).height() > $(window).height();
      $('nav').toggleClass('scrolled', !hasVerticalScrollbar);
    });

        if (!userInfo) {
            navigate('/login')
        }

        if (!booking  ||successPay|| booking.id !== parseInt(id) ) 
        {
            dispatch({ type: BOOKING_PAY_RESET })
            dispatch(getBookingDetails(id))

        }
         else if (!booking.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch,booking,id,successPay,navigate,userInfo])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payBooking(id, paymentResult))
    }

    const createPDF = async () => {
        const pdf = new jsPDF("portrait", "pt", "a4");
        const data = await document.querySelector("#pdf");
        pdf.html(data).then(() => {
          pdf.save("Booking_Details.pdf");
        });
      };
    return loading ? (
        <Loader />
    ) : error ? (
        <Messageorderscreen var='danger' message={error}></Messageorderscreen>
    ) :(
        <div className="container" style={{paddingTop:"5%",userSelect:'none'}}>
            <div className="row">
                <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
                    <div>
                        <h1 className="display-4 text-info">CONFIRM BOOKING </h1>
                    </div>
                    <div className="row my-3">
                        <div className="col-md-6 col-12">
                            <div id="pdf">
                            <h2 className="font-weight-bolder text-success pb-2 "><span className='text-dark'>BOOKING     DETAILS</span></h2>
                                <h5 className="font-weight-bolder text-success pb-2 ">Room  :  <span className='text-dark'>{booking && booking.room}</span></h5>
                                <h5 className="font-weight-bolder text-success pb-2">Check In Date  :   <span className='text-dark'>{booking && booking.checking_date.toString().slice(0,10).split("-").reverse().join("-")}</span> </h5>
                                <h5 className="font-weight-bolder text-success pb-2">Check Out Date  :   <span className='text-dark'>{booking && booking.checkout_date.toString().slice(0,10).split("-").reverse().join("-")}</span></h5> 
                                <h5 className="font-weight-bolder text-success pb-2">Total Payment  : <span className='text-dark'>{booking && "Rs" +booking.totalPrice}</span></h5> 
                                <h5 className="font-weight-bolder text-success pb-2">Phone Number  :  <span className='text-dark'>{booking && booking.phone_number}</span> </h5>
                                <h5 className="font-weight-bolder text-success pb-2">Email  :  <span className='text-dark'>{booking && booking.email}</span></h5>
                                <h6 className="font-weight-bolder text-success pb-2"><mark>Please make sure Checkin time is from 9 am to 12 pm</mark></h6>
                                { booking && booking.isPaid ? (
                                        <Messageorderscreen var='success' message={"Paid on "} paid={booking.paidAt.toString().slice(0,10).split("-").reverse().join("-")}></Messageorderscreen>
                                    ) : (
                                            <Messageorderscreen var='danger' message={"Not Paid"}></Messageorderscreen>
                                        )}
                        </div>
                        </div>
                    </div>
                  
                    <div className="row float-right" >
                        
                        <div className="col-md-6 col-12 pt-2" >
                        
                            {!booking.isPaid && (
                                                <>
                                            {loadingPay && <Loader />}

                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                <PayPalButton
                                                amount={booking && booking.totalPrice}
                                                onSuccess={successPaymentHandler}/>
                                                )}
                                                </>
                                    )}
                                    {booking && booking.isPaid?<button onClick={createPDF} type="button" className='btn btn-outline-dark'>Get Booking Details</button>:<></>}
                
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Bookings
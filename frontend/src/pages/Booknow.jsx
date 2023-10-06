import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams,useNavigate } from 'react-router-dom';
import $ from 'jquery';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listroomDetail } from '../actions/Roomactions';
import { BOOKING_CREATE_RESET } from '../constants/Bookingconstants'
import { createBooking } from '../actions/Bookingactions';
import MessageBookingscreen from '../components/MessageBookingscreen';
export default function Booknow() {
    const {id}=useParams();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const roomDetail = useSelector((state) => state.roomDetail);
    const bookingCreate=useSelector((state)=>state.bookingCreate)
    const { booking, error, success } = bookingCreate
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {

    //     const hasVerticalScrollbar = $(document).height() > $(window).height();

    // // Set the background color based on the presence of the vertical scrollbar
    // $('nav').toggleClass('scrolled', !hasVerticalScrollbar);

    // // Add an event listener to adjust the background on window resize
    // $(window).on('resize', function () {
    //   const hasVerticalScrollbar = $(document).height() > $(window).height();
    //   $('nav').toggleClass('scrolled', hasVerticalScrollbar);
    // });
        dispatch(listroomDetail(id));
        if (success) {
            navigate(`/bookings/${booking.id}`)
            dispatch({ type: BOOKING_CREATE_RESET })
        }
    }, [dispatch,success,id,navigate]);
    const[startDate,setstartDate]=useState(new Date())
    const[endDate,setendDate]=useState('')
    const[daysLeft,setdaysLeft]=useState()
    const[personname,setpersonname]=useState()
    const[phonenum,setphonenum]=useState()
    const[emailaddress,setemailaddress]=useState(userInfo.email)
    const[paymentoptions,setpaymentoption]=useState()
    const[message,setmessage]=useState()
    
    function handleChangeStart(date) {
        setstartDate(date)
    }
    function handleChangeEnd(date) {
        setendDate(date)
    }
    function calculateDaysLeft() 
    {
        let date1=new Date(startDate)
        let date2=new Date(endDate)
        let Difference_in_time = date2.getTime() - date1.getTime();
        let Difference_in_days= Difference_in_time / (1000 * 3600 * 24);
        setdaysLeft(Math.ceil(Difference_in_days))
    }
    
    if(!roomDetail){
        return (<div className="container roomerror">
            <div className="row my-5">
                <div className="col-md-6 col-12 mx-auto">
                    <div className="card shadow-lg border-0 p-4 error">
                        <h1 className="text-center display-4">SORRY</h1>
                        <h3>No such room could be found...</h3>
                        <Link to="/rooms" className="btn btn-warning mt-4 ">Back to Rooms</Link>
                    </div>
                </div>
            </div>
        </div>);
        }
        const {name,capacity,size,price,img,pets,breakfast} = roomDetail.room;
        const mainImg = img;
        const checkindate=startDate;
    const checkoutdate=endDate;
    const phonenumber=phonenum;
    const email=emailaddress;

    const totalprice=Number(daysLeft*price).toFixed(2)
    const bookhotel = (e) => {  
        e.preventDefault()
        if(phonenum.toString().length<10 ||phonenum.toString().length>10)
        {
            setmessage("Phone Number Must Be Of 10 Digits.")
        }
        
        else if(endDate.length===0)
        {
            setmessage("Please Provide Checkout Date.")
        }
        else{
        dispatch(createBooking({
            bookingname:personname,
            room:roomDetail.room,
            checking_date:checkindate,
            checkout_date:checkoutdate,
            phone_number:phonenumber,
            email:email,
            totalprice:totalprice,
        }))
    }
        
    }
        return (
        <div className="container my-5 pt-5">
            <div className="row">
                <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
                    <div>
                        <h1 className="display-4">Booking</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12 my-auto">
                            <img src={mainImg} className="img-fluid" alt="selected room" style={{paddingTop:"9%"}} />
                        </div>
                        <div className="col-md-6 col-12 my-auto">
                            <h1>Rooms Details</h1>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Room Type</th>
                                        <td>{name}</td>
                                    </tr>
                                    <tr>
                                        <th>Capacity</th>
                                        <td>{capacity}</td>
                                    </tr>
                                    <tr>
                                        <th>Size</th>
                                        <td>{size} sqft.</td>
                                    </tr>
                                    <tr>
                                        <th>Breakfast</th>
                                        <td>{breakfast === true ? `Included`: `Not Included`}</td>
                                    </tr>
                                    <tr>
                                        <th>Pets</th>
                                        <td>{pets ===true ? `Allowed` : `Not Allowed`}</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div style={{paddingTop:"2%"}}>
                    {message?<MessageBookingscreen mes={message}></MessageBookingscreen>:<></>}
                  <p style={{display:"inline-block"}}><label for="checkindate" className="font-weight-bolder mr-3">Checkin Date </label>
                                <DatePicker id="checkindate" selected={startDate} onChange={handleChangeStart} minDate={new Date()} dateFormat={"dd-MM-yyyy"} className="form-control" required /></p>

                                <p style={{position:'relative',display:"inline-block",paddingLeft:"16%"}}><label for="checkoutdate" className="font-weight-bolder mr-3" >Checkout Date </label>
                                <DatePicker id="checkoutdate" selected={endDate} onChange={handleChangeEnd} onCalendarClose={calculateDaysLeft} minDate={startDate} dateFormat={"dd-MM-yyyy"} className="form-control" required /></p>

                  </div>
                 
                  <form onSubmit={bookhotel}>
                  <div style={{paddingTop:"2%"}}>
                  <p style={{display:"inline-block",paddingLeft:"5.2%"}}><label className="font-weight-bolder mr-3" for='name' >Name:</label><input id="name" type="text" placeholder="ENTER YOUR FULL NAME" value={personname} onChange={(e)=>{setpersonname(e.target.value)}} style={{width:"230px",display:"inline-block"}} className="form-control" required/></p>
                  <p style={{position:'relative',display:"inline-block",paddingLeft:"13%"}}><label for="phonenumber" className="font-weight-bolder mr-3" >Phone Number: </label>
                  <input type="number"  id="phonenumber" style={{display:"inline-block",width:"210px"}} placeholder='Enter Your PhoneNumber' required onChange={(e)=>{setphonenum(e.target.value)}} className="form-control" value={phonenum}/></p>
                  </div>

                  <div style={{paddingTop:"2%"}}>
                  <p style={{display:"inline-block",paddingLeft:"5.2%"}}><label className="font-weight-bolder mr-3" for='email' >Email:</label><input  type="email" id="email" style={{width:"230px",display:"inline-block"}} required placeholder='Enter Your Email'  onChange={(e)=>{setemailaddress(e.target.value)}} className="form-control" value={emailaddress} /></p>
                  <p style={{display:"inline-block",paddingLeft:"11%"}}><label for="payment" className="font-weight-bolder mr-3">Payment Options :</label>
                                <select className="form-control" id="payment" style={{display:"inline-block",width:"210px"}} value={paymentoptions} onChange={(e)=>{setpaymentoption(e.target.value)}} required>
                                    <option disabled selected>Select payment option</option>
                                    <option value="Credit">Credit Card</option>
                                    <option value="Debit">Debit Card</option>
                                    <option value="checkin">Pay during Checkin</option>
                                </select></p>
                  </div>

                  <div style={{paddingTop:"1%"}}>
                  <p style={{paddingLeft:"5.2%"}}><h6 className="font-weight-bolder">Number of days : {daysLeft?daysLeft:0}</h6></p>
                
                  <p style={{paddingLeft:"5.2%"}}><h6 className="font-weight-bold">Price per day : <span className="badge badge-info">Rs {price}</span></h6></p>
                  <p style={{paddingLeft:"5.2%"}}><h6 className="font-weight-bold">Total Price to be paid : <span className="text-primary">Rs {daysLeft*price?daysLeft*price:0}</span></h6></p>
                  <p style={{paddingLeft:"5.2%",width:"50%"}}><button className="btn btn-block btn-outline-primary" type="submit" style={{width:"40%"}}>Confirm Booking</button></p>
                  </div>

                  </form>
                </div>
            </div>
            
        </div>
        )
    }
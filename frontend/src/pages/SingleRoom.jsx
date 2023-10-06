import React, {useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Banner from '../components/Banner';
import { Link, useParams,useNavigate } from 'react-router-dom';
import StyledHero from '../components/StyledHero';
import { listroomDetail } from '../actions/Roomactions';

export default function SingleRoom() {
    const {id}=useParams()
    const navigate=useNavigate()
    const userLogin=useSelector((state)=>state.userLogin)
  const{userInfo}=userLogin
    // constructor (props){
    //     super(props);
    //     this.state = {
    //         slug: this.props.match.params.slug,
    //         defaultBcg
    //     };
    // }
    // static contextType = RoomContext;
    // render() {
    //     const { getRoom } = this.context;
    //     const room = getRoom(this.state.slug);
    const dispatch = useDispatch();
    const roomDetail = useSelector((state) => state.roomDetail);
    const { error, loading, room } = roomDetail;
  useEffect(() => {
    dispatch(listroomDetail(id));
}, [dispatch]);

        if(!room){
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
        const {name,description,capacity,size,price,img,pets,breakfast,img1,img2,img3,extras} = room;
        const mainImg = img;
        const images=[img1,img2,img3]
        function booknowhandler(){
            if(userInfo)
            {
                navigate(`/booknow/${id}`)
            }
            else
            {
                navigate('/login')
            }
        }
        return (
            <>
            <StyledHero img={mainImg}>
           
            <Banner title={`${name}`}>
                    <Link to="/rooms" className="btn btn-primary">Back To Rooms</Link>
            </Banner>
            </StyledHero>
            <section className="single-room container">
               <div className="row">
                    {images && images.map((item,index) => {
                        return (
                        <div className="col-md-4 col-12 mx-auto" key={index}>
                            <div className="card border-0 shadow-lg">
                               <img key={index} src={item} alt={name} className="img-fluid" />
                            </div>
                        </div>)
                    })}
               </div>
               <div className="single-room-info">
                   <article className="desc">
                      <h3>Details</h3>
                      <p>{description}</p>
                   </article>
                   <article className="info">
                      <h3>Info</h3>
                      <h6>price : Rs{price}</h6>
                      <h6>size  : {size} SQFT</h6>
                      <h6>
                          max capacity : {" "}
                              {capacity > 1 ? `${capacity} people`: `${capacity} person`}
                      </h6>
                       <h6>{pets? 'pets allowed': 'no pets allowed'}</h6> 
                       <h6>{breakfast? "free breakfast included":"no free breakfast included"}</h6> 
                   </article>
               </div>
            </section>
            <section className="room-extras">
                <h3>Extras</h3>
                <ul className="extras">
                    {extras && extras.map((item,index) => {
                          return <li key={index}>{item.facilities}</li>
                    })}
                </ul>
                <div className="p-4 clearfix">
                    <div className="row">
                       <div className="col-md-3 col-12 ml-auto">
                          {userInfo?<button onClick={booknowhandler} className="btn btn-outline-primary btn-block btn-lg float-right ">Book Now</button>:<Link to={'/login'} className="btn btn-outline-primary btn-block btn-lg float-right">Book Now</Link>}
                       </div>
                    </div>
                </div>
            </section>
            </>
        )
    }

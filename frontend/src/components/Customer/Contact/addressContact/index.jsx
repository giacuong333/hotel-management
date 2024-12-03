import React from 'react';
import contact_address_img from './images/contact_address_img.png';
import contact_address_img2 from './images/contact_address_img2.png';

const AddressContact = () => {
    return (
        <div>
            <div className="container">
               <div className='' style={{ display: 'flex',fontFamily: 'Nanum Myeongjo',fontSize:"1.5rem",lineHeight: '3rem' }}>
               <div className="col-lg-6" style={{ animation: "upDown 2s infinite"}} >
                    <img src={contact_address_img} alt="" style={{}} />
                </div>
                <div className='col-lg-6 ' style={{ position:"relative",marginLeft:"-3rem",marginTop:"7rem"}}>
                <div className="row text-center   " style={{ background: `url(${contact_address_img2})`,position:"relative",height:"40rem",backgroundRepeat:"no-repeat" }}>
                    <div className="col-lg-6 text-center " style={{marginTop:"10rem"}}>
                        <h2 className="text-uppercase">ADDRESS</h2>
                        <p>Nordstrom NYC Flagship
                        222 West 56th Street, New York, NY 10019</p>
                        <p>Phone: +123 456 7890</p>
                        
                    </div>
                    <div className="col-lg-6 text-center " style={{marginTop:"10rem"}}>
                        <h2 className="text-uppercase">Opening Hours</h2>
                        <p>Mon - Fri: 11am - 8pm</p>
                        <p>Sat - Sun: 11am - 6pm</p>
                    </div>
                </div>
                </div>
               </div>
            </div>
        </div>
    );
};

export default AddressContact;

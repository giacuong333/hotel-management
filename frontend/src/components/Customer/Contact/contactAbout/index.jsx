import React from 'react';


const ContactAbout = () => {
    return (
        <div className='container '>
            <section className='text-center pt-5 p-lg-5 container'>
                <p className='text-uppercase ' 
                style={{fontSize:"1.5rem",color:"#E8BF96",fontFamily:"'Nanum Myeongjo', Sans-serif" ,letterSpacing:"0.438rem",lineHeight:"2.25rem"}}  >
                    Get In Touch</p>
                <p className='text-uppercase ' style={{fontSize: "2.75rem",fontFamily:"Nanum Myeongjo" }}>Quality Services &amp; Activities Near you</p>
                <div className='p-lg-5'>
                    <p className='' style={{letterSpacing: ".1rem", lineHeight: "2rem"}}>
                        Our Comfort Is Our Priority" expresses a commitment, to providing the highest level of comfort
                        and satisfaction for our customers. Whether you're staying with us, using our services, or
                        purchasing our products, we prioritize your needs and ensure a relaxing and enjoyable
                        experience.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ContactAbout;

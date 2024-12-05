import React,{useState} from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { CiLinkedin } from 'react-icons/ci';
import { FaInstagram } from 'react-icons/fa';
import { isEmpty, isEmail, isPhoneNumber } from '~/utils/formValidation';
import map from './images/map.png';
const FeedBackContact = () => {
    const [inputValue, setInputValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const isInputValid = !isEmpty(inputValue);
        const isEmailValid = isEmail(emailValue);
        const isPhoneValid = isPhoneNumber(phoneValue);

        setIsValid(isInputValid);
        setEmailValid(isEmailValid);
        setPhoneValid(isPhoneValid);

        if (isInputValid && isEmailValid && isPhoneValid) {
            // Handle form submission
            console.log('Form submitted:', { inputValue, emailValue, phoneValue });
        }
    };
    return (
        <div>
            <div className="container pt-lg-5 pb-lg-5 ">
                <div>
                    <div class="row" style={{ fontFamily: 'Nanum Myeongjo', lineHeight: '3rem' }}>
                        <div class="col-sm-6">
                            <div className="">
                                <p className="pb-3" style={{ fontSize: '3.5rem' }}>
                                    We’re Hear For You
                                </p>
                                <p
                                    className="pb-3"
                                    style={{
                                        fontSize: '1rem',
                                        letterSpacing: '.1rem',
                                        lineHeight: '2rem',
                                        width: '100%',
                                    }}
                                >
                                    We understand that your needs are important, and we are here to assist you every
                                    step of the way. Our dedicated team is committed to providing top-notch support and
                                    addressing any questions or concerns you may have.
                                </p>
                                <div className="row">
                                    <div className="col-2 text-center">
                                        <FaFacebook
                                            size={40}
                                            className="p-2 animation-effect cursor-pointer contact-medias-hover"
                                        />
                                    </div>
                                    <div className="col-2 text-center">
                                        <FaXTwitter
                                            size={40}
                                            className="p-2 animation-effect cursor-pointer contact-medias-hover"
                                        />
                                    </div>
                                    <div className="col-2 text-center">
                                        <CiLinkedin
                                            size={40}
                                            className="p-2 animation-effect cursor-pointer contact-medias-hover"
                                        />
                                    </div>
                                    <div className="col-2 text-center">
                                        <FaInstagram
                                            size={40}
                                            className="p-2 animation-effect cursor-pointer contact-medias-hover"
                                        />
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                            <div class="mb-3 mt-3">
                                    <label for="uname" class="form-label">
                                        NAME
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="uname"
                                        placeholder="Your Name"
                                        name="uname"
                                        required
                                        style={{ borderRadius: '0' }}
                                    />
                                    <div class="valid-feedback">Valid.</div>
                                    <div class="invalid-feedback">Please fill out this field.</div>
                                </div>
                                <div class="mb-3 mt-3">
                                    <label for="uname" class="form-label">
                                        EMAIL
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="uname"
                                        placeholder="Your Email"
                                        name="uname"
                                        required
                                        style={{ borderRadius: '0' }}
                                    />
                                    <div class="valid-feedback">Valid.</div>
                                    <div class="invalid-feedback">Please fill out this field.</div>
                                </div>
                                <div class="mb-3 mt-3">
                                    <label for="Your Message" class="form-label">
                                        YOUR MESSAGE
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="Your Message"
                                        placeholder="Your Message"
                                        name="Your Message"
                                        required
                                        style={{ borderRadius: '0' }}
                                    />
                                    <div class="valid-feedback">Valid.</div>
                                    <div class="invalid-feedback">Please fill out this field.</div>
                                </div>
                                <button
                                    type="submit"
                                    class="btn btn-primary"
                                    length="200"
                                    className='submit-button'
                                    style={{ background: '#E8BF96', border: '1px solid #E8BF96', borderRadius: '0',color:"black" }}
                                >
                                    Send FeebBack
                                </button>
                            </form>
                        </div>
                        <div class="col-sm-6">
                            <img src={map} alt="" className='w-full h-full'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedBackContact;

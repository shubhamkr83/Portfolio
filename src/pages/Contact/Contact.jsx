import React, { useState, useEffect } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SendIcon from '@material-ui/icons/Send';
import "./contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState('');

    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease-in-sine',
        });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, just show success message
        // In production, integrate with email service like EmailJS or backend API
        setFormStatus('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => {
            setFormStatus('');
        }, 5000);
    };

    return (
        <>
            <section className="contact_section" id="contact">
                <div className="contact_container">
                    <h2 data-aos='zoom-in' className="contact_title">Get In Touch</h2>
                    <p data-aos='fade-up' className="contact_subtitle">
                        Have a project in mind or want to collaborate? Feel free to reach out!
                    </p>

                    <div className="contact_content">
                        {/* Contact Information Cards */}
                        <div className="contact_info_wrapper" data-aos='fade-right'>
                            <div className="info_card">
                                <div className="info_icon">
                                    <EmailIcon />
                                </div>
                                <div className="info_details">
                                    <h3>Email</h3>
                                    <p>shubham.krsaw836@gmail.com</p>
                                </div>
                            </div>

                            <div className="info_card">
                                <div className="info_icon">
                                    <PhoneIcon />
                                </div>
                                <div className="info_details">
                                    <h3>Phone</h3>
                                    <p>+91 6204843730</p>
                                </div>
                            </div>

                            <div className="info_card">
                                <div className="info_icon">
                                    <LocationOnIcon />
                                </div>
                                <div className="info_details">
                                    <h3>Location</h3>
                                    <p>India</p>
                                </div>
                            </div>

                            {/* Social Media Section */}
                            <div className="social_section">
                                <h3>Connect With Me</h3>
                                <div className="social_icons">
                                    <a href="https://twitter.com/KrShubhamDev" target="_blank" rel="noreferrer" className="social_link">
                                        <TwitterIcon />
                                    </a>
                                    <a href="https://www.instagram.com/shubhamkrdev/" target="_blank" rel="noreferrer" className="social_link">
                                        <InstagramIcon />
                                    </a>
                                    <a href="https://www.linkedin.com/in/shubham-kumar836" target="_blank" rel="noreferrer" className="social_link">
                                        <LinkedInIcon />
                                    </a>
                                    <a href="https://github.com/shubhamkr83" target="_blank" rel="noreferrer" className="social_link">
                                        <GitHubIcon />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact_form_wrapper" data-aos='fade-left'>
                            <form className="contact_form" onSubmit={handleSubmit}>
                                <div className="form_group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="form_input"
                                    />
                                </div>

                                <div className="form_group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="form_input"
                                    />
                                </div>

                                <div className="form_group">
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="form_input"
                                    />
                                </div>

                                <div className="form_group">
                                    <textarea
                                        name="message"
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="form_textarea"
                                        rows="6"
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit_button">
                                    <span>Send Message</span>
                                    <SendIcon />
                                </button>

                                {formStatus && (
                                    <div className="form_status">
                                        {formStatus}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default Contact;
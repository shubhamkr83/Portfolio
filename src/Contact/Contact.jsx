import React from 'react';
import { useEffect } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import "./contact.css";

const Contact = () => {

    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease-in-sine',
        });
    }, []);

    return (
        <>
            <section className="contact_section" id="contact">
                <h2>Contact Me</h2>
                <div className="center_contact">
                    <div className="contact_info" data-aos='fade-up'>
                        <div className="contact_item">
                            <h3><span className="span">Email:-</span> shubham.krsaw836@gmail.com</h3>
                        </div>
                        <div className="contact_item">
                            <h3><span className="span">Phone:-</span> 6204843730</h3>
                        </div>
                        <div className="social_icons">
                            <a href="https://twitter.com/KrShubhamDev" target="_blank" rel="noreferrer"><TwitterIcon /></a>
                            <a href="https://www.instagram.com/shubhamkrdev/" target="_blank" rel="noreferrer"><InstagramIcon /></a>
                            <a href="https://www.linkedin.com/in/shubham-kumar836" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
                            <a href="https://github.com/shubhamkr83" target="_blank" rel="noreferrer"><GitHubIcon /></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};


export default Contact;
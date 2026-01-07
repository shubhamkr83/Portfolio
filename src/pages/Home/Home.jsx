import React, { useEffect } from 'react';
import web1 from '../../assets/images/img32.png';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import GetAppIcon from '@material-ui/icons/GetApp';
import EmailIcon from '@material-ui/icons/Email';
import Aos from 'aos';
import "aos/dist/aos.css";
import "./home.css";

const Home = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease-in-out',
        });
    }, []);

    const handleDownloadCV = () => {
        // Add your CV download link here
        window.open('/path-to-your-cv.pdf', '_blank');
    };

    const handleContactClick = () => {
        window.location.href = '#contact';
    };

    return (
        <>
            <section className="home_section" id="home">
                <div className="home_container">
                    <div className="center_home">
                        {/* Left Content Section */}
                        <div data-aos='fade-right' className="left_sec">
                            <div className="greeting">
                                <span className="wave">👋</span>
                                <p>Hello, I'm</p>
                            </div>
                            
                            <h1 className="name">
                                <span className="first_name">Shubham</span>
                                <span className="last_name">Kumar</span>
                            </h1>
                            
                            <div className="role_container">
                                <h2 className="role">QA Automation Engineer</h2>
                                <div className="role_underline"></div>
                            </div>

                            <p className="tagline">
                                Building robust automation frameworks and ensuring quality across Web, Android, and API platforms. 
                                Passionate about delivering zero-bug releases through smart test architecture.
                            </p>

                            {/* CTA Buttons */}
                            <div className="cta_buttons">
                                <button className="btn_primary" onClick={handleContactClick}>
                                    <EmailIcon />
                                    <span>Get In Touch</span>
                                </button>
                                <button className="btn_secondary" onClick={handleDownloadCV}>
                                    <GetAppIcon />
                                    <span>Download CV</span>
                                </button>
                            </div>

                            {/* Social Links */}
                            <div className="social_links">
                                <p className="social_label">Connect with me</p>
                                <div className="icons">
                                    <a href="https://twitter.com/KrShubhamDev" target="_blank" rel="noreferrer" className="social_icon">
                                        <TwitterIcon />
                                    </a>
                                    <a href="https://www.instagram.com/shubhamkrdev/" target="_blank" rel="noreferrer" className="social_icon">
                                        <InstagramIcon />
                                    </a>
                                    <a href="https://www.linkedin.com/in/shubham-kumar836" target="_blank" rel="noreferrer" className="social_icon">
                                        <LinkedInIcon />
                                    </a>
                                    <a href="https://github.com/shubhamkr83" target="_blank" rel="noreferrer" className="social_icon">
                                        <GitHubIcon />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Image Section */}
                        <div data-aos='fade-left' className="right_sec">
                            <div className="image_wrapper">
                                <div className="image_background"></div>
                                <img src={web1} alt="Shubham Kumar" className="profile_image" />
                                <div className="floating_card card_1">
                                    <span className="card_icon">🎯</span>
                                    <span className="card_text">60% Faster Testing</span>
                                </div>
                                <div className="floating_card card_2">
                                    <span className="card_icon">✨</span>
                                    <span className="card_text">Zero Critical Bugs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll_indicator" data-aos='fade-up' data-aos-delay='500'>
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                    <p>Scroll Down</p>
                </div>
            </section>
        </>
    )
};

export default Home;
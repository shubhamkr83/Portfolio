import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link } from "react-router-dom"
import "./footer.css";


const Footer = () => {

    return (
        <>
            <section className="footer_section">
                <div className="footer_center">
                    <h2>©Copyright 2025 by Shubham Kumar || All rights reserved</h2>
                </div>
            </section>
        </>
    )
};

export default Footer;
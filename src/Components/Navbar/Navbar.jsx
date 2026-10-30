import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { Link, NavLink } from "react-router-dom"
import "./navbar.css";


const Navbar = (props) => {

    const [icon, setIcon] = useState(false);

    const normal = () => {
        setIcon(false);
    }

    return (
        <>
            <nav className="navbar">

                <div className="logo">
                    <Link to="/" className="logo_text" onClick={normal}>Shubham</Link>
                </div>

                <div id="primary-menu" className={icon ? "menu mobile_menu" : "menu"}>

                    <NavLink end className="anc" to="/" onClick={normal}>Home</NavLink>
                    <NavLink className="anc" to="/about" onClick={normal}>Journey</NavLink>
                    <NavLink className="anc" to="/skills" onClick={normal}>Skills</NavLink>
                    <NavLink className="anc" to="/projects" onClick={normal}>Projects</NavLink>
                    <NavLink className="anc" to="/resume" onClick={normal}>Resume</NavLink>
                    <NavLink className="anc" to="/contact" onClick={normal}>Contact</NavLink>



                    <div className="theme_toggle_wrapper">
                        <input 
                            type="checkbox" 
                            id="theme_toggle" aria-label="Dark theme" 
                            className="theme_toggle_checkbox" 
                            checked={props.theme === 'dark'}
                            onChange={props.themeToggler}
                        />
                        <label htmlFor="theme_toggle" className="theme_toggle_label">
                            <span className="theme_toggle_icon sun">☀️</span>
                            <span className="theme_toggle_icon moon">🌙</span>
                            <div className="theme_toggle_ball"></div>
                        </label>
                    </div>

                </div>

                <div className="menuIcon">
                    <button type="button" className="menu_toggle" aria-label="Menu" aria-expanded={icon} aria-controls="primary-menu" onClick={() => setIcon(!icon)}>
                        <HiMenu aria-hidden="true" />
                    </button>
                </div>

            </nav>
        </>
    )
};


export default Navbar;
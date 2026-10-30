import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { NavLink } from "react-router-dom"
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
                    <h2>Shubham</h2>
                </div>

                <div className={icon ? "menu mobile_menu" : "menu"}>

                    <NavLink end className="anc" to="/" onClick={normal}>Home</NavLink>
                    <NavLink className="anc" to="/about" onClick={normal}>Journey</NavLink>
                    <NavLink className="anc" to="/skills" onClick={normal}>Skills</NavLink>
                    <NavLink className="anc" to="/projects" onClick={normal}>Projects</NavLink>
                    <NavLink className="anc" to="/contact" onClick={normal}>Contact</NavLink>



                    <div className="theme_toggle_wrapper">
                        <input 
                            type="checkbox" 
                            id="theme_toggle" 
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
                    <HiMenu onClick={() => setIcon(!icon)} />
                </div>

            </nav>
        </>
    )
};


export default Navbar;
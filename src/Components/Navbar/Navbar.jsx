import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from "react-router-dom"
import moon from '../../assets/images/moon.png';
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

                    <NavLink exact="true" activeClassname="active_class" className="anc" to="/" onClick={normal}>Home</NavLink>
                    <NavLink exact="true" className="anc" to="/about" onClick={normal}>Experience</NavLink>
                    <NavLink exact="true" className="anc" to="/skills" onClick={normal}>Skills</NavLink>
                    <NavLink exact="true" className="anc" to="/projects" onClick={normal}>Projects</NavLink>
                    <NavLink exact="true" className="anc" to="/contact" onClick={normal}>Contact</NavLink>

                    <div className="togglerIcon" onClick={normal}>
                        <img src={moon} alt="img" onClick={props.themeToggler} />
                    </div>

                </div>

                <div className="menuIcon">
                    <MenuIcon onClick={() => setIcon(!icon)} />
                </div>

            </nav>
        </>
    )
};


export default Navbar;
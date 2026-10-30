import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiArrowDown, FiFolder, FiFileText } from 'react-icons/fi';
import { profile } from '../../../data/profile';
import { fadeUp, scaleIn, stagger } from '../../../motion/variants';
import portrait from '../../../assets/images/img32.png';
import HeroBackdrop from './HeroBackdrop';
import TerminalCard from './TerminalCard';
import './Hero.css';

const Hero = () => {
    const reduceMotion = useReducedMotion();

    const scrollToJourney = (event) => {
        const target = document.getElementById('journey');
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    };

    const socials = [
        { href: profile.links.linkedin, label: 'LinkedIn', icon: <FaLinkedin />, external: true },
        { href: profile.links.github, label: 'GitHub', icon: <FaGithub />, external: true },
        { href: `mailto:${profile.email}`, label: 'Email', icon: <MdEmail /> },
    ];

    return (
        <section className="hero_section" id="home" aria-labelledby="hero_title">
            <HeroBackdrop />
            <div className="hero_inner">
                <motion.div className="hero_copy" variants={stagger} initial="hidden" animate="visible">
                    <motion.p className="hero_eyebrow" variants={fadeUp}>
                        <span className="hero_status_dot" aria-hidden="true" />
                        {profile.location}
                    </motion.p>
                    <motion.h1 id="hero_title" className="hero_name" variants={fadeUp}>
                        {profile.name}
                    </motion.h1>
                    <motion.p className="hero_role" variants={fadeUp}>{profile.role}</motion.p>
                    <motion.p className="hero_tagline" variants={fadeUp}>{profile.tagline}</motion.p>

                    <motion.div className="hero_ctas" variants={fadeUp}>
                        <a href="#journey" className="hero_btn hero_btn_primary" onClick={scrollToJourney}>
                            Explore my journey <FiArrowDown aria-hidden="true" />
                        </a>
                        <Link to="/projects" className="hero_btn hero_btn_ghost">
                            <FiFolder aria-hidden="true" /> Projects
                        </Link>
                        <Link to="/resume" className="hero_btn hero_btn_ghost">
                            <FiFileText aria-hidden="true" /> Resume
                        </Link>
                    </motion.div>

                    <motion.ul className="hero_socials" variants={fadeUp} aria-label="Social links">
                        {socials.map(({ href, label, icon, external }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="hero_social"
                                    aria-label={label}
                                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                >
                                    {icon}
                                </a>
                            </li>
                        ))}
                    </motion.ul>
                </motion.div>

                <motion.div className="hero_visual" variants={scaleIn} initial="hidden" animate="visible">
                    <div className="hero_photo_ring">
                        <img
                            src={portrait}
                            alt={`Portrait of ${profile.name}`}
                            className="hero_photo"
                            width="411"
                            height="308"
                        />
                    </div>
                    <TerminalCard />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

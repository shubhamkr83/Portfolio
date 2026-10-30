import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { fadeUp } from '../../motion/variants';
import Impact from '../../Components/sections/Impact/Impact';
import Journey from '../../Components/sections/Journey/Journey';
import './about.css';

const About = () => (
    <main className="about_page">
        <motion.header className="about_intro" variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="about_heading">{profile.name} · {profile.role}</h1>
            <p className="about_summary">{profile.summary}</p>
        </motion.header>
        <Impact />
        <Journey />
    </main>
);

export default About;

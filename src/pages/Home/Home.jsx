import React from 'react';
import Hero from '../../Components/sections/Hero/Hero';
import Impact from '../../Components/sections/Impact/Impact';
import Journey from '../../Components/sections/Journey/Journey';
import SkillsStack from '../../Components/sections/SkillsStack/SkillsStack';
import FeaturedProjects from '../../Components/sections/FeaturedProjects/FeaturedProjects';
import ContactSection from '../../Components/sections/Contact/ContactSection';
import './home.css';

const Home = () => (
    <main className="home_page">
        <Hero />
        <Impact />
        <Journey />
        <SkillsStack />
        <FeaturedProjects />
        <ContactSection />
    </main>
);

export default Home;

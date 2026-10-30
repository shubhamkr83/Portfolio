import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Hero from '../../Components/sections/Hero/Hero';
import Impact from '../../Components/sections/Impact/Impact';
import Journey from '../../Components/sections/Journey/Journey';
import SkillsStack from '../../Components/sections/SkillsStack/SkillsStack';
import FeaturedProjects from '../../Components/sections/FeaturedProjects/FeaturedProjects';
import { scaleIn } from '../../motion/variants';
import './home.css';

const Home = () => (
    <main className="home_page">
        <Hero />
        <Impact />
        <Journey />
        <SkillsStack />
        <FeaturedProjects />

        <section className="home_cta" aria-labelledby="home_cta_title">
            <motion.div
                className="home_cta_band"
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                <p className="home_cta_eyebrow">// next: your project</p>
                <h2 id="home_cta_title" className="home_cta_title">Let's build reliable software together</h2>
                <p className="home_cta_text">
                    Need automation, CI/CD or monitoring your team can trust on release day? Let's talk.
                </p>
                <Link to="/contact" className="home_cta_button">
                    Get in touch <FiArrowRight aria-hidden="true" />
                </Link>
            </motion.div>
        </section>
    </main>
);

export default Home;

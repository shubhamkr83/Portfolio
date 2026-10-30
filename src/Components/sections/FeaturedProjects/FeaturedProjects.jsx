import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import projects from '../../../data/projectsData';
import { fadeUp, stagger } from '../../../motion/variants';
import './FeaturedProjects.css';

const FEATURED_IDS = [1, 2, 4, 5];
const TICK_MS = 1700;

const featured = FEATURED_IDS
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);

// Cycles through the project's first flow, one step at a time, while on screen.
const FlowTicker = ({ projectId, flow }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.6 });
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(0);
    const steps = flow.steps;

    useEffect(() => {
        if (reduceMotion || !inView) return undefined;
        const timer = setInterval(() => setActive((i) => (i + 1) % steps.length), TICK_MS);
        return () => clearInterval(timer);
    }, [inView, reduceMotion, steps.length]);

    return (
        // Decorative inside the card link; the full flow is on the project page.
        <div className="featured_ticker" ref={ref} aria-hidden="true">
            <p className="featured_ticker_title">{flow.title}</p>
            <div>
                {reduceMotion ? (
                    <p className="featured_ticker_static">
                        {steps.map((step) => step.label).join(' → ')}
                    </p>
                ) : (
                    <>
                        <div className="featured_ticker_track">
                            {steps.map((step, i) => (
                                <span key={step.label} className="featured_ticker_slot">
                                    {i === active && (
                                        <motion.span
                                            layoutId={`featured_tick_${projectId}`}
                                            className="featured_ticker_glow"
                                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                    <span className={`featured_ticker_dot${i <= active ? ' featured_ticker_dot_done' : ''}`} />
                                </span>
                            ))}
                        </div>
                        <div className="featured_ticker_label">
                            <span className="featured_ticker_step">
                                {String(active + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
                            </span>
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={active}
                                    className="featured_ticker_text"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {steps[active].label}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const FeaturedProjects = () => (
    <section className="featured_section" id="featured" aria-labelledby="featured_title">
        <div className="featured_inner">
            <motion.header
                className="featured_header"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
            >
                <div>
                    <p className="featured_eyebrow">// featured builds</p>
                    <h2 id="featured_title" className="featured_title">Selected projects</h2>
                </div>
                <Link to="/projects" className="featured_all">
                    View all projects <FiArrowRight aria-hidden="true" />
                </Link>
            </motion.header>

            <motion.ul
                className="featured_grid"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {featured.map((project) => (
                    <motion.li key={project.id} variants={fadeUp}>
                        <Link to={`/projects/${project.id}`} className="featured_card">
                            <div className="featured_card_top">
                                <span className="featured_category">{project.category}</span>
                                <FiArrowUpRight className="featured_card_arrow" aria-hidden="true" />
                            </div>
                            <h3 className="featured_name">{project.name}</h3>
                            <ul className="featured_pills">
                                {project.highlights.map((h) => (
                                    <li key={h.label} className="featured_pill">
                                        <strong>{h.value}</strong> {h.label}
                                    </li>
                                ))}
                            </ul>
                            {project.flows?.[0] && <FlowTicker projectId={project.id} flow={project.flows[0]} />}
                        </Link>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    </section>
);

export default FeaturedProjects;

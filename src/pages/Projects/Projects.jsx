import React, { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import ProjectData from '../../data/projectsData';
import { fadeUp, stagger } from '../../motion/variants';
import { getIcon } from '../../Components/FlowDiagram/icons';
import CountUp from './CountUp';
import './project.css';

const ALL = 'All';
const CATEGORIES = [ALL, ...new Set(ProjectData.map((p) => p.category).filter(Boolean))];

// forwardRef: AnimatePresence mode="popLayout" measures its direct children through a ref.
const ProjectCard = forwardRef(({ project, index }, ref) => {
    const { id, name, image, category, highlights = [], flows = [] } = project;
    const steps = flows[0]?.steps ?? [];
    return (
        <motion.li
            ref={ref}
            layout
            className="pj_card"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 } }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="pj_card_top">
                <span className="pj_card_icon"><img src={image} alt="" loading="lazy" /></span>
                <span className="pj_card_category">{category}</span>
            </div>
            <h2 className="pj_card_name">
                <Link to={`/projects/${id}`} className="pj_card_link">{name}</Link>
            </h2>
            {highlights.length > 0 && (
                <dl className="pj_card_stats">
                    {highlights.slice(0, 2).map((h) => (
                        <div key={h.label} className="pj_card_stat">
                            <dt>{h.label}</dt>
                            <dd>{h.value}</dd>
                        </div>
                    ))}
                </dl>
            )}
            {steps.length > 0 && (
                <ol className="pj_card_flow" aria-label={`User flow: ${steps.map((s) => s.label).join(', ')}`}>
                    {steps.map((s, i) => {
                        const Icon = getIcon(s.icon);
                        return (
                            <li key={`${s.label}-${i}`} title={s.label} aria-hidden="true">
                                <Icon />
                            </li>
                        );
                    })}
                </ol>
            )}
            <span className="pj_card_cta" aria-hidden="true">
                View details <FiArrowRight />
            </span>
        </motion.li>
    );
});
ProjectCard.displayName = 'ProjectCard';

const Projects = () => {
    const [category, setCategory] = useState(ALL);
    const visible = category === ALL ? ProjectData : ProjectData.filter((p) => p.category === category);

    return (
        <section className="pj" aria-labelledby="pj-title">
            <motion.header className="pj_header" variants={stagger} initial="hidden" animate="visible">
                <motion.p className="pj_eyebrow" variants={fadeUp}>Selected work</motion.p>
                <motion.h1 id="pj-title" className="pj_title" variants={fadeUp}>
                    <span className="pj_count"><CountUp value={String(ProjectData.length)} /></span> projects in
                    automation, CI/CD &amp; monitoring
                </motion.h1>
                <motion.p className="pj_subtitle" variants={fadeUp}>
                    Test frameworks, Jenkins pipelines and health checks, each with an animated walkthrough of how it works.
                </motion.p>
            </motion.header>

            <div className="pj_filters" role="group" aria-label="Filter projects by category">
                {CATEGORIES.map((c) => {
                    const selected = c === category;
                    const n = c === ALL ? ProjectData.length : ProjectData.filter((p) => p.category === c).length;
                    return (
                        <button
                            key={c}
                            type="button"
                            className={`pj_pill${selected ? ' is-selected' : ''}`}
                            aria-pressed={selected}
                            onClick={() => setCategory(c)}
                        >
                            {selected && <motion.span layoutId="pj-pill" className="pj_pill_bg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                            <span className="pj_pill_text">{c}</span>
                            <span className="pj_pill_count">{n}</span>
                        </button>
                    );
                })}
            </div>

            <p className="pj_status" aria-live="polite">
                Showing {visible.length} of {ProjectData.length} projects
            </p>

            <motion.ul className="pj_grid" layout>
                <AnimatePresence mode="popLayout">
                    {visible.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
                </AnimatePresence>
            </motion.ul>
        </section>
    );
};

export default Projects;

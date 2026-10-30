import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { experience } from '../../../data/experience';
import { education } from '../../../data/education';
import { fadeUp, slideInLeft, slideInRight } from '../../../motion/variants';
import './Journey.css';

// Education and roles merged into one oldest-first timeline.
const milestones = [
    ...education.map((e) => ({
        key: e.id,
        kind: 'education',
        start: e.start,
        current: false,
        period: e.period,
        title: e.degree,
        subtitle: e.field,
        org: e.institution,
        location: e.location,
        score: e.score,
        points: [],
        stack: [],
    })),
    ...experience.map((x) => ({
        key: x.id,
        kind: 'work',
        start: x.start,
        current: x.end === null,
        period: x.period,
        title: x.role,
        org: x.company,
        orgNote: x.companyNote,
        website: x.website,
        logo: x.logo,
        location: x.location,
        points: x.achievements,
        stack: x.stack,
    })),
].sort((a, b) => a.start.localeCompare(b.start));

const LINE_ANCHOR = 0.6; // fraction of viewport height where the line's tip sits

const MilestoneCard = ({ item }) => (
    <article className="journey_card">
        <header className="journey_card_head">
            <span className="journey_logo">
                {item.kind === 'education'
                    ? <FaGraduationCap aria-hidden="true" />
                    : <img src={item.logo} alt={`${item.org} logo`} loading="lazy" />}
            </span>
            <p className={`journey_period${item.current ? ' journey_period_live' : ''}`}>
                {item.current && <span className="journey_live_dot" aria-hidden="true" />}
                {item.period}
                {item.current && <span className="journey_sr"> (current role)</span>}
            </p>
        </header>

        <h3 className="journey_role">{item.title}</h3>
        <p className="journey_org">
            {item.website
                ? <a href={item.website} target="_blank" rel="noreferrer">{item.org}</a>
                : item.org}
            {item.orgNote && <span className="journey_org_note"> {item.orgNote}</span>}
        </p>
        <p className="journey_meta">
            {item.subtitle ? `${item.subtitle} · ` : ''}{item.location}
        </p>

        {item.score && (
            <p className="journey_score">
                Score <strong>{item.score}</strong>
            </p>
        )}

        {item.points.length > 0 && (
            <ul className="journey_points">
                {item.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
        )}

        {item.stack.length > 0 && (
            <ul className="journey_stack" aria-label="Stack">
                {item.stack.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
        )}
    </article>
);

const Journey = () => {
    const listRef = useRef(null);
    const nodeRefs = useRef([]);
    const reduceMotion = useReducedMotion();
    const [reached, setReached] = useState(0);

    const { scrollYProgress } = useScroll({
        target: listRef,
        offset: [`start ${LINE_ANCHOR * 100}%`, `end ${LINE_ANCHOR * 100}%`],
    });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
    const lineScale = reduceMotion ? scrollYProgress : smoothProgress;

    // A node lights up once the filled part of the line has passed its centre.
    const updateReached = useCallback((progress) => {
        const list = listRef.current;
        if (!list) return;
        const listRect = list.getBoundingClientRect();
        const tip = listRect.height * progress;
        let count = 0;
        nodeRefs.current.forEach((node) => {
            if (!node) return;
            const rect = node.getBoundingClientRect();
            if (rect.top + rect.height / 2 - listRect.top <= tip + 1) count += 1;
        });
        setReached(count);
    }, []);

    useMotionValueEvent(scrollYProgress, 'change', updateReached);
    useEffect(() => { updateReached(scrollYProgress.get()); }, [scrollYProgress, updateReached]);

    return (
        <section className="journey_section" id="journey" aria-labelledby="journey_title">
            <div className="journey_inner">
                <motion.header
                    className="journey_header"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                >
                    <p className="journey_eyebrow">// git log --reverse</p>
                    <h2 id="journey_title" className="journey_title">The journey so far</h2>
                    <p className="journey_subtitle">
                        From a computer science degree to owning automation, CI/CD and monitoring end to end.
                    </p>
                </motion.header>

                <div className="journey_track" ref={listRef}>
                    <span className="journey_line" aria-hidden="true">
                        <motion.span className="journey_line_fill" style={{ scaleY: lineScale }} />
                    </span>
                    <ol className="journey_list">
                        {milestones.map((item, index) => {
                            const side = index % 2 === 0 ? 'left' : 'right';
                            return (
                                <li key={item.key} className={`journey_item journey_item_${side}`}>
                                    <span
                                        ref={(el) => { nodeRefs.current[index] = el; }}
                                        className={[
                                            'journey_node',
                                            index < reached ? 'journey_node_on' : '',
                                            item.current ? 'journey_node_live' : '',
                                        ].join(' ').trim()}
                                        aria-hidden="true"
                                    />
                                    <motion.div
                                        className="journey_card_wrap"
                                        variants={side === 'left' ? slideInLeft : slideInRight}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.2 }}
                                    >
                                        <MilestoneCard item={item} />
                                    </motion.div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default Journey;

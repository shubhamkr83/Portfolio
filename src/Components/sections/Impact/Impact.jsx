import React, { useEffect, useRef } from 'react';
import { motion, animate, useInView, useReducedMotion } from 'framer-motion';
import { FiActivity, FiCode, FiServer, FiShield } from 'react-icons/fi';
import { profile } from '../../../data/profile';
import { fadeUp, stagger } from '../../../motion/variants';
import './Impact.css';

const METER_RADIUS = 34;
const ease = [0.22, 1, 0.36, 1];

// Icons for the metrics that are counts rather than percentages.
const COUNT_ICONS = { downtime: FiShield, tests: FiCode, endpoints: FiServer };

const isPercent = (metric) => Boolean(metric.suffix && metric.suffix.includes('%'));

const formatValue = ({ prefix = '', value, suffix = '' }) => `${prefix}${value}${suffix}`;

const Counter = ({ value, inView, reduceMotion }) => {
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (reduceMotion) {
            node.textContent = String(value);
            return undefined;
        }
        if (!inView) return undefined;
        const controls = animate(0, value, {
            duration: 1.6,
            ease,
            onUpdate: (latest) => { node.textContent = String(Math.round(latest)); },
        });
        return () => controls.stop();
    }, [value, inView, reduceMotion]);

    return <span ref={ref}>0</span>;
};

const MetricCard = ({ metric }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const reduceMotion = useReducedMotion();
    const percent = isPercent(metric);
    const Icon = COUNT_ICONS[metric.id] || FiActivity;
    const fill = Math.min(metric.value, 100) / 100;

    const number = (
        <span className="impact_value" aria-hidden="true">
            {metric.prefix}
            <Counter value={metric.value} inView={inView} reduceMotion={reduceMotion} />
            {metric.suffix}
        </span>
    );

    return (
        <motion.li ref={ref} className="impact_card" variants={fadeUp}>
            {percent ? (
                <div className="impact_meter">
                    <svg viewBox="0 0 80 80" className="impact_meter_svg" aria-hidden="true">
                        <defs>
                            <linearGradient id={`impact_grad_${metric.id}`} x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--accent)" />
                                <stop offset="100%" stopColor="var(--accent-2)" />
                            </linearGradient>
                        </defs>
                        <circle className="impact_meter_track" cx="40" cy="40" r={METER_RADIUS} />
                        <motion.circle
                            className="impact_meter_arc"
                            cx="40"
                            cy="40"
                            r={METER_RADIUS}
                            stroke={`url(#impact_grad_${metric.id})`}
                            initial={{ pathLength: reduceMotion ? fill : 0 }}
                            animate={{ pathLength: inView || reduceMotion ? fill : 0 }}
                            transition={{ duration: reduceMotion ? 0 : 1.6, ease }}
                        />
                    </svg>
                    {number}
                </div>
            ) : (
                <div className="impact_count">
                    <span className="impact_icon" aria-hidden="true"><Icon /></span>
                    {number}
                </div>
            )}
            <h3 className="impact_label">
                <span className="impact_sr">{formatValue(metric)} </span>
                {metric.label}
            </h3>
            <p className="impact_context">{metric.context}</p>
        </motion.li>
    );
};

const Impact = () => (
    <section className="impact_section" id="impact" aria-labelledby="impact_title">
        <div className="impact_inner">
            <motion.header
                className="impact_header"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
            >
                <p className="impact_eyebrow">// impact.report</p>
                <h2 id="impact_title" className="impact_title">Impact in numbers</h2>
                <p className="impact_subtitle">
                    Outcomes from automation frameworks, CI/CD pipelines and monitoring I have shipped.
                </p>
            </motion.header>

            <motion.ul
                className="impact_grid"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
            >
                {profile.metrics.map((metric) => (
                    <MetricCard key={metric.id} metric={metric} />
                ))}
            </motion.ul>
        </div>
    </section>
);

export default Impact;

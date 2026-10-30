import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

const visuallyHidden = {
    position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
    overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
};

/**
 * Counts the leading integer of `value` up from 0 when scrolled into view
 * ("40+" -> 0+ ... 40+). Values without a leading number ("SHA256") render as-is.
 */
const CountUp = ({ value, duration = 1.2 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const reduce = useReducedMotion();
    const match = /^(\d+)(.*)$/.exec(String(value));
    const numeric = Boolean(match);
    const target = match ? parseInt(match[1], 10) : 0;
    const [shown, setShown] = useState(numeric && !reduce ? 0 : target);

    useEffect(() => {
        if (!numeric || reduce) {
            setShown(target);
            return undefined;
        }
        if (!inView) return undefined;
        const controls = animate(0, target, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setShown(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, reduce, numeric, target, duration]);

    if (!match) return <span ref={ref}>{value}</span>;
    return (
        <span ref={ref}>
            <span aria-hidden="true">{shown}{match[2]}</span>
            <span style={visuallyHidden}>{value}</span>
        </span>
    );
};

export default CountUp;

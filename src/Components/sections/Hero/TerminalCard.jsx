import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const COMMAND = 'mvn clean test -Dsuite=regression';

// Test areas exercised by the projects in src/data/projectsData.js.
const CHECKS = [
    'Auth · JWT token injection',
    'Catalog · search & tagging pipeline',
    'Buyer App · search & cart',
    'Android · smoke on BrowserStack',
    'Release · APK/AAB SHA256 checksum',
    'Monitoring · SSL validation',
    'Payment API · health check',
];

const TYPE_MS = 45;
const LINE_MS = 420;
const HOLD_MS = 3200;

// Total lines after the command: one per check, a summary, then BUILD SUCCESS.
const TOTAL_LINES = CHECKS.length + 2;

const TerminalCard = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.3 });
    const reduceMotion = useReducedMotion();
    const [progress, setProgress] = useState({ chars: 0, lines: 0 });
    const progressRef = useRef(progress);

    // Under reduced motion, show the finished run.
    const typedChars = reduceMotion ? COMMAND.length : progress.chars;
    const shownLines = reduceMotion ? TOTAL_LINES : progress.lines;

    useEffect(() => {
        if (reduceMotion || !inView) return undefined;

        let timer;
        const commit = (next) => {
            progressRef.current = next;
            setProgress(next);
        };

        // Resumes from wherever the run was when it last paused (scrolled out of view).
        const tick = () => {
            const { chars, lines } = progressRef.current;
            if (chars < COMMAND.length) {
                commit({ chars: chars + 1, lines });
                timer = setTimeout(tick, TYPE_MS);
            } else if (lines < TOTAL_LINES) {
                commit({ chars, lines: lines + 1 });
                timer = setTimeout(tick, LINE_MS);
            } else {
                timer = setTimeout(() => {
                    commit({ chars: 0, lines: 0 });
                    timer = setTimeout(tick, 500);
                }, HOLD_MS);
            }
        };

        timer = setTimeout(tick, 400);
        return () => clearTimeout(timer);
    }, [inView, reduceMotion]);

    return (
        <figure
            ref={ref}
            className="hero_terminal"
            role="img"
            aria-label={`Terminal running ${COMMAND}: ${CHECKS.length} test areas pass, ending in BUILD SUCCESS`}
        >
            <div className="hero_terminal_bar" aria-hidden="true">
                <span className="hero_terminal_dot" />
                <span className="hero_terminal_dot" />
                <span className="hero_terminal_dot" />
                <span className="hero_terminal_title">regression-suite — zsh</span>
            </div>
            <div className="hero_terminal_body" aria-hidden="true">
                <p className="hero_terminal_line">
                    <span className="hero_terminal_prompt">$</span>{' '}
                    {COMMAND.slice(0, typedChars)}
                    {shownLines === 0 && <span className="hero_terminal_cursor" />}
                </p>
                {CHECKS.slice(0, shownLines).map((check) => (
                    <p key={check} className="hero_terminal_line hero_terminal_pass">
                        <span>✓</span> {check}
                    </p>
                ))}
                {shownLines > CHECKS.length && (
                    <p className="hero_terminal_line hero_terminal_muted">
                        Tests run: {CHECKS.length}, Failures: 0, Errors: 0, Skipped: 0
                    </p>
                )}
                {shownLines > CHECKS.length + 1 && (
                    <p className="hero_terminal_line hero_terminal_success">
                        [INFO] BUILD SUCCESS
                        <span className="hero_terminal_cursor" />
                    </p>
                )}
            </div>
        </figure>
    );
};

export default TerminalCard;

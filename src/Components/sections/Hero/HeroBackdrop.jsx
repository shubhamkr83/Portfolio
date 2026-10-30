import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const LINK_DISTANCE = 140;
const MAX_NODES = 70;
const AREA_PER_NODE = 16000;

const readColors = () => {
    const styles = getComputedStyle(document.documentElement);
    return [styles.getPropertyValue('--accent').trim(), styles.getPropertyValue('--accent-2').trim()];
};

const createNodes = (width, height) => {
    const count = Math.min(MAX_NODES, Math.max(18, Math.round((width * height) / AREA_PER_NODE)));
    return Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 1.6,
        tone: i % 3 === 0 ? 1 : 0,
    }));
};

// Subtle node-and-link network. Runs only while on screen and the tab is visible;
// draws a single static frame when the user prefers reduced motion.
const HeroBackdrop = () => {
    const canvasRef = useRef(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return undefined;

        let width = 0;
        let height = 0;
        let nodes = [];
        let colors = readColors();
        let frame = 0;
        let onScreen = true;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.lineWidth = 1;
            for (let i = 0; i < nodes.length; i += 1) {
                const a = nodes[i];
                for (let j = i + 1; j < nodes.length; j += 1) {
                    const b = nodes[j];
                    const dist = Math.hypot(a.x - b.x, a.y - b.y);
                    if (dist < LINK_DISTANCE) {
                        ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.35;
                        ctx.strokeStyle = colors[a.tone];
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
            for (const n of nodes) {
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = colors[n.tone];
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        };

        const step = () => {
            for (const n of nodes) {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > width) n.vx *= -1;
                if (n.y < 0 || n.y > height) n.vy *= -1;
            }
            draw();
            frame = requestAnimationFrame(step);
        };

        const stop = () => {
            cancelAnimationFrame(frame);
            frame = 0;
        };

        const sync = () => {
            const shouldRun = !reduceMotion && onScreen && !document.hidden;
            if (shouldRun && !frame) frame = requestAnimationFrame(step);
            if (!shouldRun) {
                stop();
                draw();
            }
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            nodes = createNodes(width, height);
            draw();
        };

        resize();
        sync();

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        const intersectionObserver = new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
            sync();
        });
        intersectionObserver.observe(canvas);

        const themeObserver = new MutationObserver(() => {
            colors = readColors();
            draw();
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        document.addEventListener('visibilitychange', sync);

        return () => {
            stop();
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            themeObserver.disconnect();
            document.removeEventListener('visibilitychange', sync);
        };
    }, [reduceMotion]);

    return <canvas ref={canvasRef} className="hero_backdrop" aria-hidden="true" />;
};

export default HeroBackdrop;

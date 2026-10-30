import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { FiCheck, FiChevronLeft, FiChevronRight, FiPause, FiPlay, FiRotateCcw } from "react-icons/fi";
import { drawPath } from "../../motion/variants";
import { getIcon } from "./icons";
import "./flowDiagram.css";

const MOBILE_QUERY = "(max-width: 719.98px)";
const MAX_PER_ROW = 5;
const EDGE_DURATION = 0.8; // seconds, matches drawPath
const DWELL_WITH_DETAIL = 2800; // ms a step stays active during auto-play
const DWELL_WITHOUT_DETAIL = 1600;

// Horizontal layout, in SVG user units. The canvas keeps this aspect ratio so units scale uniformly.
const H_WIDTH = 1000;
const H_PAD_X = 60;
const H_TOP = 56;
const H_ROW = 170;
const H_BOTTOM = 112;
const H_WRAP_BULGE = 160;

// Vertical layout, in CSS pixels (no scaling). Must match --fd-node on mobile in flowDiagram.css.
const V_NODE = 44;
const V_STEP = 72;

const useMediaQuery = (query) => {
    const get = () => typeof window !== "undefined" && window.matchMedia(query).matches;
    const [matches, setMatches] = useState(get);
    useEffect(() => {
        const mql = window.matchMedia(query);
        const onChange = () => setMatches(mql.matches);
        onChange();
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, [query]);
    return matches;
};

const lerp = (a, b, t) => a + (b - a) * t;
const bezier = (p, t) => {
    const u = 1 - t;
    return [0, 1].map((k) =>
        u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k]);
};
const straight = (a, b) => [a, [lerp(a[0], b[0], 1 / 3), lerp(a[1], b[1], 1 / 3)], [lerp(a[0], b[0], 2 / 3), lerp(a[1], b[1], 2 / 3)], b];
const toPath = (p) => `M ${p[0][0]} ${p[0][1]} C ${p[1][0]} ${p[1][1]}, ${p[2][0]} ${p[2][1]}, ${p[3][0]} ${p[3][1]}`;

/** Node centres and edge curves. Two serpentine rows when there are more than five steps. */
const buildLayout = (count, vertical) => {
    if (vertical) {
        const points = Array.from({ length: count }, (_, i) => [V_NODE / 2, V_NODE / 2 + i * V_STEP]);
        const height = V_NODE + (count - 1) * V_STEP;
        const curves = points.slice(1).map((b, i) => straight(points[i], b));
        return { vertical, width: V_NODE, height, points, curves, colWidth: V_NODE };
    }
    const rows = count > MAX_PER_ROW ? 2 : 1;
    const cols = Math.ceil(count / rows);
    const colWidth = (H_WIDTH - 2 * H_PAD_X) / cols;
    const points = Array.from({ length: count }, (_, i) => {
        const row = i < cols ? 0 : 1;
        const col = row === 0 ? i : cols - 1 - (i - cols); // second row runs right-to-left
        return [H_PAD_X + (col + 0.5) * colWidth, H_TOP + row * H_ROW];
    });
    const curves = points.slice(1).map((b, i) => {
        const a = points[i];
        if (a[1] === b[1]) return straight(a, b);
        const x = Math.max(a[0], b[0]) + H_WRAP_BULGE; // U-turn around the end of the row
        return [a, [x, a[1]], [x, b[1]], b];
    });
    const height = H_TOP + (rows - 1) * H_ROW + H_BOTTOM;
    return { vertical, width: H_WIDTH, height, points, curves, colWidth };
};

const PACKET_SAMPLES = 18;
const samplePath = (curve) => {
    const xs = [];
    const ys = [];
    for (let s = 0; s <= PACKET_SAMPLES; s += 1) {
        const [x, y] = bezier(curve, s / PACKET_SAMPLES);
        xs.push(x);
        ys.push(y);
    }
    return { xs, ys };
};

const pad = (n) => String(n).padStart(2, "0");

const FlowDiagram = ({ flow }) => {
    const steps = flow?.steps ?? [];
    const count = steps.length;
    const rootRef = useRef(null);
    const inView = useInView(rootRef, { once: true, amount: 0.35 });
    const reduce = useReducedMotion();
    const vertical = useMediaQuery(MOBILE_QUERY);
    const gradientId = `fd-grad-${useId().replace(/:/g, "")}`;

    const [active, setActive] = useState(0);
    const [reachedState, setReached] = useState(-1); // furthest step revealed so far
    const [playing, setPlaying] = useState(false);
    const [packet, setPacket] = useState(null); // { edge, id } while a packet travels

    const reached = reduce ? count - 1 : reachedState;
    const layout = useMemo(() => buildLayout(count, vertical), [count, vertical]);
    const paths = useMemo(() => layout.curves.map((c) => ({ d: toPath(c), ...samplePath(c) })), [layout]);

    const goTo = useCallback((next) => {
        if (next < 0 || next >= count) return;
        if (next === active + 1 && !reduce) setPacket({ edge: active, id: Date.now() });
        setActive(next);
        setReached((r) => Math.max(r, next));
    }, [active, count, reduce]);

    // Start once the diagram scrolls into view. Reduced motion: everything is shown, no auto-play.
    useEffect(() => {
        if (!inView) return;
        setReached((r) => Math.max(r, 0));
        if (!reduce) setPlaying(true);
    }, [inView, reduce]);

    // Auto-play timer: advance one step per dwell, stop on the last step.
    useEffect(() => {
        if (!playing) return undefined;
        if (active >= count - 1) {
            setPlaying(false);
            return undefined;
        }
        const dwell = steps[active]?.detail ? DWELL_WITH_DETAIL : DWELL_WITHOUT_DETAIL;
        const timer = setTimeout(() => goTo(active + 1), dwell);
        return () => clearTimeout(timer);
    }, [playing, active, count, steps, goTo]);

    const userGoTo = (i) => {
        setPlaying(false);
        goTo(i);
    };

    const replay = () => {
        setPacket(null);
        setActive(0);
        if (!reduce) {
            setReached(0);
            setPlaying(true);
        }
    };

    const togglePlay = () => {
        if (playing) {
            setPlaying(false);
            return;
        }
        if (active >= count - 1) setActive(0);
        setPlaying(true);
    };

    const onKeyDown = (e) => {
        const keys = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: count - 1 };
        if (!(e.key in keys)) return;
        e.preventDefault();
        userGoTo(Math.min(count - 1, Math.max(0, keys[e.key])));
    };

    if (count === 0) return null;

    const step = steps[active];
    const isPipeline = flow.kind === "pipeline";
    const detail = step.detail || `${isPipeline ? "Stage" : "Step"} ${active + 1} of ${count}${isPipeline ? " in the CI/CD pipeline." : "."}`;

    const nodeBox = (point) => (layout.vertical
        ? { top: `${point[1] - V_NODE / 2}px` }
        : {
            left: `${(point[0] / layout.width) * 100}%`,
            top: `calc(${(point[1] / layout.height) * 100}% - var(--fd-node) / 2)`,
            width: `${(layout.colWidth * 0.84 / layout.width) * 100}%`,
        });

    return (
        <figure
            ref={rootRef}
            className={`fd ${layout.vertical ? "fd--vertical" : "fd--horizontal"}`}
            tabIndex={0}
            role="group"
            aria-roledescription="flow diagram"
            aria-label={`${flow.title}: ${count} steps. Use the left and right arrow keys to move between steps.`}
            onKeyDown={onKeyDown}
        >
            <div
                className="fd_canvas"
                style={layout.vertical ? { height: `${layout.height}px` } : { aspectRatio: `${layout.width} / ${layout.height}` }}
            >
                <svg
                    className="fd_svg"
                    viewBox={`0 0 ${layout.width} ${layout.height}`}
                    style={layout.vertical ? { width: `${layout.width}px`, height: `${layout.height}px` } : undefined}
                    aria-hidden="true"
                    focusable="false"
                >
                    <defs>
                        <linearGradient
                            id={gradientId}
                            gradientUnits="userSpaceOnUse"
                            x1="0" y1="0"
                            x2={layout.vertical ? 0 : layout.width}
                            y2={layout.vertical ? layout.height : 0}
                        >
                            <stop offset="0%" className="fd_stop_a" />
                            <stop offset="100%" className="fd_stop_b" />
                        </linearGradient>
                    </defs>
                    {paths.map((p, i) => (
                        <path key={`track-${i}`} d={p.d} className="fd_track" />
                    ))}
                    {paths.map((p, i) => (
                        <motion.path
                            key={`edge-${layout.vertical}-${i}`}
                            d={p.d}
                            className="fd_edge"
                            stroke={`url(#${gradientId})`}
                            variants={drawPath}
                            initial={reduce ? false : "hidden"}
                            animate={i < reached ? "visible" : "hidden"}
                        />
                    ))}
                    {packet && paths[packet.edge] && (
                        <g key={packet.id}>
                            <motion.circle
                                className="fd_packet_halo"
                                r={layout.vertical ? 9 : 14}
                                initial={{ cx: paths[packet.edge].xs[0], cy: paths[packet.edge].ys[0], opacity: 0 }}
                                animate={{ cx: paths[packet.edge].xs, cy: paths[packet.edge].ys, opacity: [0, 0.5, 0.5, 0] }}
                                transition={{ duration: EDGE_DURATION, ease: "easeInOut" }}
                            />
                            <motion.circle
                                className="fd_packet"
                                r={layout.vertical ? 4 : 6}
                                initial={{ cx: paths[packet.edge].xs[0], cy: paths[packet.edge].ys[0], opacity: 0 }}
                                animate={{ cx: paths[packet.edge].xs, cy: paths[packet.edge].ys, opacity: [0, 1, 1, 0] }}
                                transition={{ duration: EDGE_DURATION, ease: "easeInOut" }}
                                onAnimationComplete={() => setPacket((p) => (p && p.id === packet.id ? null : p))}
                            />
                        </g>
                    )}
                </svg>

                {steps.map((s, i) => {
                    const Icon = getIcon(s.icon);
                    const revealed = i <= reached;
                    const state = i === active ? "is-active" : i < active ? "is-done" : "is-pending";
                    return (
                        <div key={`${s.label}-${i}`} className="fd_node_slot" style={nodeBox(layout.points[i])}>
                            <motion.button
                                type="button"
                                className={`fd_node ${state}`}
                                aria-label={`Step ${i + 1} of ${count}: ${s.label}`}
                                aria-current={i === active ? "step" : undefined}
                                tabIndex={revealed ? 0 : -1}
                                style={revealed ? undefined : { pointerEvents: "none" }}
                                onClick={() => userGoTo(i)}
                                initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                                animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: revealed && i > 0 && !reduce ? EDGE_DURATION * 0.7 : 0 }}
                            >
                                <span className="fd_circle">
                                    <Icon aria-hidden="true" />
                                    {i < active && (
                                        <span className="fd_badge" aria-hidden="true"><FiCheck /></span>
                                    )}
                                </span>
                                <span className="fd_label">{s.label}</span>
                            </motion.button>
                        </div>
                    );
                })}
            </div>

            <figcaption className="fd_caption" aria-live={playing ? "off" : "polite"}>
                <div className="fd_progress" aria-hidden="true">
                    <span style={{ width: `${((active + 1) / count) * 100}%` }} />
                </div>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={active}
                        className="fd_caption_body"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                    >
                        <span className="fd_caption_num">{pad(active + 1)} / {pad(count)}</span>
                        <h3 className="fd_caption_title">{step.label}</h3>
                        <p className="fd_caption_detail">{detail}</p>
                    </motion.div>
                </AnimatePresence>
            </figcaption>

            <div className="fd_controls">
                <button type="button" className="fd_btn" onClick={replay} aria-label="Replay flow from the first step">
                    <FiRotateCcw aria-hidden="true" />
                </button>
                <button type="button" className="fd_btn" onClick={() => userGoTo(active - 1)} disabled={active === 0} aria-label="Previous step">
                    <FiChevronLeft aria-hidden="true" />
                </button>
                <button type="button" className="fd_btn fd_btn--primary" onClick={togglePlay} aria-label={playing ? "Pause auto-play" : "Play steps automatically"}>
                    {playing ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
                </button>
                <button type="button" className="fd_btn" onClick={() => userGoTo(active + 1)} disabled={active === count - 1} aria-label="Next step">
                    <FiChevronRight aria-hidden="true" />
                </button>
            </div>
        </figure>
    );
};

export default FlowDiagram;

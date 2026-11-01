import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiChevronLeft, FiChevronRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import ProjectData from '../../data/projectsData';
import { fadeUp, scaleIn, stagger } from '../../motion/variants';
import FlowDiagram from '../../Components/FlowDiagram/FlowDiagram';
import toPipelineFlow, { guessIcon } from '../../Components/FlowDiagram/toPipelineFlow';
import { getIcon } from '../../Components/FlowDiagram/icons';
import CountUp from './CountUp';
import QaDashboardDemo from './QaDashboardDemo';
import './projectDetail.css';

const TESTING_GROUPS = [
    ['testTypes', 'Test types'],
    ['apiTargets', 'API targets'],
    ['appVersions', 'App versions'],
    ['testAreas', 'Test areas'],
    ['profiles', 'Profiles'],
];

const POST_BUILD_TONE = { always: 'neutral', success: 'pass', failure: 'fail', unstable: 'warn' };

const isDirectVideo = (url) => /\.(mp4|webm)$/i.test(url || '');
const isGoogleDriveVideo = (url) => (url || '').includes('drive.google.com') && /\/file\/d\/|\/preview/.test(url);
const isMedia = (url) => isDirectVideo(url) || isGoogleDriveVideo(url);

const reveal = { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.15 } };

/** "Title: body" feature strings become a titled card; others are body-only. */
const splitFeature = (text) => {
    const at = text.indexOf(': ');
    return at > 0 && at < 60 ? [text.slice(0, at), text.slice(at + 2)] : [null, text];
};

const Section = ({ id, title, eyebrow, children }) => (
    <motion.section className="pd_section" aria-labelledby={id} variants={fadeUp} {...reveal}>
        {eyebrow && <p className="pd_eyebrow">{eyebrow}</p>}
        <h2 id={id} className="pd_h2">{title}</h2>
        {children}
    </motion.section>
);

/* ---------------- How it works (tabs) ---------------- */

const FlowTabs = ({ project }) => {
    const pipeline = toPipelineFlow(project);
    const tabs = [
        // A single flow keeps the "User flow" label; several flows are tabbed by their own titles.
        ...(project.flows || []).map((flow, i, all) => ({
            key: i === 0 ? 'user' : `flow-${i}`,
            label: all.length > 1 ? flow.title : 'User flow',
            flow,
        })),
        pipeline && { key: 'pipeline', label: 'CI/CD pipeline', flow: pipeline },
    ].filter(Boolean);
    const [current, setCurrent] = useState(tabs[0]?.key);
    const tabRefs = useRef({});

    if (tabs.length === 0) return null;
    const tab = tabs.find((t) => t.key === current) || tabs[0];

    const onTabKey = (e, index) => {
        const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!delta) return;
        e.preventDefault();
        const next = tabs[(index + delta + tabs.length) % tabs.length];
        setCurrent(next.key);
        tabRefs.current[next.key]?.focus();
    };

    return (
        <Section id="pd-how" title="How it works" eyebrow="Motion walkthrough">
            {tabs.length > 1 && (
                <div className="pd_tabs" role="tablist" aria-label="Flow diagrams">
                    {tabs.map((t, i) => {
                        const selected = t.key === tab.key;
                        return (
                            <button
                                key={t.key}
                                ref={(el) => { tabRefs.current[t.key] = el; }}
                                type="button"
                                role="tab"
                                id={`pd-tab-${t.key}`}
                                aria-selected={selected}
                                aria-controls="pd-tabpanel"
                                tabIndex={selected ? 0 : -1}
                                className={`pd_tab${selected ? ' is-selected' : ''}`}
                                onClick={() => setCurrent(t.key)}
                                onKeyDown={(e) => onTabKey(e, i)}
                            >
                                {selected && <motion.span layoutId="pd-tab-pill" className="pd_tab_pill" />}
                                <span className="pd_tab_text">{t.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
            <div
                id="pd-tabpanel"
                role={tabs.length > 1 ? 'tabpanel' : undefined}
                aria-labelledby={tabs.length > 1 ? `pd-tab-${tab.key}` : undefined}
            >
                <FlowDiagram key={tab.key} flow={tab.flow} />
                {tab.key === 'pipeline' && project.pipelineFlow.postBuild?.length > 0 && (
                    <div className="pd_postbuild">
                        <span className="pd_postbuild_label">Post-build</span>
                        <ul className="pd_chips">
                            {project.pipelineFlow.postBuild.map((outcome) => (
                                <li key={outcome} className={`pd_chip pd_chip--${POST_BUILD_TONE[outcome.toLowerCase()] || 'neutral'}`}>
                                    {outcome}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Section>
    );
};

/* ---------------- Media carousel (real media only) ---------------- */

const MediaCarousel = ({ name, media }) => {
    const reduce = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showPause, setShowPause] = useState(false);
    const videoRef = useRef(null);
    const current = media[index];

    // Keep the play/pause overlay in sync with the <video> element.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return undefined;
        const onPlay = () => setIsVideoPlaying(true);
        const onPause = () => setIsVideoPlaying(false);
        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        return () => {
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
        };
    }, [index]);

    // Auto-advance every 5s; never under reduced motion.
    useEffect(() => {
        if (media.length <= 1 || isPaused || reduce) return undefined;
        const timer = setInterval(() => setIndex((i) => (i + 1) % media.length), 5000);
        return () => clearInterval(timer);
    }, [media.length, isPaused, reduce]);

    const step = (delta) => setIndex((i) => (i + delta + media.length) % media.length);

    const toggleVideo = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
        } else {
            video.pause();
            setShowPause(true);
            setTimeout(() => setShowPause(false), 600);
        }
    };

    return (
        <div className="pd_media" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <div className="pd_media_frame">
                {isDirectVideo(current) ? (
                    <div className="pd_media_video" onClick={toggleVideo}>
                        <video ref={videoRef} src={current} controls muted loop playsInline />
                        {!isVideoPlaying && (
                            <div className="pd_media_overlay" aria-hidden="true">
                                {showPause ? <BsPauseFill /> : <BsPlayFill />}
                            </div>
                        )}
                    </div>
                ) : (
                    <iframe
                        src={current}
                        allow="autoplay"
                        allowFullScreen
                        loading="lazy"
                        title={`${name}: demo video ${index + 1}`}
                    />
                )}
                {media.length > 1 && (
                    <>
                        <button type="button" className="pd_media_arrow pd_media_arrow--left" onClick={() => step(-1)} aria-label="Previous media">
                            <FiChevronLeft aria-hidden="true" />
                        </button>
                        <button type="button" className="pd_media_arrow pd_media_arrow--right" onClick={() => step(1)} aria-label="Next media">
                            <FiChevronRight aria-hidden="true" />
                        </button>
                    </>
                )}
            </div>
            {media.length > 1 && (
                <div className="pd_media_dots">
                    {media.map((url, i) => (
                        <button
                            key={url}
                            type="button"
                            className={`pd_media_dot${i === index ? ' is-active' : ''}`}
                            onClick={() => setIndex(i)}
                            aria-label={`Show media ${i + 1}`}
                            aria-current={i === index ? 'true' : undefined}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

/* ---------------- Page ---------------- */

const ProjectView = ({ project }) => {
    const { name, image, git, live, category, overview, features = [], structure, testing, highlights = [], tools = [] } = project;
    const media = (project.images || []).filter(isMedia);
    const related = ProjectData.filter((p) => p.category === category && p.id !== project.id).slice(0, 3);
    const testingGroups = testing ? TESTING_GROUPS.filter(([key]) => testing[key]?.length > 0) : [];
    const liveIsDistinct = live && live !== git;

    return (
        <article className="pd">
            <motion.header className="pd_header" variants={stagger} initial="hidden" animate="visible">
                <motion.nav variants={fadeUp} aria-label="Breadcrumb">
                    <ol className="pd_breadcrumb">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li aria-current="page">{name}</li>
                    </ol>
                </motion.nav>
                <motion.div className="pd_header_row" variants={fadeUp}>
                    <span className="pd_header_icon"><img src={image} alt="" loading="lazy" /></span>
                    <span className="pd_category">{category}</span>
                </motion.div>
                <motion.h1 className="pd_title" variants={fadeUp}>{name}</motion.h1>
                {overview && <motion.p className="pd_overview" variants={fadeUp}>{overview}</motion.p>}
                <motion.div className="pd_actions" variants={fadeUp}>
                    <a className="pd_button pd_button--primary" href={git} target="_blank" rel="noreferrer">
                        <FiGithub aria-hidden="true" /> View on GitHub
                    </a>
                    {liveIsDistinct && (
                        <a className="pd_button" href={live} target="_blank" rel="noreferrer">
                            <FiExternalLink aria-hidden="true" /> Live site
                        </a>
                    )}
                    <Link className="pd_button pd_button--ghost" to="/projects">
                        <FiArrowLeft aria-hidden="true" /> All projects
                    </Link>
                </motion.div>
            </motion.header>

            {highlights.length > 0 && (
                <motion.ul className="pd_stats" aria-label="Highlights" variants={stagger} {...reveal}>
                    {highlights.map((h) => (
                        <motion.li key={h.label} className="pd_stat" variants={scaleIn}>
                            <span className="pd_stat_value"><CountUp value={h.value} /></span>
                            <span className="pd_stat_label">{h.label}</span>
                        </motion.li>
                    ))}
                </motion.ul>
            )}

            <FlowTabs project={project} />

            {project.dashboardDemo && (
                <Section id="pd-dashboard" title="Dashboard example" eyebrow="Try it">
                    <QaDashboardDemo />
                </Section>
            )}

            {features.length > 0 && (
                <Section id="pd-features" title="Features" eyebrow="What it does">
                    <motion.ul className="pd_features" variants={stagger} {...reveal}>
                        {features.map((feature) => {
                            const [title, body] = splitFeature(feature);
                            const Icon = getIcon(guessIcon(title || body));
                            return (
                                <motion.li key={feature} className="pd_feature" variants={fadeUp}>
                                    <span className="pd_feature_icon" aria-hidden="true"><Icon /></span>
                                    <div>
                                        {title && <h3 className="pd_feature_title">{title}</h3>}
                                        <p className="pd_feature_body">{body}</p>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                </Section>
            )}

            {structure && (
                <Section id="pd-architecture" title="Architecture" eyebrow="Under the hood">
                    <p className="pd_prose">{structure}</p>
                </Section>
            )}

            {testingGroups.length > 0 && (
                <Section id="pd-testing" title="Testing coverage" eyebrow="Quality gates">
                    <div className="pd_groups">
                        {testingGroups.map(([key, label]) => (
                            <div key={key} className="pd_group">
                                <h3 className="pd_group_title">{label}</h3>
                                <ul className="pd_chips">
                                    {testing[key].map((item) => <li key={item} className="pd_chip">{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {tools.length > 0 && (
                <Section id="pd-stack" title="Tech stack" eyebrow="Built with">
                    <ul className="pd_chips pd_chips--stack">
                        {tools.map((tool) => <li key={tool} className="pd_chip pd_chip--mono">{tool}</li>)}
                    </ul>
                </Section>
            )}

            {media.length > 0 && (
                <Section id="pd-media" title="Demo" eyebrow="See it run">
                    <MediaCarousel name={name} media={media} />
                </Section>
            )}

            {related.length > 0 && (
                <Section id="pd-related" title="Related projects" eyebrow={category}>
                    <ul className="pd_related">
                        {related.map((p) => (
                            <li key={p.id} className="pd_related_card">
                                <span className="pd_related_icon"><img src={p.image} alt="" loading="lazy" /></span>
                                <div className="pd_related_text">
                                    <Link to={`/projects/${p.id}`} className="pd_related_link">{p.name}</Link>
                                    <span className="pd_related_meta">{p.highlights?.[0] ? `${p.highlights[0].value} ${p.highlights[0].label}` : p.category}</span>
                                </div>
                                <FiArrowRight className="pd_related_arrow" aria-hidden="true" />
                            </li>
                        ))}
                    </ul>
                </Section>
            )}
        </article>
    );
};

const ProjectDetail = () => {
    const { id } = useParams();
    const project = ProjectData.find((p) => String(p.id) === id);

    if (!project) {
        return (
            <section className="pd pd_notfound">
                <p className="pd_notfound_code">404</p>
                <h1 className="pd_title">Project not found</h1>
                <p className="pd_overview">There is no project with id &ldquo;{id}&rdquo;. It may have been renamed or removed.</p>
                <Link to="/projects" className="pd_button pd_button--primary">
                    <FiArrowLeft aria-hidden="true" /> Browse all projects
                </Link>
            </section>
        );
    }

    // Keyed so tabs, flow playback and the carousel reset when moving between projects.
    return <ProjectView key={project.id} project={project} />;
};

export default ProjectDetail;

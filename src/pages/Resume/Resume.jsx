import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { experience } from '../../data/experience';
import { education } from '../../data/education';
import { resumeProjects } from '../../data/resumeProjects';
import { fadeUp } from '../../motion/variants';
import "./resume.css";

const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '');

const Section = ({ title, children }) => (
    <motion.section
        className="resume_section"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
    >
        <h2 className="resume_h2">{title}</h2>
        {children}
    </motion.section>
);

const Resume = () => (
    <main className="resume_page">
        <div className="resume_toolbar print-hidden">
            <Link to="/" className="resume_btn resume_btn_ghost">Back to site</Link>
            <button type="button" className="resume_btn" onClick={() => window.print()}>Download PDF</button>
        </div>

        <article className="resume_sheet">
            <header className="resume_header">
                <h1 className="resume_name">{profile.name}</h1>
                <p className="resume_role">{profile.role}</p>
                <p className="resume_contact">
                    <span>{profile.location}</span>
                    <span className="resume_sep" aria-hidden="true"> · </span>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                    <span className="resume_sep" aria-hidden="true"> · </span>
                    <a href={profile.links.linkedin} target="_blank" rel="noreferrer">{bare(profile.links.linkedin)}</a>
                    <span className="resume_sep" aria-hidden="true"> · </span>
                    <a href={profile.links.github} target="_blank" rel="noreferrer">{bare(profile.links.github)}</a>
                </p>
            </header>

            <Section title="Summary">
                <p className="resume_text">{profile.summary}</p>
            </Section>

            <Section title="Experience">
                {experience.map((job) => (
                    <div className="resume_entry" key={`${job.company}-${job.period}`}>
                        <h3 className="resume_h3">
                            {job.role} | {job.company}
                            {job.companyNote ? ` ${job.companyNote}` : ''}
                        </h3>
                        <p className="resume_meta">{job.period} · {job.location}</p>
                        <ul className="resume_list">
                            {job.resumeBullets.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                        {job.stack?.length > 0 && (
                            <p className="resume_stack"><strong>Tech stack:</strong> {job.stack.join(', ')}</p>
                        )}
                    </div>
                ))}
            </Section>

            <Section title="Projects">
                {resumeProjects.map((p) => (
                    <div className="resume_entry" key={p.id}>
                        <h3 className="resume_h3">{p.title}</h3>
                        {p.link && (
                            <p className="resume_meta">
                                <a href={p.link} target="_blank" rel="noreferrer">{bare(p.link)}</a>
                            </p>
                        )}
                        <ul className="resume_list">
                            {p.bullets.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                        {p.projectIds?.[0] && (
                            <p className="resume_walk print-hidden">
                                <Link to={`/projects/${p.projectIds[0]}`}>See animated walkthrough →</Link>
                            </p>
                        )}
                    </div>
                ))}
            </Section>

            <Section title="Education">
                {education.map((e) => (
                    <div className="resume_entry" key={`${e.institution}-${e.degree}`}>
                        <h3 className="resume_h3">{e.degree}, {e.field}</h3>
                        <p className="resume_meta">
                            {e.institution} · {e.location} · {e.period} · {e.score}
                        </p>
                    </div>
                ))}
            </Section>

            <Section title="Technical Skills">
                <dl className="resume_skills">
                    {profile.resumeSkills.map((s) => (
                        <div className="resume_skill_row" key={s.category}>
                            <dt>{s.category}</dt>
                            <dd>{s.items.join(', ')}</dd>
                        </div>
                    ))}
                </dl>
            </Section>
        </article>
    </main>
);

export default Resume;

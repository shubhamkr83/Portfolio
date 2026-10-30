import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdSend } from 'react-icons/md';
import { profile } from '../../../data/profile';
import { fadeUp, stagger } from '../../../motion/variants';
import "./contactSection.css";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_READY = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: '', email: '', subject: '', message: '' };

const validate = (v) => {
    const errors = {};
    if (!v.name.trim()) errors.name = 'Please enter your name.';
    if (!v.email.trim()) errors.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Please enter a valid email address.';
    if (!v.subject.trim()) errors.subject = 'Please enter a subject.';
    if (!v.message.trim()) errors.message = 'Please write a message.';
    return errors;
};

const buildMailto = (v) => {
    const subject = encodeURIComponent(v.subject.trim());
    const body = encodeURIComponent(`${v.message.trim()}\n\n${v.name.trim()}\n${v.email.trim()}`);
    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
};

const FIELDS = [
    { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
    { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off' },
];

const ContactSection = ({ headingLevel = 2 }) => {
    const Heading = `h${headingLevel}`;
    const [values, setValues] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState(null); // { type: 'success' | 'error' | 'mailto', text }
    const [failedMailto, setFailedMailto] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sending) return;
        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length) {
            setResult(null);
            return;
        }

        if (!EMAILJS_READY) {
            window.location.href = buildMailto(values);
            setResult({ type: 'mailto', text: 'Your message opens in your mail app. Press send there to deliver it.' });
            return;
        }

        const fallback = buildMailto(values);
        setSending(true);
        setResult(null);
        emailjs
            .send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: values.name.trim(),
                    reply_to: values.email.trim(),
                    subject: values.subject.trim(),
                    message: values.message.trim(),
                },
                PUBLIC_KEY
            )
            .then(() => {
                setResult({ type: 'success', text: 'Message sent successfully! I will get back to you soon.' });
                setValues(EMPTY);
            })
            .catch(() => {
                setFailedMailto(fallback);
                setResult({ type: 'error', text: 'Sorry, your message could not be sent.' });
            })
            .finally(() => setSending(false));
    };

    return (
        <section className="cs_section" id="contact">
            <motion.div
                className="cs_container"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.div className="cs_info" variants={fadeUp}>
                    <Heading className="cs_title">Get in touch</Heading>
                    <p className="cs_lead">
                        Hiring for QA automation, or have a testing problem to solve? Send a message and I will reply soon.
                    </p>
                    <ul className="cs_actions">
                        <li>
                            <a href={`mailto:${profile.email}`} className="cs_action">
                                <MdEmail aria-hidden="true" /> <span>{profile.email}</span>
                            </a>
                        </li>
                        <li>
                            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="cs_action">
                                <FaLinkedin aria-hidden="true" /> <span>LinkedIn</span>
                            </a>
                        </li>
                        <li>
                            <a href={profile.links.github} target="_blank" rel="noreferrer" className="cs_action">
                                <FaGithub aria-hidden="true" /> <span>GitHub</span>
                            </a>
                        </li>
                        <li>
                            <span className="cs_action cs_action_static">
                                <MdLocationOn aria-hidden="true" /> <span>{profile.location}</span>
                            </span>
                        </li>
                    </ul>
                </motion.div>

                <motion.form className="cs_form" onSubmit={handleSubmit} noValidate variants={fadeUp}>
                    {FIELDS.map((f) => (
                        <div className="cs_field" key={f.name}>
                            <label htmlFor={`cs_${f.name}`}>{f.label}</label>
                            <input
                                id={`cs_${f.name}`}
                                name={f.name}
                                type={f.type}
                                autoComplete={f.autoComplete}
                                value={values[f.name]}
                                onChange={handleChange}
                                disabled={sending}
                                aria-invalid={Boolean(errors[f.name])}
                                aria-describedby={errors[f.name] ? `cs_${f.name}_err` : undefined}
                            />
                            {errors[f.name] && <span className="cs_error" id={`cs_${f.name}_err`}>{errors[f.name]}</span>}
                        </div>
                    ))}
                    <div className="cs_field">
                        <label htmlFor="cs_message">Message</label>
                        <textarea
                            id="cs_message"
                            name="message"
                            rows="6"
                            value={values.message}
                            onChange={handleChange}
                            disabled={sending}
                            aria-invalid={Boolean(errors.message)}
                            aria-describedby={errors.message ? 'cs_message_err' : undefined}
                        />
                        {errors.message && <span className="cs_error" id="cs_message_err">{errors.message}</span>}
                    </div>

                    <button type="submit" className="cs_submit" disabled={sending}>
                        {sending ? (
                            <>
                                <span className="cs_spinner" aria-hidden="true" />
                                <span>Sending...</span>
                            </>
                        ) : (
                            <>
                                <span>{EMAILJS_READY ? 'Send message' : 'Open in mail app'}</span>
                                <MdSend aria-hidden="true" />
                            </>
                        )}
                    </button>

                    {!EMAILJS_READY && !result && (
                        <p className="cs_note">This opens your mail app with the message prefilled.</p>
                    )}

                    <div role="status" aria-live="polite" className="cs_result_wrap">
                        {result && (
                            <p className={`cs_result cs_result_${result.type}`}>
                                {result.text}
                                {result.type === 'error' && (
                                    <>
                                        {' '}
                                        <a href={failedMailto}>Email me directly instead</a>.
                                    </>
                                )}
                            </p>
                        )}
                    </div>
                </motion.form>
            </motion.div>
        </section>
    );
};

export default ContactSection;

import React from 'react';
import "aos/dist/aos.css";
import "./about.css";

const About = () => {
    const experiences = [
        {
            id: 1,
            role: "QA Engineer, Navo (Formaly Bizup)",
            period: "(Dec 2024 - Present)",
            achievements: [
                "Engineered an automation framework, reducing manual testing hours by 60% and increasing test coverage by 40%.",
                "Streamlined Jenkins CI/CD pipelines for automated test execution, slashing deployment time by 25%.",
                "Leveraged S3 for test data storage and data-driven testing (JSON/CSV), cutting manual verification by 70%."
            ]
        },
        {
            id: 2,
            role: "QA Engineer, Thriwe",
            period: "(Aug 2024 - Nov 2024)",
            achievements: [
                "Constructed end-to-end web automation framework using Python and Playwright for reliable and scalable testing.",
                "Implemented test coverage for login, signup, and user flows with validations; Scripted page verification to ensure correct URLs and navigation."
            ]
        },
        {
            id: 3,
            role: "QA Executive, Bizup",
            period: "(Sept 2023 - June 2024)",
            achievements: [
                "Aligned QA strategies with Head of Engineering and Product teams, and improving deployment efficiency by 25%.",
                "Ensured zero critical bugs in 2 flagship releases, contributing to 20% revenue growth, and validated 5+ cross-platform products (Android, Web, API)."
            ]
        }
    ];

    return (
        <>
            {/* Intro Section */}
            <section className="experience_intro_section">
                <div className="intro_container">
                    <h2 data-aos='zoom-in' className="intro_title">Professional Experience</h2>
                    <p data-aos='fade-up' className="intro_description">
                        QA Automation Engineer with hands-on experience building scalable automation frameworks across Web, Android, and API platforms. Proven expertise in Playwright, Selenium, Appium, and CI/CD pipelines, achieving up to 60% reduction in manual testing effort and 40% boost in test coverage. Skilled in Jenkins-driven automation, AWS S3 reporting, and data-driven testing to enhance release quality and deployment efficiency. Adept at collaborating with cross-functional teams to deliver zero-critical-bug releases and support fast-paced product launches. Passionate about strengthening software reliability through smart test architecture and continuous automation improvement.
                    </p>
                </div>
            </section>

            {/* Experience Timeline Section */}
            <section className="experience_section" id="experience">
                <div className="experience_center">
                    <h2 data-aos='zoom-in' className="section_heading">Work Experience</h2>

                    <div className="timeline">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp.id}
                                className="timeline_item"
                                data-aos='fade-up'
                                data-aos-delay={index * 150}
                            >
                                <div className="timeline_marker"></div>
                                <div className="timeline_content">
                                    <div className="experience_header">
                                        <h3 className="experience_role">{exp.role}</h3>
                                        <span className="experience_period">{exp.period}</span>
                                    </div>
                                    <ul className="experience_achievements">
                                        {exp.achievements.map((achievement, idx) => (
                                            <li key={idx}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
};

export default About;
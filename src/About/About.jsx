import React, { useEffect } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import "./about.css";

const About = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease-in-out',
        });
    }, []);

    const stats = [
        { id: 1, icon: '🎯', value: '60%', label: 'Faster Testing' },
        { id: 2, icon: '📊', value: '40%', label: 'Test Coverage' },
        { id: 3, icon: '🚀', value: '25%', label: 'Deployment Speed' },
        { id: 4, icon: '✨', value: '0', label: 'Critical Bugs' }
    ];

    const experiences = [
        {
            id: 1,
            company: "Navo",
            companyNote: "(Formerly Bizup)",
            role: "QA Engineer",
            period: "Dec 2024 - Present",
            icon: "💼",
            achievements: [
                "Engineered an automation framework, reducing manual testing hours by 60% and increasing test coverage by 40%.",
                "Streamlined Jenkins CI/CD pipelines for automated test execution, slashing deployment time by 25%.",
                "Leveraged S3 for test data storage and data-driven testing (JSON/CSV), cutting manual verification by 70%."
            ]
        },
        {
            id: 2,
            company: "Thriwe",
            companyNote: "",
            role: "QA Engineer",
            period: "Aug 2024 - Nov 2024",
            icon: "🔧",
            achievements: [
                "Constructed end-to-end web automation framework using Python and Playwright for reliable and scalable testing.",
                "Implemented test coverage for login, signup, and user flows with validations; Scripted page verification to ensure correct URLs and navigation."
            ]
        },
        {
            id: 3,
            company: "Bizup",
            companyNote: "",
            role: "QA Executive",
            period: "Sept 2023 - June 2024",
            icon: "⚡",
            achievements: [
                "Aligned QA strategies with Head of Engineering and Product teams, and improving deployment efficiency by 25%.",
                "Ensured zero critical bugs in 2 flagship releases, contributing to 20% revenue growth, and validated 5+ cross-platform products (Android, Web, API)."
            ]
        }
    ];

    return (
        <section className="about_section" id="about">
            <div className="about_container">
                {/* Section Header */}
                <div className="section_header" data-aos='zoom-in'>
                    <h1 className="about_title">Professional Journey</h1>
                    <p className="about_subtitle">
                        QA Automation Engineer with hands-on experience building scalable automation frameworks across Web, Android, and API platforms. Proven expertise in Playwright, Selenium, Appium, and CI/CD pipelines.
                    </p>
                    <div className="title_underline"></div>
                </div>

                {/* Stats Section */}
                <div className="stats_container" data-aos='fade-up'>
                    {stats.map((stat, index) => (
                        <div 
                            key={stat.id} 
                            className="stat_card"
                            data-aos='zoom-in'
                            data-aos-delay={index * 100}
                        >
                            <div className="stat_icon">{stat.icon}</div>
                            <div className="stat_value">{stat.value}</div>
                            <div className="stat_label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Experience Timeline */}
                <div className="experience_wrapper">
                    <h2 className="experience_heading" data-aos='fade-up'>Work Experience</h2>
                    
                    <div className="timeline_container">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp.id}
                                className="experience_card"
                                data-aos='fade-up'
                                data-aos-delay={index * 150}
                            >
                                <div className="card_header">
                                    <div className="company_info">
                                        <div className="company_icon">{exp.icon}</div>
                                        <div className="company_details">
                                            <h3 className="company_name">
                                                {exp.company}
                                                {exp.companyNote && <span className="company_note">{exp.companyNote}</span>}
                                            </h3>
                                            <p className="role_title">{exp.role}</p>
                                        </div>
                                    </div>
                                    <div className="period_badge">{exp.period}</div>
                                </div>
                                
                                <div className="card_body">
                                    <ul className="achievements_list">
                                        {exp.achievements.map((achievement, idx) => (
                                            <li key={idx} className="achievement_item">
                                                <span className="achievement_bullet">▸</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
};

export default About;
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
            icon: "/image/navo.png",
            website: "https://navofashion.in/",
            achievements: [
                "Engineered API automation framework with 56 test files covering 40+ endpoints, reducing manual testing by 60%.",
                "Built Android automation (Appium) for 3 app versions with BrowserStack integration.",
                "Architected Jenkins CI/CD pipelines with AWS S3 reports and Allure dashboards, cutting deployment time by 25%.",
                "Automated Android APK/AAB builds with secure code signing and SHA256 integrity verification.",
                "Designed production health monitoring for websites with SSL validation, geo-tracking, and Twilio alerts.",
                "Implemented data-driven testing with AWS S3, achieving 95%+ success rate."
            ]
        },
        {
            id: 2,
            company: "Thriwe",
            companyNote: "",
            role: "QA Engineer",
            period: "Aug 2024 - Nov 2024",
            icon: "/image/thriwe.png",
            website: "https://thriwe.com/",
            achievements: [
                "Built production-ready web automation framework using Python and Playwright with modular architecture.",
                "Implemented comprehensive test coverage for critical user journeys (login, signup, user flows).",
                "Developed reusable components and validations for scalable testing solutions.",
                "Created page verification scripts ensuring correct URLs, navigation flows, and UI element integrity.",
                "Delivered detailed test reports, increasing release confidence and reducing post-deployment defects.",
                "Collaborated with development teams to identify bugs early in the development cycle."
            ]
        },
        {
            id: 3,
            company: "Bizup",
            companyNote: "",
            role: "QA Executive",
            period: "Sept 2023 - June 2024",
            icon: "/image/bizup.png",
            website: "https://bizup.app/",
            achievements: [
                "Aligned QA strategies with Engineering/Product teams, improving deployment efficiency by 25%.",
                "Ensured zero critical bugs in 2 flagship releases, contributing to 20% revenue growth.",
                "Validated 5+ cross-platform products (Android, Web, API) through manual and exploratory testing.",
                "Led end-to-end testing cycles including regression, smoke, and user acceptance testing.",
                "Performed extensive API testing using Postman for REST endpoints and authentication flows.",
                "Managed defect lifecycle in Jira with detailed reproduction steps and severity tracking."
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
                                        <div className="company_icon">
                                            <img src={exp.icon} alt={`${exp.company} logo`} />
                                        </div>
                                        <div className="company_details">
                                            <h3 className="company_name">
                                                <a href={exp.website} target="_blank" rel="noopener noreferrer">
                                                    {exp.company}
                                                </a>
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
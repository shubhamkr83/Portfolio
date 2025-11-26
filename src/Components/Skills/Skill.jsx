import React, { useEffect, useMemo } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import Test_Automation, { CI_CD_Cloud, API_Testing, Programming, Database, Others } from './TechData.jsx';
import "./skill.css";

// Reusable SkillCategory component to reduce duplication
const SkillCategory = ({ title, skills }) => (
    <div className="skill_category_section">
        <h2 data-aos='fade-up' className="tech_title">{title}</h2>
        <div className="tech_grid">
            {skills.map(({ id, image, name }) => (
                <div data-aos='zoom-in' data-aos-delay={id * 50} className="tech" key={id}>
                    <img src={image} alt={name} />
                    <h2>{name}</h2>
                </div>
            ))}
        </div>
    </div>
);

const Skill = () => {
    // Initialize AOS once on mount
    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease-in-sine',
        });
    }, []);

    // Memoize skill categories configuration to prevent re-creation on every render
    const skillCategories = useMemo(() => [
        { title: 'Web & Mobile Automation', skills: Test_Automation },
        { title: 'API Testing', skills: API_Testing },
        { title: 'CI/CD & Cloud', skills: CI_CD_Cloud },
        { title: 'Programming Languages', skills: Programming },
        { title: 'Database', skills: Database },
        { title: 'Other Tools', skills: Others }
    ], []);

    return (
        <section className="skill_section">
            <h1 data-aos='zoom-in' className="skill_title">Technical Skills</h1>
            <div className="tech_center">
                {skillCategories.map((category, index) => (
                    <SkillCategory
                        key={index}
                        title={category.title}
                        skills={category.skills}
                    />
                ))}
            </div>
        </section>
    );
};

export default Skill;

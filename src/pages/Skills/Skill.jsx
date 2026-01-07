import React, { useEffect, useMemo } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import Test_Automation, { CI_CD_Cloud, API_Testing, Programming, Database, Others } from '../../data/skillsData';
import "./skill.css";

// Reusable SkillCategory component with enhanced design
const SkillCategory = ({ title, skills, icon, delay }) => (
    <div className="skill_category_wrapper" data-aos='fade-up' data-aos-delay={delay}>
        <div className="category_header">
            <div className="category_icon">{icon}</div>
            <h2 className="category_title">{title}</h2>
            <div className="category_count">{skills.length} Skills</div>
        </div>
        <div className="skills_grid">
            {skills.map(({ id, image, name }, index) => (
                <div 
                    data-aos='zoom-in' 
                    data-aos-delay={delay + (index * 50)} 
                    className="skill_card" 
                    key={id}
                >
                    <div className="skill_image_wrapper">
                        <img src={image} alt={name} className="skill_image" />
                        <div className="skill_overlay"></div>
                    </div>
                    <h3 className="skill_name">{name}</h3>
                </div>
            ))}
        </div>
    </div>
);

const Skill = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease-in-out',
        });
    }, []);

    // Enhanced skill categories with icons
    const skillCategories = useMemo(() => [
        { 
            title: 'Web & Mobile Automation', 
            skills: Test_Automation,
            icon: '🤖',
            delay: 0
        },
        { 
            title: 'API Automation Testing', 
            skills: API_Testing,
            icon: '🔌',
            delay: 100
        },
        { 
            title: 'CI/CD & Cloud', 
            skills: CI_CD_Cloud,
            icon: '☁️',
            delay: 200
        },
        { 
            title: 'Programming Languages', 
            skills: Programming,
            icon: '💻',
            delay: 300
        },
        { 
            title: 'Database', 
            skills: Database,
            icon: '🗄️',
            delay: 400
        },
        { 
            title: 'Other Tools', 
            skills: Others,
            icon: '🛠️',
            delay: 500
        }
    ], []);

    return (
        <section className="skill_section">
            <div className="skill_container">
                {/* Section Header */}
                <div className="section_header" data-aos='zoom-in'>
                    <h1 className="skill_title">Technical Skills</h1>
                    <p className="skill_subtitle">
                        Expertise in modern automation frameworks, testing tools, and technologies
                    </p>
                    <div className="title_underline"></div>
                </div>

                {/* Skills Categories */}
                <div className="categories_container">
                    {skillCategories.map((category, index) => (
                        <SkillCategory
                            key={index}
                            title={category.title}
                            skills={category.skills}
                            icon={category.icon}
                            delay={category.delay}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skill;

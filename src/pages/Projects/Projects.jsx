import React from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import { useEffect } from 'react';
import ProjectData from "../../data/projectsData";
import "./project.css";
import { BsGithub } from 'react-icons/bs';
import { MdArrowForward } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <section className="project_section" id="projects">
            <div className="project_container_wrapper">
                {/* Section Header */}
                <div className="section_header" data-aos='zoom-in'>
                    <h1 className="project_title">Projects & Automation Frameworks</h1>
                    <p className="project_subtitle">
                        A collection of automation frameworks, testing solutions, and development projects showcasing expertise in QA automation and software development
                    </p>
                    <div className="title_underline"></div>
                </div>

                {/* Projects Grid */}
                <div className="project_grid">
                    {ProjectData.map((elem, index) => {
                        const { id, name, image, git, category } = elem;

                        return (
                            <div 
                                className='project_card' 
                                key={id}
                                data-aos='fade-up'
                                data-aos-delay={index * 100}
                            >
                                <div className="project_image_wrapper" onClick={() => navigate(`/projects/${id}`)}>
                                    <img src={image} alt={name} className="project_image" />
                                    <div className="project_overlay">
                                        <div className="overlay_content">
                                            <MdArrowForward className="arrow_icon" />
                                            <p>View Project Details</p>
                                        </div>
                                    </div>
                                    {category && <span className="project_badge">{category}</span>}
                                </div>
                                
                                <div className="project_content">
                                    <h3 className="project_name">{name}</h3>
                                    
                                    <div className='project_actions'>
                                        <button
                                            className='project_action_button project_details_button'
                                            onClick={() => navigate(`/projects/${id}`)}
                                        >
                                            <span>View Details</span>
                                            <MdArrowForward className="button_arrow" />
                                        </button>
                                        <a href={git} target="_blank" rel="noreferrer">
                                            <button className='project_action_button project_github_button'>
                                                <BsGithub />
                                                <span>Source Code</span>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;
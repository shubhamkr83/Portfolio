import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProjectData from '../../data/projectsData';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { BsGithub, BsArrowLeft, BsChevronLeft, BsChevronRight, BsPlayFill, BsPauseFill } from 'react-icons/bs';
import { RiLiveLine } from 'react-icons/ri';
import { BiCategory } from 'react-icons/bi';
import './projectDetail.css';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showPlayPause, setShowPlayPause] = useState(false);
    const videoRef = useRef(null);
    
    // Find the project by id
    const project = ProjectData.find(p => p.id === parseInt(id));

    // Get images array - support both single image and multiple images
    const images = project ? (Array.isArray(project.images) ? project.images : [project.image]) : [];

    // Helper function to check if URL is a direct video file
    const isDirectVideo = (url) => {
        return url?.endsWith('.mp4') || url?.endsWith('.webm');
    };

    // Helper function to check if URL is a Google Drive video
    const isGoogleDriveVideo = (url) => {
        return url?.includes('drive.google.com') && (url?.includes('/file/d/') || url?.includes('/preview'));
    };

    // Helper function to check if URL is any type of video
    const isVideoUrl = (url) => {
        return isDirectVideo(url) || isGoogleDriveVideo(url);
    };

    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease-in-out',
        });
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, [id]);

    // Sync video play/pause state with actual video events
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => {
            setIsVideoPlaying(true);
        };

        const handlePause = () => {
            setIsVideoPlaying(false);
        };

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, [currentImageIndex]); // Re-attach when video changes

    // Auto-scroll carousel every 5 seconds
    useEffect(() => {
        if (images.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length, isPaused]);

    const goToPrevious = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    const toggleVideoPlayback = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsVideoPlaying(true);
            } else {
                videoRef.current.pause();
                setIsVideoPlaying(false);
                // Show pause icon briefly when pausing
                setShowPlayPause(true);
                setTimeout(() => setShowPlayPause(false), 600);
            }
        }
    };

    // If project not found, show error message
    if (!project) {
        return (
            <div className="project_detail_error">
                <h2>Project Not Found</h2>
                <p>The project you're looking for doesn't exist.</p>
                <Link to="/projects" className="back_link">
                    <BsArrowLeft /> Back to Projects
                </Link>
            </div>
        );
    }

    const { name, image, git, live, category } = project;

    // Get related projects (same category, excluding current project)
    const relatedProjects = ProjectData.filter(
        p => p.category === category && p.id !== project.id
    ).slice(0, 3);

    return (
        <div className="project_detail_section">
            {/* Breadcrumb Navigation and Back Button */}
            <div className="breadcrumb_container" data-aos="fade-down">
                <div className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="separator">/</span>
                    <Link to="/projects">Projects</Link>
                    <span className="separator">/</span>
                    <span className="current">{name}</span>
                </div>
                <button className="back_button" onClick={() => navigate('/projects')}>
                    <BsArrowLeft /> Back to Projects
                </button>
            </div>

            {/* Project Hero Section */}
            <div className="project_hero">
                <div className="project_hero_content">
                    <h1 className="project_detail_title">{name}</h1>
                    <div className="project_category">
                        <BiCategory />
                        <span>{category}</span>
                    </div>
                </div>
            </div>

            {/* Project Image Carousel */}
            <div 
                className="project_image_carousel" 
                data-aos="zoom-in" 
                data-aos-delay="200"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="carousel_container">
                    {/* Check if current item is video or image */}
                    {isDirectVideo(images[currentImageIndex]) ? (
                    // Direct video files (.mp4, .webm)
                        <div className="video_wrapper" onClick={toggleVideoPlayback}>
                            <video 
                                ref={videoRef}
                                src={images[currentImageIndex]} 
                                className="carousel_image" 
                                controls
                                muted 
                                loop
                                playsInline
                            />
                            {/* Custom Play/Pause Overlay - Single container */}
                            {!isVideoPlaying && (
                                <div className="video_play_pause_overlay">
                                    {showPlayPause ? (
                                        <BsPauseFill className="play_pause_icon pause_animation" />
                                    ) : (
                                        <BsPlayFill className="play_pause_icon" />
                                    )}
                                </div>
                            )}
                        </div>
                    ) : isGoogleDriveVideo(images[currentImageIndex]) ? (
                        // Google Drive video embeds
                        <div className="video_wrapper">
                            <iframe
                                src={images[currentImageIndex]}
                                className="carousel_iframe"
                                allow="autoplay"
                                allowFullScreen
                                title={`${name} - Video ${currentImageIndex + 1}`}
                            />
                        </div>
                    ) : (
                                // Regular images
                        <img 
                            src={images[currentImageIndex]} 
                            alt={`${name} - Image ${currentImageIndex + 1}`} 
                            className="carousel_image" 
                        />
                    )}
                    <div className="image_overlay"></div>
                    
                    {/* Navigation Arrows - only show if multiple images */}
                    {images.length > 1 && (
                        <>
                            <button className="carousel_arrow carousel_arrow_left" onClick={goToPrevious}>
                                <BsChevronLeft />
                            </button>
                            <button className="carousel_arrow carousel_arrow_right" onClick={goToNext}>
                                <BsChevronRight />
                            </button>
                        </>
                    )}
                </div>

                {/* Navigation Dots - only show if multiple images */}
                {images.length > 1 && (
                    <div className="carousel_dots">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel_dot ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => goToImage(index)}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            

            {/* Project Description Section */}
            <div className="project_description" data-aos="fade-up" data-aos-delay="400">
                <h2>Project Details</h2>
                
                {/* Overview */}
                <div className="description_section">
                    <h3>Overview</h3>
                    <p>
                        {project.overview || `${name} is a ${category.toLowerCase()} project that demonstrates modern 
                        web development practices and clean code architecture. This project showcases responsive design, 
                        user-friendly interface, and optimal performance.`}
                    </p>
                </div>

                {/* Features */}
                <div className="description_section">
                    <h3>Features</h3>
                    <ul className="features_list">
                        {project.features && project.features.length > 0 ? (
                            project.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))
                        ) : (
                            <>
                                <li>Responsive and mobile-friendly design</li>
                                <li>Modern UI/UX principles</li>
                                <li>Optimized performance</li>
                                <li>Clean and maintainable code</li>
                                <li>Cross-browser compatibility</li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Project Structure */}
                {project.structure && (
                    <div className="description_section">
                        <h3>Project Structure</h3>
                        <p>{project.structure}</p>
                    </div>
                )}

                {/* Jenkins Pipeline Flow */}
                {project.pipelineFlow && (
                    <div className="description_section pipeline_flow_section">
                        <h3>Jenkins Pipeline Flow</h3>

                        {/* Pipeline Stages - Chevron Design */}
                        {project.pipelineFlow.stages && (
                            <div className="pipeline_stages">
                                <h4 className="pipeline_subtitle">CI/CD Pipeline Stages</h4>
                                <div className="chevron_pipeline">
                                    {project.pipelineFlow.stages.map((stage, index) => (
                                        <div key={index} className={`chevron_stage chevron_stage_${index % 6}`}>
                                            <div className="chevron_content">
                                                <span className="chevron_text">{stage}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="feedback_arrow">
                                    <span>← Production Feedback</span>
                                </div>
                            </div>
                        )}

                        {/* Post-Build Actions - Badge Style */}
                        {project.pipelineFlow.postBuild && (
                            <div className="pipeline_postbuild">
                                <h4 className="pipeline_subtitle">Post-Build Actions</h4>
                                <div className="postbuild_badges">
                                    {project.pipelineFlow.postBuild.map((action, index) => (
                                        <div key={index} className={`postbuild_badge_item postbuild_${action.toLowerCase()}`}>
                                            {action}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Testing Information */}
                {project.testing && (
                    <div className="description_section testing_section">
                        <h3>Testing Information</h3>

                        {/* Test Types */}
                        {project.testing.testTypes && project.testing.testTypes.length > 0 && (
                            <div className="testing_subsection">
                                <h4>Test Types</h4>
                                <div className="testing_badges">
                                    {project.testing.testTypes.map((type, index) => (
                                        <span key={index} className="testing_badge test_type_badge">{type}</span>
                                    ))}
                                </div>
                            </div>
                        )}


                        {/* App Versions / API Targets */}
                        {(project.testing.appVersions && project.testing.appVersions.length > 0) ||
                            (project.testing.apiTargets && project.testing.apiTargets.length > 0) ? (
                            <div className="testing_subsection">
                                <h4>{project.testing.appVersions ? "App Versions" : "API Targets"}</h4>
                                <div className="testing_badges">
                                    {(project.testing.appVersions || project.testing.apiTargets).map((item, index) => (
                                        <span key={index} className="testing_badge app_version_badge">{item}</span>
                                    ))}
                                </div>
                            </div>
                        ) : null}


                        {/* Test Areas */}
                        {project.testing.testAreas && project.testing.testAreas.length > 0 && (
                            <div className="testing_subsection">
                                <h4>Test Areas</h4>
                                <div className="testing_badges">
                                    {project.testing.testAreas.map((area, index) => (
                                        <span key={index} className="testing_badge test_area_badge">{area}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Test Profiles */}
                        {project.testing.profiles && project.testing.profiles.length > 0 && (
                            <div className="testing_subsection">
                                <h4>Test Profiles</h4>
                                <div className="testing_badges">
                                    {project.testing.profiles.map((profile, index) => (
                                        <span key={index} className="testing_badge test_profile_badge">{profile}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Tools Used */}
                {project.tools && project.tools.length > 0 && (
                    <div className="description_section">
                        <h3>Tools Used</h3>
                        <div className="tools_tags">
                            {project.tools.map((tool, index) => (
                                <span key={index} className="tool_tag">{tool}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Project Actions */}
                <div className="project_actions_inline">
                    <a href={git} target="_blank" rel="noreferrer" className="detail_action_button detail_git_action">
                        <BsGithub />
                        <span>View Source Code</span>
                    </a>
                </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <div className="related_projects" data-aos="fade-up" data-aos-delay="500">
                    <h2>Related Projects</h2>
                    <div className="related_grid">
                        {relatedProjects.map((relatedProject) => (
                            <div 
                                key={relatedProject.id} 
                                className="related_card"
                                onClick={() => navigate(`/projects/${relatedProject.id}`)}
                            >
                                <div className="related_image">
                                    <img src={relatedProject.image} alt={relatedProject.name} />
                                    <div className="related_overlay">
                                        <span>View Details</span>
                                    </div>
                                </div>
                                <h3>{relatedProject.name}</h3>
                                <p className="related_category">{relatedProject.category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;

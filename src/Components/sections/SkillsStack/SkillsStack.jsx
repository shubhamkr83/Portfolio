import React from 'react';
import { motion } from 'framer-motion';
import Test_Automation, {
    API_Testing, Reporting, CI_CD_Cloud, Build_Tools, Database, Others, Programming,
} from '../../../data/skillsData';
import { fadeUp, scaleIn, stagger } from '../../../motion/variants';
import './SkillsStack.css';

// Top of the stack (closest to the product) down to the foundation.
const layers = [
    { id: 'ui', title: 'Web & Mobile Automation', skills: Test_Automation },
    { id: 'api', title: 'API Testing', skills: API_Testing },
    { id: 'report', title: 'Reporting & Logging', skills: Reporting },
    { id: 'cicd', title: 'CI/CD & Cloud', skills: CI_CD_Cloud },
    { id: 'build', title: 'Build Tools', skills: Build_Tools },
    { id: 'data', title: 'Database', skills: Database },
    { id: 'tools', title: 'Tooling', skills: Others },
    { id: 'lang', title: 'Programming Languages', skills: Programming },
];

// skillsData paths are relative ("../image/x.png"); the files live in public/image.
const imageSrc = (path) => encodeURI(path.replace(/^(\.\.\/)+/, '/'));

const SkillsStack = ({ headingLevel = 2 }) => {
    const Heading = `h${headingLevel}`;
    const LayerHeading = `h${headingLevel + 1}`;
    const total = layers.reduce((sum, layer) => sum + layer.skills.length, 0);

    return (
        <section className="stack_section" id="skills" aria-labelledby="stack_title">
            <div className="stack_inner">
                <motion.header
                    className="stack_header"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                >
                    <p className="stack_eyebrow">// {total} tools · {layers.length} layers</p>
                    <Heading id="stack_title" className="stack_title">The automation stack</Heading>
                    <p className="stack_subtitle">
                        From the languages underneath to the suites that drive real devices and browsers.
                    </p>
                </motion.header>

                <div className="stack_body">
                    <div className="stack_axis" aria-hidden="true">
                        <span>Product-facing</span>
                        <span className="stack_axis_line" />
                        <span>Foundation</span>
                    </div>

                    <motion.ol
                        className="stack_layers"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        style={{ '--stack-count': layers.length }}
                    >
                        {layers.map((layer, index) => (
                            <motion.li
                                key={layer.id}
                                className="stack_layer"
                                variants={fadeUp}
                                style={{ '--stack-index': index }}
                            >
                                <div className="stack_layer_head">
                                    <span className="stack_layer_index" aria-hidden="true">
                                        L{layers.length - index}
                                    </span>
                                    <LayerHeading className="stack_layer_title">{layer.title}</LayerHeading>
                                </div>
                                <motion.ul className="stack_chips" variants={stagger}>
                                    {layer.skills.map(({ id, image, name }) => (
                                        <motion.li key={id} className="stack_chip" variants={scaleIn}>
                                            <img src={imageSrc(image)} alt="" loading="lazy" />
                                            <span>{name}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.li>
                        ))}
                    </motion.ol>
                </div>
            </div>
        </section>
    );
};

export default SkillsStack;

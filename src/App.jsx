import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from "./Components/Navbar/Navbar";
import Layout from './Components/Layout/Layout';
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Skills from "./pages/Skills/Skill";
import Projects from "./pages/Projects/Projects";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import Contact from "./pages/Contact/Contact";
import Resume from "./pages/Resume/Resume";
import NotFound from "./pages/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";

// Same logic as the pre-paint script in index.html.
const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (e) { /* storage unavailable */ }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const App = () => {

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const themeToggler = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) { /* storage unavailable */ }
  };

  return (
    <MotionConfig reducedMotion="user">
      <Navbar theme={theme} themeToggler={themeToggler} />
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="resume" element={<Resume />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MotionConfig>
  );
};

export default App;

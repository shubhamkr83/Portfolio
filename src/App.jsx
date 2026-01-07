import React, { useState } from 'react';
import Navbar from "./components/Navbar/Navbar";
import Layout from './components/Layout/Layout';
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Skills from "./pages/Skills/Skill";
import Projects from "./pages/Projects/Projects";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import Contact from "./pages/Contact/Contact";
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyle } from './styles/theme';
import { Routes, Route } from "react-router-dom";


const StyledApp = styled.div``;

const App = () => {

  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <StyledApp>
        <>
          <Navbar theme={theme} themeToggler={themeToggler} />
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="skills" element={<Skills />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </>
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
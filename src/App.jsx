import React, { useState } from 'react';
import Navbar from "./Components/Navbar/Navbar";
import MainHeader from './MainHeader';
import Home from "./Home/Home";
import About from "./About/About";
import Skills from "./Components/Skills/Skill";
import Projects from "./Components/Projects/Projects";
import ProjectDetail from "./Components/Projects/ProjectDetail";
import Contact from "./Contact/Contact";
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyle } from './Components/theme';
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
            <Route path="/" element={<MainHeader />} >
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
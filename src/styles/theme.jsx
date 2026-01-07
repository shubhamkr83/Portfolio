import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
    body: "#fff",
    fontColor: "#000",
};
export const darkTheme = {
    backgroundColor: "#000",
    fontColor: "#ffff",
    homeFontColor: "#f5f5f5",
    boxShadow: "none",
    secondary_color: "#0084F1",
    boxShadow2: "-7px 6px 18px 2px #0084F1",
    filter: "drop-shadow(0 0 0 rgb(0, 0, 0))",
    projectBg: "#333333",
    backgroundImage: "none",
};

export const GlobalStyle = createGlobalStyle`
body {
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.fontColor};
}

${'' /* ------- home section ------------ */}
.greeting p{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#666"};
}
.last_name{
    color: ${props => props.theme.fontColor === "#ffff" ? "#f5f5f5" : "var(--title_color)"};
}
.role{
    color: ${props => props.theme.fontColor === "#ffff" ? "#ddd" : "#383737"};
}
.tagline{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#555"};
}
.social_label{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#666"};
}
.social_icon{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.15)" : "rgba(0, 132, 241, 0.1)"};
}
.social_icon .MuiSvgIcon-root{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "var(--secondary_color)"};
}
.floating_card{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(50, 50, 50, 0.95)" : "rgba(255, 255, 255, 0.95)"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.3)" : "rgba(0, 132, 241, 0.2)"};
}
.card_text{
    color: ${props => props.theme.fontColor === "#ffff" ? "#ddd" : "#333"};
}
.scroll_indicator p{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#666"};
}
.mouse{
    border-color: ${props => props.theme.secondary_color || "var(--secondary_color)"};
}
.wheel{
    background: ${props => props.theme.secondary_color || "var(--secondary_color)"};
}

${'' /* ------- Skill section ------------ */}
.skill_section .center_section .card{
    background-color: ${props => props.theme.projectBg};
    color: ${props => props.theme.fontColor};
    box-shadow: ${props => props.theme.boxShadow};
}
.skill_subtitle{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#666"};
}
.skill_category_wrapper{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.15)" : "rgba(0, 132, 241, 0.1)"};
}
.skill_category_wrapper:hover{
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.4)" : "rgba(0, 132, 241, 0.3)"};
}
.category_header{
    border-bottom-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.15)" : "rgba(0, 132, 241, 0.1)"};
}
.category_icon{
    background: ${props => props.theme.projectBg === "#333333" ? "linear-gradient(135deg, rgba(0, 132, 241, 0.2), rgba(39, 31, 140, 0.2))" : "linear-gradient(135deg, rgba(0, 132, 241, 0.15), rgba(39, 31, 140, 0.15))"};
}
.category_title{
    color: ${props => props.theme.fontColor === "#ffff" ? "#f5f5f5" : "var(--primary_color)"};
}
.category_count{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#666"};
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.15)" : "rgba(0, 132, 241, 0.1)"};
}
.skill_card{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.15)" : "rgba(0, 132, 241, 0.1)"};
}
.skill_image_wrapper{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.05)"};
}
.skill_card:hover .skill_image_wrapper{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.15)" : "rgba(0, 132, 241, 0.1)"};
}
.skill_name{
    color: ${props => props.theme.fontColor === "#ffff" ? "#ddd" : "#333"};
}

${'' /* ------- About section ------------ */}
.about_subtitle{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#666"};
}
.stat_card{
    background: ${props => props.theme.projectBg === "#333333" ? "linear-gradient(135deg, rgba(0, 132, 241, 0.08), rgba(39, 31, 140, 0.08))" : "linear-gradient(135deg, rgba(0, 132, 241, 0.05), rgba(39, 31, 140, 0.05))"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.2)" : "rgba(0, 132, 241, 0.15)"};
}
.stat_label{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#666"};
}
.experience_card{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.2)" : "rgba(0, 132, 241, 0.15)"};
}
.card_header{
    border-bottom-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.15)" : "rgba(0, 132, 241, 0.1)"};
}
.company_icon{
    background: ${props => props.theme.projectBg === "#333333" ? "linear-gradient(135deg, rgba(0, 132, 241, 0.2), rgba(39, 31, 140, 0.2))" : "linear-gradient(135deg, rgba(0, 132, 241, 0.15), rgba(39, 31, 140, 0.15))"};
}
.company_name{
    color: ${props => props.theme.fontColor === "#ffff" ? "#f5f5f5" : "var(--primary_color)"};
}
.company_note{
    color: ${props => props.theme.fontColor === "#ffff" ? "#888" : "#666"};
}
.role_title{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#555"};
}
.period_badge{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.15)" : "rgba(0, 132, 241, 0.1)"};
}
.achievement_item{
    color: ${props => props.theme.fontColor === "#ffff" ? "#bbb" : "#555"};
}

${'' /* ------- Technology section ------------ */}
.tech_section .tech_center .tech img{
    box-shadow: ${props => props.theme.boxShadow2};
}
.tech_section .tech_center .tech h2{
    color: ${props => props.theme.fontColor};
}

${'' /* -------- Project Section ---------------- */}
.project_section{
    background-color: ${props => props.theme.projectBg};
}
.project_subtitle{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#666"};
}
.project_card{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.15)" : "rgba(0, 132, 241, 0.1)"};
}
.project_card:hover{
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.4)" : "rgba(0, 132, 241, 0.3)"};
}
.project_name{
    color: ${props => props.theme.fontColor === "#ffff" ? "#f5f5f5" : "var(--primary_color)"};
}
.github_button{
    background: ${props => props.theme.projectBg === "#333333" ? "#1a1d21" : "#24292e"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "#1a1d21" : "#24292e"};
}
.github_button:hover{
    background: ${props => props.theme.projectBg === "#333333" ? "#000" : "#000"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "#000" : "#000"};
}

${'' /* -------- Contact Section ---------------- */}
.contact_section{
    background-image: ${props => props.theme.backgroundImage};
}
.contact_subtitle{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#666"};
}
.info_card{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.2)" : "rgba(0, 132, 241, 0.1)"};
}
.info_details h3{
    color: ${props => props.theme.fontColor};
}
.info_details p{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#666"};
}
.social_section{
    background: ${props => props.theme.projectBg === "#333333" ? "linear-gradient(135deg, rgba(0, 132, 241, 0.15), rgba(39, 31, 140, 0.15))" : "linear-gradient(135deg, rgba(0, 132, 241, 0.1), rgba(39, 31, 140, 0.1))"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.3)" : "rgba(0, 132, 241, 0.2)"};
}
.social_section h3{
    color: ${props => props.theme.fontColor};
}
.social_link{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.3)" : "rgba(0, 132, 241, 0.2)"};
}
.social_link .MuiSvgIcon-root{
    color: ${props => props.theme.fontColor === "#ffff" ? "#aaa" : "#666"};
}
.contact_form_wrapper{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.2)" : "rgba(0, 132, 241, 0.1)"};
}
.form_input, .form_textarea{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)"};
    border-color: ${props => props.theme.projectBg === "#333333" ? "rgba(0, 132, 241, 0.3)" : "rgba(0, 132, 241, 0.2)"};
    color: ${props => props.theme.fontColor};
}
.form_input::placeholder, .form_textarea::placeholder{
    color: ${props => props.theme.fontColor === "#ffff" ? "#777" : "#888"};
}

${'' /* -------- Project Detail Section ---------------- */}
.project_detail_section{
    background-color: ${props => props.theme.projectBg};
}
.breadcrumb_container{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(50, 50, 50, 0.9)" : "rgba(255, 255, 255, 0.9)"};
}
.breadcrumb a, .breadcrumb .current{
    color: ${props => props.theme.fontColor};
}
.project_description{
    background: ${props => props.theme.projectBg === "#333333" ? "rgba(50, 50, 50, 0.95)" : "rgba(255, 255, 255, 0.95)"};
}
.project_description h2, .project_description h3{
    color: ${props => props.theme.fontColor};
}
.description_content p, .tech_highlights li{
    color: ${props => props.theme.fontColor === "#ffff" ? "#ccc" : "#555"};
}
.related_card{
    background: ${props => props.theme.projectBg === "#333333" ? "#444" : "#fff"};
}
.related_card h3{
    color: ${props => props.theme.fontColor};
}

`;
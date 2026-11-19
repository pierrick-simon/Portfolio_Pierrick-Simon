// Unique content of the home page: header, About, skills, CV and contact.
export const profile = {
  header: {
    title: "Pierrick Simon",
    subtitle: "Développeur Fullstack | Étudiant à Epitech Paris",
  },
  about: {
    paragraphs: [
      "Étudiant en 3ᵉ année à Epitech Paris (Promo 2029), en formation d’Expert en Ingénierie Logicielle.",
      "Actuellement en recherche d’un stage de 4 à 5 mois, d’avril à août 2027, dans le développement logiciel.",
      "En parallèle de mes études, je travaille toujours à temps partiel en tant qu’Assistant Pédagogique à Epitech Paris, où j’accompagne et encadre les étudiants de première année dans leur apprentissage de la programmation.",
    ],
    missionsTitle: "Missions principales",
    missions: [
      "Accompagnement pédagogique en programmation (C, algorithmique, structures de données)",
      "Support technique et aide à la résolution de problèmes sur les projets",
      "Animation de sessions de travail collaboratif et de code reviews",
      "Mentorat sur l’organisation, les bonnes pratiques de développement et la gestion de projet",
    ],
    previous: {
      label: "Expérience précédente :",
      text: "Stage développeur IA chez ENGIE (août - décembre 2025), avec le développement d’agents IA, de serveurs MCP et d’une application full stack.",
    },
  },
  facts: [
    { label: "Formation", value: "Epitech Paris - Promo 2029" },
    { label: "Recherche", value: "Stage de 4 à 5 mois, avril - août 2027" },
    { label: "Poste actuel", value: "Assistant Pédagogique, Epitech Paris" },
    { label: "Localisation", value: "Île-de-France" },
    { label: "Langues", value: "Français (natif) · Anglais (C1)" },
  ],
  skills: [
    { label: "Développement", items: ["C++", "C", "Python", "FastAPI", "Rust", "React", "JavaScript"] },
    { label: "Technologies", items: ["Git", "API REST", "Okta", "Model Context Protocol", "Shell", "Docker", "Linux"] },
    { label: "Soft skills", items: ["Pédagogie", "Communication", "Travail collaboratif", "Autonomie", "Sens de l’organisation"] },
  ],
  cv: "CV-PierrickSimon.pdf",
  // `icon` refers to an SVG in the Contact section of Home.js.
  contact: [
    { icon: "mail", text: "pierrick.simon@epitech.eu", url: "mailto:pierrick.simon@epitech.eu" },
    { icon: "phone", text: "+33 6 02 63 38 06" },
    { icon: "linkedin", text: "pierrick-simon", url: "https://www.linkedin.com/in/pierrick-simon/" },
    { icon: "github", text: "pierrick-simon", url: "https://github.com/pierrick-simon" },
  ],
};

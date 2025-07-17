
export const panels = [
  {
    title: "ADULTS CLASSES",
    subtitle: "Striking for Self Defence",
    image: "https://defend-km.co.uk/wp-content/uploads/2023/03/cambridge-krav-maga-self-defence1.webp",
    path: "/photo-journal"
  },
  {
    title: "TEENS CLASSES",
    subtitle: "Self Defence for ages 11-15",
    image: "https://defend-km.co.uk/wp-content/uploads/2023/03/cambridge-krav-maga-self-defence4.webp",
    path: "/iphone-sketches"
  },
  {
    title: "WOMENS KICKBOXING",
    subtitle: "Women Only Classes",
    image: "https://defend-km.co.uk/wp-content/uploads/2024/02/Kickboxing-women-classes-cambridge.jpg",
    path: "/sketches"
  },
];

// Update menu items to use the exact panel titles
export const menuItems = panels.map(panel => panel.title);
// Update menu paths to use the panel paths
export const menuPaths = panels.map(panel => panel.path || '#');

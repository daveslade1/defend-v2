
export const panels = [
  {
    title: "ADULTS CLASSES",
    subtitle: "Striking for Self Defence",
    image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/02/photo-32-scaled.jpg",
    path: "/photo-journal"
  },
  {
    title: "TEENS CLASSES",
    subtitle: "Self Defence for ages 11-15",
    image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/02/photo-18-scaled.jpg",
    path: "/iphone-sketches"
  },
  {
    title: "WOMENS KICKBOXING",
    subtitle: "Women Only Classes",
    image: "/lovable-uploads/0f7521e1-9769-426b-a02f-924c23a17cbb.png",
    path: "/sketches"
  },
];

// Update menu items to use the exact panel titles
export const menuItems = panels.map(panel => panel.title);
// Update menu paths to use the panel paths
export const menuPaths = panels.map(panel => panel.path || '#');

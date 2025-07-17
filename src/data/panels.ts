
export const panels = [
  {
    title: "Adult Class",
    subtitle: "Striking for Self Defence",
    image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/02/photo-32-scaled.jpg",
    path: "/photo-journal"
  },
  {
    title: "IPHONE",
    subtitle: "sketches",
    image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/02/photo-18-scaled.jpg",
    path: "/iphone-sketches"
  },
  {
    title: "SKETCHES",
    subtitle: "drawings",
    image: "/lovable-uploads/0f7521e1-9769-426b-a02f-924c23a17cbb.png",
    path: "/sketches"
  },
  {
    title: "PHOTOS",
    subtitle: "my favourites",
    image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/03/Screenshot-2025-03-06-at-22.16.46.png",
    path: "/photos"
  },
  {
    title: "PAINTINGS",
    subtitle: "experiments",
    image: "https://jamiemarsland.co.uk/wp-content/uploads/2024/06/cliff.jpg",
    path: "/paintings"
  },
  {
    title: "TRAVELS",
    subtitle: "world map",
    image: "https://jamiemarsland.co.uk/wp-content/uploads/2025/02/photo-29-scaled.jpg",
    path: "/world-map"
  },
  {
    title: "WRITINGS",
    subtitle: "my thoughts",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    path: "/writings"
  },
];

// Update menu items to use the exact panel titles
export const menuItems = panels.map(panel => panel.title);
// Update menu paths to use the panel paths
export const menuPaths = panels.map(panel => panel.path || '#');

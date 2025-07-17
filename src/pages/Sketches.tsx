
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import SketchLightbox from "@/components/sketches/SketchLightbox";

const Sketches = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSketchIndex, setSelectedSketchIndex] = useState<number | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const sketches = [
    {
      id: 1,
      src: "/lovable-uploads/0f7521e1-9769-426b-a02f-924c23a17cbb.png",
      title: "Landscape Sketch",
      description: "Mountain landscape with detailed topography and structures"
    },
    {
      id: 2,
      src: "/lovable-uploads/0d4f9970-d626-4e8e-aeed-f156752fbc67.png",
      title: "Mountain Valley",
      description: "Rolling hills and valley landscape study"
    },
    {
      id: 3,
      src: "/lovable-uploads/a24836c4-32b1-48bd-9b4e-38fb33ed394c.png",
      title: "Alpine Vista",
      description: "Detailed mountain range with layered terrain and vegetation"
    },
    {
      id: 4,
      src: "/lovable-uploads/c6bf2c22-1c29-43b3-9006-542223e4235e.png",
      title: "City Architecture",
      description: "Urban cityscape with modern and traditional buildings"
    },
    {
      id: 5,
      src: "/lovable-uploads/c014848e-fa97-44f9-96ba-5c1253cdb4e8.png",
      title: "Interior Study",
      description: "Bedroom interior with detailed shading and perspective"
    }
  ];

  const handleSketchClick = (index: number) => {
    setSelectedSketchIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedSketchIndex(null);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (selectedSketchIndex === null) return;
    
    if (direction === 'prev' && selectedSketchIndex > 0) {
      setSelectedSketchIndex(selectedSketchIndex - 1);
    } else if (direction === 'next' && selectedSketchIndex < sketches.length - 1) {
      setSelectedSketchIndex(selectedSketchIndex + 1);
    }
  };

  // Rotation angles for each sketch (reduced for subtlety)
  const rotations = [-1, 1.5, -0.5, 1, -1.5];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sketches - Jamie Marsland</title>
        <meta name="description" content="A collection of architectural and landscape sketches exploring form, space, and perspective." />
      </Helmet>
      
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu 
        isMenuOpen={isMenuOpen}
        onMenuItemClick={() => setIsMenuOpen(false)}
      />

      <main 
        className={`w-full md:w-[calc(100vw-120px)] min-h-screen transition-transform duration-300 ${
          isMenuOpen 
            ? 'translate-x-full md:translate-x-[300px]' 
            : 'translate-x-0'
        } ${
          'md:ml-[120px]'
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Sketches</h1>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            A collection of architectural and landscape drawings exploring form, space, and perspective through traditional sketching techniques.
          </p>

          <div className="space-y-16">
            {sketches.map((sketch, index) => (
              <div
                key={sketch.id}
                className="group relative cursor-pointer"
                onClick={() => handleSketchClick(index)}
                style={{
                  transform: `rotate(${rotations[index]}deg)`,
                }}
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={sketch.src}
                      alt={sketch.title}
                      className="w-full h-full object-contain transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {sketch.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {sketch.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <SketchLightbox
        sketches={sketches}
        selectedIndex={selectedSketchIndex}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default Sketches;

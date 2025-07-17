
import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import { useIphoneSketches } from "@/hooks/useIphoneSketches";
import { toast } from "@/components/ui/use-toast";

const IphoneSketches = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: sketches, isLoading, error } = useIphoneSketches();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fallback sketches in case the API call fails
  const fallbackSketches = [
    {
      id: 1,
      src: "https://mlkwtxmsxa0d.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2021/11/IMG_7217.jpg",
      title: "Architectural Sketch 1",
      description: "Digital architectural exploration using iPhone"
    },
    {
      id: 2,
      src: "https://mlkwtxmsxa0d.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2021/11/IMG_7160-1.jpg",
      title: "Architectural Sketch 2",
      description: "Urban landscape study on iPhone"
    },
    {
      id: 3,
      src: "https://mlkwtxmsxa0d.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2022/01/IMG_8708.jpg",
      title: "Architectural Sketch 3",
      description: "Building perspective study using iPhone"
    }
  ];

  // Show a toast when there's an error
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error loading sketches",
        description: "Using fallback images instead.",
        variant: "destructive",
      });
    }
  }, [error]);

  // Get images from WordPress or fallback to static images
  const displaySketches = sketches?.length 
    ? sketches.map(sketch => ({
        id: sketch.id,
        src: sketch._embedded?.["wp:featuredmedia"]?.[0]?.source_url || '',
        title: sketch.title.rendered,
        description: sketch.content.rendered.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'
      }))
    : fallbackSketches;

  // Filter out any sketches without images
  const filteredSketches = displaySketches.filter(sketch => sketch.src);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu isMenuOpen={isMenuOpen} />

      <main 
        className={`w-full md:w-[calc(100vw-120px)] min-h-screen transition-transform duration-300 ${
          isMenuOpen 
            ? 'translate-x-full md:translate-x-[300px]' 
            : 'translate-x-0'
        } ${
          'md:ml-[120px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">iPhone Sketches</h1>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            A collection of architectural and artistic sketches created on iPhone, exploring the intersection of technology and creativity.
          </p>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3, 4, 5, 6].map((_, idx) => (
                <div key={idx} className="relative w-[280px] h-[580px] rounded-[45px] bg-card/50 animate-pulse">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-background/80 rounded-b-[20px]"></div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-red-500 mb-6">
              Error loading sketches. Using fallback images instead.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredSketches.map((sketch) => (
              <div
                key={sketch.id}
                className="group relative mx-auto"
              >
                {/* iPhone Frame */}
                <div className="relative w-[280px] h-[580px] rounded-[45px] bg-card shadow-xl p-3 overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-background rounded-b-[20px] z-10"></div>
                  {/* Screen */}
                  <div className="relative w-full h-full rounded-[35px] overflow-hidden bg-background">
                    <img
                      src={sketch.src}
                      alt={sketch.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Simple Hover Effect - No Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default IphoneSketches;


import { ArrowRight } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoError = () => {
    console.log("Video failed to load");
    setVideoError(true);
  };

  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
  };

  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <img
        src="/lovable-uploads/aef48cf2-81b2-425c-8d70-5dfa23c6fb2f.png"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      
      
      <div className="relative container mx-auto h-full flex items-center">
        <div className="max-w-2xl space-y-6 animate-fade-up">
          <span className="inline-block px-3 py-1 bg-accent text-sm font-medium rounded-full">
            Professional Athlete
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
            Excellence Through Dedication
          </h1>
          <p className="text-lg text-white/90 max-w-lg">
            Discover the journey, achievements, and ongoing pursuit of excellence in professional sports.
          </p>
          <button className="group flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-lg hover:bg-accent transition-colors duration-300">
            Latest Updates
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          {/* Debug info - remove this once video is working */}
          <div className="text-xs text-white/60">
            Video loaded: {videoLoaded ? 'Yes' : 'No'} | Error: {videoError ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

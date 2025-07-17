
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://defend-km.co.uk/wp-content/uploads/2025/06/AQP67w-7xKgnNzZs98Sc0-Ifd1yug3BYpL-gjOvcR4Z7T9hA8WZZ6NiPtdF1LrSm2Ot7PoHFHIXGxnK-A7z6XNouZxHAkBf0jmAx3c2TGCohMw.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
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
        </div>
      </div>
    </div>
  );
};

export default Hero;

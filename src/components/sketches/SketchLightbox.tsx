
import { Dialog, DialogPortal } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Sketch {
  id: number;
  src: string;
  title: string;
  description: string;
}

interface SketchLightboxProps {
  sketches: Sketch[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const SketchLightbox = ({ sketches, selectedIndex, onClose, onNavigate }: SketchLightboxProps) => {
  if (selectedIndex === null) return null;

  const currentSketch = sketches[selectedIndex];
  if (!currentSketch) return null;

  return (
    <Dialog open={selectedIndex !== null} onOpenChange={onClose}>
      <DialogPortal>
        <div className="fixed inset-0 z-50">
          <div 
            className="relative flex items-center justify-center w-full h-full backdrop-blur-xl bg-black/80 cursor-pointer"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous button */}
            {selectedIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('prev');
                }}
                className="absolute left-4 z-10 p-4 rounded-full bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 transition-colors"
                aria-label="Previous sketch"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main content */}
            <div className="relative max-w-7xl mx-auto px-4 w-full h-full flex flex-col items-center justify-center">
              <div className="relative max-w-full max-h-[80vh] mb-4">
                <img
                  src={currentSketch.src}
                  alt={currentSketch.title}
                  className="max-w-full max-h-full h-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 max-w-md text-center">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {currentSketch.title}
                </h2>
                <p className="text-white/80">
                  {currentSketch.description}
                </p>
              </div>
            </div>

            {/* Next button */}
            {selectedIndex < sketches.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('next');
                }}
                className="absolute right-4 z-10 p-4 rounded-full bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 transition-colors"
                aria-label="Next sketch"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default SketchLightbox;

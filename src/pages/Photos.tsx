
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import PhotoGrid from "@/components/photos/PhotoGrid";
import PhotoLightbox from "@/components/photo-journal/PhotoLightbox";
import PhotoGridSkeleton from "@/components/photos/PhotoGridSkeleton";
import { usePhotos } from "@/hooks/usePhotos";
import { useToast } from "@/hooks/use-toast";

const Photos = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { data: posts, error, isLoading } = usePhotos();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading photos",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error("Error loading photos:", error);
    }
  }, [error, toast]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!posts || selectedImageIndex === null) return;
    
    if (e.key === 'ArrowRight') {
      setSelectedImageIndex((selectedImageIndex + 1) % posts.length);
    } else if (e.key === 'ArrowLeft') {
      setSelectedImageIndex((selectedImageIndex - 1 + posts.length) % posts.length);
    } else if (e.key === 'Escape') {
      setSelectedImageIndex(null);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, posts]);

  const selectedImage = selectedImageIndex !== null && posts ? posts[selectedImageIndex] : null;

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!posts || selectedImageIndex === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImageIndex + 1) % posts.length
      : (selectedImageIndex - 1 + posts.length) % posts.length;
    setSelectedImageIndex(newIndex);
  };

  const mainContent = (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Photos</h1>
        </div>
        
        {isLoading ? (
          <PhotoGridSkeleton />
        ) : error ? (
          <div className="text-destructive py-12 text-center">
            <p>Error loading photos. Please try again later.</p>
            <pre className="mt-4 text-xs text-muted-foreground">{error.toString()}</pre>
          </div>
        ) : !posts || posts.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            <p>No photos found.</p>
            <p className="mt-2 text-sm">The WordPress API didn't return any photo posts.</p>
          </div>
        ) : (
          <PhotoGrid
            posts={posts}
            onImageClick={(index) => setSelectedImageIndex(index)}
          />
        )}
      </div>

      <PhotoLightbox
        selectedImage={selectedImage}
        selectedImageIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onNavigate={navigateImage}
      />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
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
        {mainContent}
      </main>
    </div>
  );
};

export default Photos;

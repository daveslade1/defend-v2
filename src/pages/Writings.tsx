import { useWritings } from "@/hooks/useWritings";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import WritingsLayout from "@/components/writings/WritingsLayout";
import WritingsList from "@/components/writings/WritingsList";
import WritingDetail from "@/components/writings/WritingDetail";
import { createSlug, findPostBySlug } from "@/utils/slugUtils";

interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  link: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

const Writings = () => {
  const { data: posts, isLoading, error } = useWritings();
  const [selectedPost, setSelectedPost] = useState<WordPressPost | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { postId } = useParams(); // This will now be a slug
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle URL-based post selection using slug
  useEffect(() => {
    if (postId && posts) {
      const post = findPostBySlug(posts, postId);
      if (post) {
        setSelectedPost(post);
      } else {
        // Post not found, redirect to writings list
        navigate('/writings', { replace: true });
      }
    } else if (!postId) {
      setSelectedPost(null);
    }
  }, [postId, posts, navigate]);

  const getCurrentPostIndex = () => {
    if (!selectedPost || !posts) return -1;
    return posts.findIndex(post => post.id === selectedPost.id);
  };

  const navigateToPost = (direction: 'prev' | 'next') => {
    if (!posts) return;
    
    const currentIndex = getCurrentPostIndex();
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : posts.length - 1;
    } else {
      newIndex = currentIndex < posts.length - 1 ? currentIndex + 1 : 0;
    }

    const newPost = posts[newIndex];
    const slug = createSlug(newPost.title.rendered);
    navigate(`/writings/${slug}`);
  };

  const handleBackToList = () => {
    navigate('/writings');
  };

  const handleSelectPost = (post: WordPressPost) => {
    const slug = createSlug(post.title.rendered);
    navigate(`/writings/${slug}`);
  };

  if (error) {
    return (
      <WritingsLayout 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu}
        title="Writings - Jamie Marsland"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Writings</h1>
          <div className="text-center text-muted-foreground">
            <p>Sorry, there was an error loading the writings.</p>
            <p className="text-sm mt-2">Please try again later.</p>
          </div>
        </div>
      </WritingsLayout>
    );
  }

  if (selectedPost) {
    return (
      <WritingsLayout 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu}
        title={`${selectedPost.title.rendered} - Jamie Marsland`}
        onMenuItemClick={handleBackToList}
      >
        <WritingDetail
          post={selectedPost}
          posts={posts}
          isMenuOpen={isMenuOpen}
          onBack={handleBackToList}
          onNavigate={navigateToPost}
        />
      </WritingsLayout>
    );
  }

  return (
    <WritingsLayout 
      isMenuOpen={isMenuOpen} 
      toggleMenu={toggleMenu}
      title="Writings - Jamie Marsland"
      description="My thoughts and writings on various topics"
    >
      <h1 className="text-4xl font-bold mb-2 text-center">Writings</h1>
      <p className="text-muted-foreground text-center mb-12">My thoughts and musings</p>
      
      <WritingsList
        posts={posts}
        isLoading={isLoading}
        onSelectPost={handleSelectPost}
      />
    </WritingsLayout>
  );
};

export default Writings;

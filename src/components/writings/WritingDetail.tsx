
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ExternalLink, Calendar, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

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

interface WritingDetailProps {
  post: WordPressPost;
  posts?: WordPressPost[];
  isMenuOpen: boolean;
  onBack: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const WritingDetail = ({ post, posts, isMenuOpen, onBack, onNavigate }: WritingDetailProps) => {
  return (
    <>
      {/* Navigation Arrows */}
      {posts && posts.length > 1 && (
        <>
          <button
            onClick={() => onNavigate('prev')}
            className={`fixed top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white border border-gray-200 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl ${
              isMenuOpen ? 'left-[440px]' : 'left-4 md:left-[140px]'
            }`}
            aria-label="Previous post"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button
            onClick={() => onNavigate('next')}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 hover:bg-white border border-gray-200 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
            aria-label="Next post"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </>
      )}
      
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Writings
        </button>
        
        {post._embedded?.['wp:featuredmedia']?.[0] && (
          <div className="aspect-video rounded-lg overflow-hidden mb-8">
            <img
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <h1 
          className="text-4xl font-bold mb-6"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="h-12 w-12 border-2 border-gray-200 shadow-sm">
            <AvatarImage 
              src="/lovable-uploads/e66d0a83-ebcf-49e0-b191-7e8ee455a99d.png" 
              alt="Jamie Marsland"
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
              JM
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">Jamie Marsland</span>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.date), 'MMM dd, yyyy')}
            </div>
          </div>
        </div>
        
        <div 
          className="prose prose-lg max-w-none [&>p]:mb-4 [&>p]:leading-relaxed [&_p]:mb-4 [&_p]:leading-relaxed prose-p:mb-4 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
        
        <div className="mt-8 pt-8 border-t">
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View original post
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </>
  );
};

export default WritingDetail;

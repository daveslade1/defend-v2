
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
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

interface WritingCardProps {
  post: WordPressPost;
  onSelect: (post: WordPressPost) => void;
}

const WritingCard = ({ post, onSelect }: WritingCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
      <div onClick={() => onSelect(post)}>
        <CardHeader>
          {post._embedded?.['wp:featuredmedia']?.[0] && (
            <div className="aspect-video rounded-md overflow-hidden mb-4">
              <img
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardTitle 
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <CardDescription className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {format(new Date(post.date), 'MMM dd, yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div 
            className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
          <div className="text-sm font-medium text-primary">
            Read More →
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default WritingCard;

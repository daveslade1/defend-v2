
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import WritingCard from "./WritingCard";

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

interface WritingsListProps {
  posts?: WordPressPost[];
  isLoading: boolean;
  onSelectPost: (post: WordPressPost) => void;
}

const WritingsList = ({ posts, isLoading, onSelectPost }: WritingsListProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-full">
            <CardHeader>
              <Skeleton className="h-48 w-full rounded-md mb-4" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts && posts.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No writings found at the moment.</p>
        <p className="text-sm mt-2">Check back later for new posts!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post) => (
        <WritingCard
          key={post.id}
          post={post}
          onSelect={onSelectPost}
        />
      ))}
    </div>
  );
};

export default WritingsList;

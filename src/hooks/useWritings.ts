
import { useQuery } from "@tanstack/react-query";

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

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
}

const fetchWritingsCategoryId = async (): Promise<number | null> => {
  const response = await fetch(
    'https://www.pootlepress.com/wp-json/wp/v2/categories?search=writings'
  );
  
  if (!response.ok) {
    console.log('Failed to fetch categories');
    return null;
  }
  
  const categories: WordPressCategory[] = await response.json();
  const writingsCategory = categories.find(cat => cat.slug === 'writings' || cat.name.toLowerCase() === 'writings');
  
  return writingsCategory?.id || null;
};

const fetchWritings = async (): Promise<WordPressPost[]> => {
  // First get the category ID
  const categoryId = await fetchWritingsCategoryId();
  
  if (!categoryId) {
    console.log('Writings category not found');
    return [];
  }
  
  console.log('Found writings category ID:', categoryId);
  
  // Then fetch posts with the numeric category ID
  const response = await fetch(
    `https://www.pootlepress.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=20`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch writings');
  }
  
  return response.json();
};

export const useWritings = () => {
  return useQuery({
    queryKey: ['writings'],
    queryFn: fetchWritings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

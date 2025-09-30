import { useEffect } from 'react';

interface UsePageTitleProps {
  title: string;
  description?: string;
}

export const usePageTitle = ({ title, description }: UsePageTitleProps) => {
  useEffect(() => {
    document.title = title;
    
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      }
    }
  }, [title, description]);
};

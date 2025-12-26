export interface LandingData {
  id: number;
  title: string;
  description: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}




export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  [key: string]: FilterOption[];
}

export interface SearchFilterProps {
  placeholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: FilterConfig;
  activeFilters?: Record<string, string>;
  onFilterChange?: (filterKey: string, value: string) => void;
  className?: string;
}

export interface CardTableProps<T> {
   data: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  cardsPerRow: number;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}


export interface TableWrapperCard {
  id: string;
  author: string;
  tag: string;
  img: string;
  title: string;
  views: number;
  growth: number;
}


export interface ScrollyItem {
  _id: string;
  title: string;
  author?: string;
  status: string;
  category: string;
  description: string;
  featured: number;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScrollyMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ScrollyResponse {
  items: ScrollyItem[];
  meta: ScrollyMeta;
}

export interface ScrollyParams {
  limit?: number;
  page?: number;
  q?: string;
  status?: string | null;
 startDate?: string;
 featured?: 0 | 1;
  endDate?: string;
}

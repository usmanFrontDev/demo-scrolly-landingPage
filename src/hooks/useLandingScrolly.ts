import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getScrollys } from "../api/services/getScrollys";

interface UseScrollysOptions {
  page?: number;
  limit?: number;
  q?: string;
  status?: string | null;
  startDate?: string;
  endDate?: string;
  featured?: 0 | 1;
}

export const useScrollys = (options?: UseScrollysOptions) => {
  const { 
    page = 1, 
    limit = 20, 
    q, 
    status, 
    startDate, 
    endDate,
    featured 
  } = options ?? {};

  return useQuery({
    queryKey: ["scrollys", { page, limit, q, status, startDate, endDate, featured }],
    queryFn: () =>
      getScrollys({
        page,
        limit,
        q: q || undefined,
        status: status || undefined,
        startDate,
        endDate,
        featured: 0,
      }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useRecentScrollys = () => {
  return useQuery({
    queryKey: ["scrollys", "recent"],
    queryFn: () => getScrollys({ page: 1, limit: 7, featured: 1 }),
    staleTime: 1000 * 60 * 5,
  });
};
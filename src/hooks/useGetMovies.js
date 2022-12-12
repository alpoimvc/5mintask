import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPopularMovies, searchTitle } from '../api/moviesApi';

export function useGetMovies(searchQuery, title) {
  let queryKey = ['movies', searchQuery];
  let queryFn = ({ pageParam = 1 }) => searchTitle(searchQuery, pageParam);

  if (!searchQuery && !title) {
    queryKey = ['popular'];
    queryFn = ({ pageParam = 1 }) => getPopularMovies(pageParam);
  }

  return useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: lastPage => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    }
  });
}
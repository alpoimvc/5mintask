import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPopularMovies, searchTitle } from '../api/moviesApi';

export function useGetMovies(searchQuery, title) {
  let queryKey = ['movies', searchQuery];
  let queryFn = () => searchTitle(searchQuery);

  if (!searchQuery && !title) {
    queryKey = ['popular'];
    queryFn = () => getPopularMovies();
  }

  return useQuery({
    queryKey,
    queryFn,
  })

  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = 
  // return useInfiniteQuery({
  //   queryKey,
  //   queryFn,
  //   getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  // })


  // return { data, };
}
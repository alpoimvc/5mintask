// hooks/query/useBooks.js
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export default function useSearchMovie(search) {
  console.log("query: ", search);
  return search.length > 0 ? useQuery({
    queryKey: ['searchMovie', search],
    queryFn: () => fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`).then(res =>
      res.json()
    ),
    // initialData: { results: [{}] },
  }) : []
}


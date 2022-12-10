import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MovieDetails from './components/MovieDetails';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "search/:title",
    element: <App />,
  },
  {
    path: "movie/:movieId",
    element: <MovieDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <RouterProvider router={router} />
  </QueryClientProvider>
)

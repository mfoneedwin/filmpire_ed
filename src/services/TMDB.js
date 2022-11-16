import  { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;


// base url = https://api.themoviedb.org/3/

// endpoints = movie/popular?api_key=<<api_key>>&language=en-US&page=1

export const tmdbApi = createApi({
     reducerPath: 'tmdbApi',
     baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3' }),
     endpoints: (builder) => ({

          // get Genres check the movie database endpoints from thr API 
          getGenres: builder.query({
               query:() => `genre/movie/list?api_key=${tmdbApiKey}`
          }),

          // Get Movies By [TYPE] / getMovies query
              getMovies: builder.query({
               // the end point at the end of ? we passe in the page 
               query:({genreIdOrCategoryName, page, searchQuery}) => {
                    // get movie by search.
                    if (searchQuery){
                         return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
                    }

                    // get movies by Category : popular top_rated, upcoming --> string 
                    if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string'){
                        return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
                    }
                    //  get movies by Genre : 12,15,16
                    if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                        return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
                    }
                     // get popular movies
                        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;  
               } 
          })
     })
}) 

export const {
     useGetMoviesQuery,
     useGetGenresQuery,
} = tmdbApi;
import React,{ useState, useEffect } from 'react'
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '..'
import { selectGenereOrCategory } from '../../features/currrentGenreOrCategory'



const Movies = () => {
  const [page, setPage] = useState(1);

  // Getting the movie data on this page
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);    // useSelector to get a slice of data from the API call
  const { data, error, isFetching } = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery});
  
    
  //  for loading
  if(isFetching){
    return(
      <Box display="flex" justifyContent="center">
      <CircularProgress size="4rem"/>
      </Box>
    );
  }
        
  // if no data this  means [! not]

  if(!data.results.length) {
 
    return (
    <Box display="flex" alignItems="center" mt="20px">
    <Typography variant="h4">
      No movies that match that name.
      <br/>
      Please search for somthing else.
    </Typography>
   </Box>
    )
  }

  //  show error
  
  if (error) return 'An error has occurred'

  // console.log(data);

  return (
   <div>
    <MovieList  movies={data}/>
   </div>
  )
}

export default Movies;
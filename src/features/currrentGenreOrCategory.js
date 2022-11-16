
import { createSlice } from '@reduxjs/toolkit'

// we created a redux slice to handle click select genreOrCategory or category
export const genreOrCategory = createSlice({
     name:'genreOrCategory',
     initialState: {
          genreIdOrCategoryName: '',
          page: 1,
          searchQuery: '',
     },
     reducers: {
          selectGenereOrCategory: (state, action) => {
               // console.log (action.payload);
               state.genreIdOrCategoryName = action.payload;
               state.searchQuery = '';
          },
          searchMovie : (state, action) => {
          state.searchQuery = action.payload;
          }
     },
})

export const {selectGenereOrCategory, searchMovie} =  genreOrCategory.actions;

export default genreOrCategory.reducer;
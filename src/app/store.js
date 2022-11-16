import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';
import   genreOrCategoryReducer from '../features/currrentGenreOrCategory'
import   userReducer from '../features/auth'

//  Redux ToolKit call store reducer object local data or API data

export default configureStore({
     reducer: {
          [tmdbApi.reducerPath]: tmdbApi.reducer,
          currentGenreOrCategory: genreOrCategoryReducer,
          user: userReducer,
     },
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});


// when ever we have a reducer we have to attach it to the store.
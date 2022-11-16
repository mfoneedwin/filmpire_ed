import React, {useEffect} from 'react'
import {Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon,Box, CircularProgress} from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/styles'
import useStyles from './styles'
import { useGetGenresQuery } from '../../services/TMDB'
import genresIcons from '../../assets/genres'
import { useDispatch, useSelector } from 'react-redux'
import { selectGenereOrCategory } from '../../features/currrentGenreOrCategory'

const categories = [
     { label: 'Popular', value: 'popular'},
     { label: 'Top Rated', value: 'top_rated'},
     { label: 'Upcoming', value: 'upcoming'},
]

const redLogo = "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png"
const blueLogo = "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a50a.png"

const Sidebar = ({setMobileOpen}) => {
     const {genreIdOrCategoryName} = useSelector((state) => state.currentGenreOrCategory);    // useSelector to get a slice of data from the API call
     const classes = useStyles();
     const theme = useTheme();
     const {data, isFetching} = useGetGenresQuery();  
     const dispatch = useDispatch(); 
     
     // console.log(genreIdOrCategoryName);

  return (
    <>
     <Link to="/" className={classes.imageLink}>
          <img
               className={classes.image}
               src={theme.palette.mode === 'light' ? redLogo : blueLogo}
               alt ="Filmpire logo"
          />
     </Link>
     <Divider/>
     <List>
          <ListSubheader>Categories</ListSubheader>
          {categories.map(({label, value}) => (
             <Link key={value} className={classes.links} to="/" >
             {/* real action call to change the movie id we want to see */}
               <ListItem onClick= {() => dispatch(selectGenereOrCategory(value)) } button>
               <ListItemIcon>
                    <img src={genresIcons[label.toLowerCase()]} className= {classes.genreImages} height={30} alt="redLogo"/>
                  </ListItemIcon>
                  <ListItemText primary={label}/>
               </ListItem>
             </Link>
          ))}
     </List>
     <Divider/>

     <List>
   {/* if we fecting a genre show loading else loop on genres and show individual items */}
          <ListSubheader>Genres</ListSubheader>
          {isFetching ? (
               <Box display="flex" justifyContent="center">
               <CircularProgress />
               </Box>
          )  : data.genres.map(({name, id}) => (
             <Link key={name} className={classes.links} to="/" >
               <ListItem onClick= {() =>  dispatch(selectGenereOrCategory(id)) } button>
                  <ListItemIcon>
                    <img src={genresIcons[name.toLowerCase()]} className={classes.genreImages} height={30} alt="redLogo"/>
                  </ListItemIcon>
                  <ListItemText primary={name}/>
               </ListItem>
             </Link>
          ))}
     </List>
    </>
  )
}

export default Sidebar
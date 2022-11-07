import React from 'react'
import { CssBaseline } from '@mui/material'
import {Route, Routes} from 'react-router-dom'
import { Actors, MovieInformation, Movies, NavBar, Profile} from './'
import useStyles from './styles'

const App = () => {
 
     const classes = useStyles();

     return (
    <div className={classes.root}>
   <CssBaseline/> 
   <NavBar/>
   {/* Switch is main for page navigating */}
   <main className={classes.content} >
       <div className={classes.toolbar} />
       <Routes>
          <Route exact path="/movie/:id" element={MovieInformation}>
         
          </Route>
          <Route exact path="/actors/:id" element={Actors}>
          
          </Route>
          <Route exact path="/" element={Movies}>
         
          </Route>
          <Route exact path="/profile/:id" element={Profile}>
          
          </Route>
       </Routes>
   </main>
    </div>
 )
}


export default App
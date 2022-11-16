import React, {useEffect, useState} from 'react'
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material'
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import {Link} from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'


import { setUser, userSelector} from '../../features/auth'
import { Sidebar, Search } from '..'
import { fetchToken, createSessionId, moviesApi } from '../../utils'
import useStyles from './styles'


const NavBar = () => {

  const { isAuthenticated, user } = useSelector(userSelector )
  
  const [mobileOpen, setMobileOpen] = useState(false)
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)')
  const theme = useTheme();
  const dispatch = useDispatch();

  console.log(user);
  

  const token = localStorage.getItem('request_token')
  const sessionIdFromLocalStorage = localStorage.getItem('session_id')

  // redirect login page in the useeffects
  useEffect (() => {
     const logInUser = async () => {
        if (token) {
          if (sessionIdFromLocalStorage){
            const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);

            dispatch(setUser(userData));
          } else {
             const sessionId = await createSessionId();
             const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
             dispatch(setUser(userData));
          }
        }
     } 
     logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
           {isMobile && (
            <IconButton
            color="inherit"
            edge="start"
            style={{outline: 'none'}}
            onClick={() => setMobileOpen ((prevMobileOpen) => !prevMobileOpen)}
            className={classes.menuButton}
            >
              <Menu />
              {/* toggle dark or light */}
            </IconButton>
           )}
           <IconButton color="inherit" sx={{ml: 1}} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4/>}
           </IconButton>

            {/* if not on mobile show search */}
           {!isMobile && <Search />}

           {/* login Authentication */}
           <div>
            {!isAuthenticated  ? (
              <Button color="inherit" onClick={fetchToken}>
                 Login &nbsp; <AccountCircle/>
              </Button>
              ) : (
                <Button
                 color="inherit"
                 component={Link}
                 to={`/profile/:id`}
                 className={classes.linkButton}
                 onClick={() => {}}
                >
                {!isMobile && <>My Movies &nbsp; </>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt= "profle"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                />
                </Button>
            )}
           </div>
           {/* is mobile */}
           {/* {!isMobile && <search />} */}
        </Toolbar>
      </AppBar>
           
           {/* side navbar call */}
      <div>
         <nav className={classes.drawer}>
            {isMobile ? (
              <Drawer
                 variant="temporary"
                 anchor="right"
                 open={mobileOpen}
                 onClose={() => setMobileOpen ((prevMobileOpen) => !prevMobileOpen)}
                 classes={{ paper: classes.drawerPaper}}
                 ModalProps={{keepMounted: true}}
              >
              <Sidebar setMobileOpen={setMobileOpen}/>
              </Drawer>
               ):(
                   
               <Drawer classes={{paper: classes.drawerPaper}} variant="permanent" open>
                 <Sidebar setMobileOpen={setMobileOpen}/>
               </Drawer>
            )}
         </nav>
      </div>
    </>
  )
}

export default NavBar;
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
      display:'flex',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));
const Navbar = (loggedInUser) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div>
            <div className={classes.root} color={theme.palette.primary.contrastText}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Box width='70%' display='flex' justifyContent='space-evenly'>
                        <NavLink to='/' exact color="inherit">
                                <Typography variant="h6" component='span' style={{color:'white'}}>
                                    Home
                                </Typography>    
                            </NavLink>

                            <NavLink to='/add' exact color="inherit">
                                <Typography variant="h6" component='span' style={{color:'white'}}>
                                    New Question
                                </Typography>    
                            </NavLink>

                            <NavLink to='/leaderboard' exact color="inherit">
                                <Typography variant="h6" component='span' style={{color:'white'}}>
                                    Leaderboard
                                </Typography>    
                            </NavLink> 
                        </Box>
                        <Box display='flex' alignItems='center'>
                        <Typography>Hello {loggedInUser.loggedInUser.name}</Typography>
                        <Box ml={1}><Link to="/logout"><Button color='secondary' variant='contained'>
                            Logout</Button></Link>
                        </Box>
                        </Box>
                           

                        
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    )
};

export default Navbar;
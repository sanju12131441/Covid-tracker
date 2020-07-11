import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor : 'black'
    },
    title: {
      flexGrow: 1,
      display:'flex',
      justifyContent : 'center'
    },
    userName: {
        marginLeft : '0.25rem',
        marginRight : '0.5rem',
        color :'lightGrey'
    }
  }),
);

export default function NavBar({companyName='Company',userName='User'}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            {companyName}
          </Typography>
          <AccountCircleIcon />
          <Typography variant="caption" className={classes.userName}>
            {userName}
          </Typography>
          <ExpandMoreIcon />
        </Toolbar>
      </AppBar>
    </div>
  );
}

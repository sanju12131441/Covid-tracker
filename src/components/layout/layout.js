import React from 'react';
import {
  AppBar,
  CssBaseline,
  Hidden,
  IconButton,
  ListItem,
  Toolbar,
  Typography,
  makeStyles,
  useTheme,
  createStyles,
  List,
  ListItemText,
  Drawer,
} from '@material-ui/core'
import { NavLink } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Router from '../../Router';
import './layout.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: 323242,
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    userName: {
      marginLeft: '0.25rem',
      marginRight: '0.5rem',
      color: 'lightGrey'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      backgroundColor: '#eceff1',
      flexGrow: 1,
      minHeight: '47rem',
      padding: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        minHeight: '64rem',
      },
    },
    title: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center'
    },
    link: {
      color: 'grey',
      fontSize: '0.75rem',
      textDecoration: 'none',
      display: 'block'
    }
  }),
);


export default function ResponsiveDrawer({ companyName = 'Company', userName = 'User', window }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={classes.drawerContainer}>
      <List>
        <NavLink to="/overview" activeClassName="active" className={classes.link}>
          <ListItem button>
            <ListItemText primary={'OVERVIEW'}>
            </ListItemText>
          </ListItem>
        </NavLink>
        <NavLink to="/worldDataIntable" activeClassName="active" className={classes.link}>
          <ListItem button>
            <ListItemText primary={'TABULAR REPRESENTATION'}>
            </ListItemText>
          </ListItem>
        </NavLink>
        <NavLink to="/worldDataInGraph" activeClassName="active" className={classes.link}>
          <ListItem button>
            <ListItemText primary={'GRAPHICHAL REPRESENTATION'}>
            </ListItemText>
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
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
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Toolbar />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router></Router>
      </main>
    </div>
  );
}

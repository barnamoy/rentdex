import React from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './drawer.css'
import store from './../mystore'
import axios from "axios";
const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


class SideDrawer extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.handleclick = this.handleclick.bind(this);
    this.state = {
      link: ['/', '/order', '/login', '/logout', '/aboutus']
    }

  }

  handleDrawerOpen = () => {
    this.setState(true);
  };

  handleDrawerClose = () => {
    console.log("click")
    this.props.store.set('foo')(false);

  };
  handleclick = (path) => {
    console.log('hi')
    this.props.history.push(this.state.link[path]);

  }
  render() {

    return <Drawer

      variant="persistent"
      anchor="left"
      open={this.props.store.get('foo')}

    >
      <div className="top">
        <IconButton onClick={this.handleDrawerClose} >
          <svg className="arrow_img" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" /></svg>
        </IconButton>
      </div>
      <Divider />
      <div className="SBC" >SHOP BY CATEGORY</div>
      <List>
        {['Home', 'My Items', 'Login', 'Logout', 'About us'].map((text, index) => (
          <ListItem button key={index}>
            {/* <ListItemIcon>{index % 2 === 0 ? <a /> : <a />}</ListItemIcon> */}
            <ListItemText primary={text} onClick={() => this.handleclick(index)} />
          </ListItem>
        ))}
      </List>
      <Divider />


    </Drawer>
  }
}
export default withRouter(store.withStore(SideDrawer))
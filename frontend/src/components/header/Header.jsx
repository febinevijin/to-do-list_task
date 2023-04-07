import React from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import './Header.css';
import { Link } from 'react-router-dom';
import NewTask from '../newtask/NewTask';

const Header = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="navbar">
          <Toolbar>
          
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" className="link">
                To-Do Task
              </Link>
            </Typography>
            <Button color="inherit">
              <Link to="/Report" className="link">
                Report
              </Link>
            </Button>

            <Button color="inherit"></Button>

            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header

import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { gmailLogo } from "./../assets/Assets";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { Button, Dialog, IconButton, Tooltip, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import './Header.css'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
const StyledAppBar = styled(AppBar)({
  background: "#f5f5f5",
  boxShadow: "none",
});
const SearchWrapper = styled(Box)({  
  background: "#eaf1fb",
  marginLeft: "60px",
  borderRadius: 19,
  minWidth: 690,
  maxWidth: 720,
  height: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  "& >div": {
    width: "100%",
    padding: "0 10px",
  },
});
const OptionsWrapper=styled(Box)({
  width: "100%",
  display:'flex',
  justifyContent:'end',
  '& > svg ':{
    marginLeft:20,
  }
})
const dialogStyle={
  height:'60%',
    width:'25%',
    borderRadius:"40px",
    marginLeft:"65%",
    marginBottom:"7%",
    backgroundColor:"Whitesmoke",
  }

// eslint-disable-next-line react/prop-types
const HeaderMaterial = ({toggleDrawer}) => {
const navigate=useNavigate();
const logoutFuntion =()=>{

  localStorage.removeItem('user')
  navigate('/login')

}
  const accountEmail = JSON.parse(localStorage.getItem("user"));
  const name=accountEmail.name;
  const emailID = accountEmail.email

 
  const [viewAccount,setViewAccount]=useState(false);
  const handleViewAccount =()=>{
    setViewAccount(true)
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Tooltip title= "Sidebar toggle" >
        <IconButton>
          <MenuIcon color="action" onClick={toggleDrawer}/>
        </IconButton>
        </Tooltip>
        <Tooltip title="Gmail">
        <img
          src={gmailLogo}
          alt="logo"
          style={{ width: 110, marginLeft: 15 }} 
        />
        </Tooltip>
        <SearchWrapper>
          <IconButton>
            <Tooltip title="Search">
            <SearchIcon color="action" />
            </Tooltip>
          </IconButton>
          <InputBase placeholder="Search email"/>
          <Tooltip title="Filter">
          <IconButton>
            <TuneIcon color="action" />
          </IconButton>
          </Tooltip>
        </SearchWrapper>
        <OptionsWrapper>
          <Tooltip title="Help">
        <IconButton>
            <HelpOutlineOutlinedIcon color="action"/>
        </IconButton>
       
        </Tooltip>
        <Tooltip title="Setting">
        <IconButton>
            <SettingsIcon color="action"/>
        </IconButton>
        </Tooltip>
        <Tooltip title="Apps">
        <IconButton>
            <AppsIcon color="action"/>
        </IconButton>
        </Tooltip>
        <Tooltip title="Account">
        <IconButton onClick={()=>handleViewAccount()}>
            <AccountCircleOutlinedIcon color="action"/>
        </IconButton>
        </Tooltip>
        </OptionsWrapper>
      </Toolbar>
      <Dialog
      open={viewAccount}
      PaperProps={{
        sx:dialogStyle
      }}
      >
        <div className="account-box">
          <div className="top-bar">
            <IconButton onClick={()=>setViewAccount(false)}>
               <CloseIcon/>
            </IconButton>
          </div>
          <Typography className="account-email">{emailID}</Typography>

          <div className="border-account">
          <div className="account-container">
            <AccountCircleOutlinedIcon  className="account-icon"/>
            </div>
            <Typography variant="h5" className="account-name"> {name}</Typography>
            </div>
            <div className="account-bottom-container">
               <Button
               onClick={()=>logoutFuntion()}
               className="btn-account" 
               variant="outline" 
               color="success">
                <LogoutIcon/> Logout</Button> 
          </div>
        </div>
      </Dialog>
    </StyledAppBar>
  );
};

export default HeaderMaterial;

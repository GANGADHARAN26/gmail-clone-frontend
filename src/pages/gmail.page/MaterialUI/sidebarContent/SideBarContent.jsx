import { Box } from "@mui/system"
import Button from '@mui/material/Button';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { styled } from "@mui/system";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { SIDEBAR_DATA } from "../config/Sidebar_config";
import ComposeMail from "../composeMail/ComposeMail";
import { useState } from "react";
import {   useNavigate, useParams } from "react-router-dom";
import './SideBarContent.css'
const ComposeButton=styled(Button)({
    background:'#c2e7ff',
    color:'#001d35',
    padding:15,
    borderRadius:16,
    minWidth:140,
    textTransform:'none',
})
const Container =styled(Box)({
  padding:8,
  '& > ul ':{
    padding:'10px 0 0 5px',
    fontSize:14,
    fontWeight:500,
    cursor:'pointer',
  },
  '& > ul > li > svg':{
    marginRight:20
  }
})
const SideBarContent = () => {
  const [openDialog,setOpenDialog]=useState(false);
  const {category}=useParams();
  
  const onComposeClick = () =>{
    setOpenDialog(true)
  }
  const navigate=useNavigate();
  return (
    <Container>
        <ComposeButton onClick={()=>onComposeClick()}>
            <CreateOutlinedIcon/>
            Compose</ComposeButton>
        <List>
         {
            SIDEBAR_DATA.map(data=>(
                // eslint-disable-next-line react/jsx-key
                <ListItem key={data.title} style={category===data.location ? {
                  backgroundColor:'#d3e3fd',
                  borderTopRightRadius:'25px',
                  borderBottomRightRadius:'25px',
                }:{}}
                onClick={()=>navigate(`/main/${data.location}`)}
                className="sidebar-elements"
                >
                       <data.icon fontSize="small"/>{data.title}
                </ListItem>
            ))
         }
        </List>
        <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog}/>
    </Container>
  )
}

export default SideBarContent
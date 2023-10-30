import { Button, IconButton, InputBase, Typography, styled } from "@mui/material"
import Dialog  from "@mui/material/Dialog"
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/system"
import TextField from '@mui/material/TextField';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from "react";
import useApi from "../../hooks/useApi";
import { API_URLS } from "../../services/api.urls";
// import { useState } from "react";
const dialogStyle={
    height:'90%',
    width:'80%',
    maxWidth:'100%',
    maxHeight:'100%',
    boxShadow:'none',
    borderRadius:'10px 10px 0 0'
}
const Header=styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'2px 15px',
    background:'#f2f6f6',
    '& > p ':{
        fontSize:14,
        fontWeight:500
    }
})
const RecipientsWrapper=styled(Box)({
display:'flex',
flexDirection:'column',
padding:'0px 15px',
'& > div ':{
    fontSize:14,
    borderBottom:'1px solid #F5f5f5',
    marginTop:10
}
})
const Footer=styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'10px 15px',
}) 
const SendButton=styled(Button)({
  background:'#0b57d0',
  color:'#FFF',
  fontWeight:500,
  textTransform:'none',
  borderRadius:18,
  width:100 
})

// eslint-disable-next-line react/prop-types
const ComposeMail = ({openDialog,setOpenDialog}) => {
    const [data,setData]=useState({});
    const sentEmailService=useApi(API_URLS.saveSentEmail);
   
    const closeComposeMail=(e)=>{
        e.preventDefault();
        setOpenDialog(false);
        }
        const sendMail=(e)=>{
            e.preventDefault();
            const accountEmail=JSON.parse(localStorage.getItem('user'))
          const payload={
            to:data.to,
            from:accountEmail.email,
            subject:data.subject,
            body:data.body,
            image:'',
            name:accountEmail.name,
            starred:false,
          }
          sentEmailService.call (payload);
          if(!sentEmailService.error){
            setOpenDialog(false)
            setData({});
          }
            setOpenDialog(false);
        }  
        const onValueChange=(e)=>{
            setData({...data,[e.target.name]:e.target.value});
            e.preventDefault();
        }
  return (
    <Dialog
    open={openDialog}
    PaperProps={{
        sx:dialogStyle
    }}
    ><Header>
       <Typography>
          New Message
       </Typography>
       <IconButton onClick={(e)=>closeComposeMail(e)}>
       <CloseIcon fontSize="small" />
       </IconButton>
      
    </Header>
    <RecipientsWrapper>
         <InputBase placeholder="Recipiants" name="to" onChange={(e)=>onValueChange(e)}/>
         <InputBase placeholder="subject" name="subject" onChange={(e)=>onValueChange(e)} />
    
    </RecipientsWrapper>
    <TextField
    multiline
    rows={15}
    sx={{'& .MuiOutlinedInput-notchedOutline':{border:'none'}}}
    onChange={(e)=>onValueChange(e)}
    name="body"
    />
    <Footer>
         <SendButton onClick={(e)=>sendMail(e)}>Send</SendButton>
         <IconButton  onClick={()=>setOpenDialog(false)}>
         <DeleteOutlinedIcon/>
         </IconButton>
       
    </Footer>
    </Dialog>
  )
}

export default ComposeMail
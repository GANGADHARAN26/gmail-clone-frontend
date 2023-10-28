import './ViewEmail.css'
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyIcon from '@mui/icons-material/Reply';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { backendUrl } from '../../../../../config';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
// eslint-disable-next-line react/prop-types
const Subject=styled(Typography)({
  fontSize:22,
  display: 'flex',
})
const Indicator=styled(Box)({
  fontSize:12,
  background:'#ddd',
  color:'#222',
  padding:'2px 4px',
  marginLeft:6,
  borderRadius:4,
  alignSelf:'center',
})
// eslint-disable-next-line react/prop-types
const ViewEmail = ({id}) => { 
  const emaildetails={
    starred:false,
    bin:false,
    readed:false,
    important:false,
    spam:false,
    archived:false
  }

  const [data,setData]=useState([]);
  const [update,setUpdate]=useState(emaildetails)
  const accountEmail = JSON.parse(localStorage.getItem("user"));
  const accessToken=accountEmail.accessToken;
    useEffect(()=>
      {
        const fetchData = async () => {
          const response = await fetch(`${backendUrl}/email/viewemail`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "auth-token":accessToken
            },
            body: JSON.stringify({ _id: id })
          });
      
          if (!response) {
            // Handle the error, e.g., display an error message or log it
            console.error('API Error:', response.status, response.statusText); 
          } else { 
            const details = await response.json();   
            setData(details.data);
            const updatesDetails={
              starred:data.starred, 
              bin:data.bin,
              readed:data.readed,
              important:data.important,
              spam:data.spam, 
              archived:data.archived
            }
            setUpdate(updatesDetails)
            console.log('Updated details:',updatesDetails );
            console.log('update',update)
          }
        };
         
        fetchData();
        console.log(update)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[id,update]) 

      const handleChange =async(e,name)=>{
             e.preventDefault();
             console.log(name);
             setUpdate((prevUpdate)=>({
              ...prevUpdate,
              [name]:!prevUpdate[name],
             }))
             console.log(name)
             console.log('handle update',update)
             try{
              await fetch(`${backendUrl}/email/${name}`,{
                method:'POST',
                headers:{
                  "Content-Type": "application/json",
                  "auth-token":accessToken
                },
                body: JSON.stringify({[name]:!update[name],_id:id})
              })
              console.log({[name]:!update[name]})
             }
             catch(error)
            {
              console.log(error.message)
            }
            
      } 
  return (
    <div className="view-email"> 
      <div className="view-email-topbar">
            <IconButton className='view-icon' onClick={()=>window.history.back()}>
              <Tooltip title="Back">
              <ArrowBackIcon/>  
              </Tooltip>
            </IconButton> 
            <IconButton className='view-icon' onClick={(e)=>handleChange(e,'archived')}>
            <Tooltip title={update.archived?"UnArchive":"Archive"}>
              <ArchiveOutlinedIcon/>
             </Tooltip>
            </IconButton>
             <IconButton className='view-icon' onClick={(e)=>handleChange(e,'spam')}>
            <Tooltip title={update.spam?"UnSpam":"Spam"}>
              <ReportOutlinedIcon/>
              </Tooltip>
            </IconButton> 
            <IconButton className='view-icon' onClick={(e)=>handleChange(e,'bin')}>
              <Tooltip title="Delete">
              <DeleteOutlinedIcon/>
              </Tooltip>
            </IconButton> 
            <IconButton className='view-icon' onClick={(e)=>handleChange(e,'readed')}>
            <Tooltip title={update.readed?"Mark as Readed":"Mark as UnReaded"}>
              <MarkEmailUnreadOutlinedIcon/>
              </Tooltip>
            </IconButton> 
            <IconButton className='view-icon' >
              <Tooltip title="More">
              <MoreVertIcon/>
              </Tooltip>
            </IconButton>
      </div>
      <div className="view-email-container">
        <div className="view-email-container-topbar">
          <div className="view-email-subject">
          <Subject>{data.subject}<Indicator component="span">Inbox</Indicator></Subject> 
          </div>
          <div className="view-email-right-icons">
             <Tooltip title="Print">
            <IconButton>
              <LocalPrintshopOutlinedIcon/>
            </IconButton>
            </Tooltip>
            <Tooltip title="Open in New Window"> 
            <IconButton>
              <OpenInNewOutlinedIcon/>
            </IconButton>
            </Tooltip>

          </div>
        </div>
        <div className="view-email-container-box">
          <div className="container-top-bar">
            <div className="right-side-topic">
            <Typography id="t1">{data.name}&nbsp;
            <Box component="span">&#60;{data.to}&#62;</Box>
            </Typography>
             
            </div>
          <div className="icons">
            <Tooltip title={data.time}>
          <Typography id="t1">{data.time}</Typography>
          </Tooltip>
            <IconButton  onClick={(e)=>handleChange(e,'starred')}>
            <Tooltip title={update.spam?"star":"Unstar"}>
            <i className={`fa-${update.starred?'solid':'regular'} fa-star fa-xs`}></i>     
            </Tooltip>
            </IconButton>
            <Tooltip title="Reply">
            <IconButton>
              <ReplyIcon/>
            </IconButton>
            </Tooltip>
            <Tooltip title="More">
            <IconButton>
              <MoreVertIcon/>
            </IconButton>
            </Tooltip>
          </div>
          </div>

        </div>
      </div>
      <div className="content-email-view">
        <Box sx={
          {
            display:'flex',
            textOverflow:'ellipsis',
            flexDirection:'column',
            marginX:'5.5%',
            marginY:'2%'
          }
        }>
        id:{data._id}
         <Typography>
         {data.body}
         </Typography>
        </Box>
      </div>
     </div>
  )
}

export default ViewEmail
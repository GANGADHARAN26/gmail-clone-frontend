import { useEffect, useState } from "react";
import { backendUrl} from "../../../../../config";
import { Checkbox, Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';

import ViewEmail from "../common/ViewEmail";
import NoEmail from "../common/NoEmail";
import "./Emails.css";

// import ViewEmail from "../common/ViewEmail";
// eslint-disable-next-line react/prop-types
const Emails = ({ openDrawer, category }) => {
  const emaildetails = {
    starred: false,
    bin: false,
    readed: false,
    important: false,
    spam: false,
    archived: false,
  };
  const [showOptions,setShowOptions] =useState(false);
  const [emails, setEmail] = useState([]);
  const [length, setLength] = useState(0);
  const [update, setUpdate] = useState(emaildetails);
  const [checkboxEmail,setCheckboxEmail] = useState([])
  const accountEmail = JSON.parse(localStorage.getItem("user"));
  const email = accountEmail.email;
  const accessToken=accountEmail.accessToken;
  const [id, setId] = useState();
  const [activateViewMail, setViewEmail] = useState(false);
  
  const loadMail = async () => {
    const response = await fetch(`${backendUrl}/email/${category}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "auth-token": accessToken
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (category === "starredemails") {
      const emailsWithStar = data.data.map((email) => ({
        ...email,
        starred: true,
      }));
      setEmail(emailsWithStar);
    } else {
      const emailsWithStar = data.data.map((email) => ({
        ...email,
        starred: false,
      }));
      setEmail(emailsWithStar);
    }
    setViewEmail(false);
  };

  useEffect(() => {
    setLength(emails ? emails.length : 0);
    loadMail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, emails.length]);
  // console.log(emails.data);
  const handleViewEmail = (e, id) => {
    e.preventDefault();
    setViewEmail(true);
    setId(id);
  };

  console.log(length);
  // Extract the time part (hours and minutes) in HH:MM format

  const handleChange = async (e, name, id) => {
    e.preventDefault();
    setEmail((prevEmails) =>
      prevEmails.map((email) =>
        email._id === id ? { ...email, starred: !email.starred } : email
      )
    );

    setUpdate((prevUpdate) => ({
      ...prevUpdate,
      [name]: !prevUpdate[name],
    }));
    console.log(name);
    try {
      await fetch(`${backendUrl}/email/${name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":accessToken
        },
        body: JSON.stringify({ [name]: !update[name], _id: id }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSelectAll=(e)=>{
    if(e.target.checked){
      setCheckboxEmail(emails.map((email)=>email._id));
      setShowOptions(true);
      showOptions(false);

      if(length===0){setShowOptions(false)}
    }else{
      setCheckboxEmail([])
    }
  }
  const handleSelectEmail=(e,id)=>{
    if (e.target.checked) {
      setCheckboxEmail((prevCheckboxEmail) => {
        const updatedEmails = [...prevCheckboxEmail, id];
        setShowOptions(true);
        return updatedEmails;
      });
    } else {
      setCheckboxEmail((prevCheckboxEmail) => {
        const updatedEmails = prevCheckboxEmail.filter(
          (selectedId) => selectedId !== id
        );
        setShowOptions(updatedEmails.length > 0); 
        return updatedEmails;
      }); 
    }
  }
 const handleUpdateMultiple=async(e,name)=>{
    e.preventDefault();
    setShowOptions(false)
    setCheckboxEmail([])
    try{
      await fetch(`${backendUrl}/email/${name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":accessToken
        },
        body: JSON.stringify({"ids":checkboxEmail}),
      });
    }
    catch(error)
    {
      console.log(error.message)
    }
 }
  return (
    <div
      className="emailList"
      style={openDrawer ? { marginLeft: 250, width: "83%" } : { width: "100%" }}
    >
      {/* Email List */}
      {activateViewMail ? (
        <ViewEmail id={id} category={category}/>
      ) : (
        <div>
      
          <div className="email-top-bar">
            <div className="left-email-top-bar">
              <Tooltip title="Select All">
                <IconButton>
                  <Checkbox onChange={(e)=> handleSelectAll(e)}
                  checked={checkboxEmail.length>0}
                  />
                </IconButton>
              </Tooltip>
              {!showOptions?
              <span className="visible">
              <Tooltip title="Referesh">
                <IconButton onClick={() => loadMail()}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="More">
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
              </span>
              :
              <spam className="hidden">
             
             <IconButton onClick={(e)=>handleUpdateMultiple(e,'archiveemails')}>
             <Tooltip title="Archive">
               <ArchiveOutlinedIcon/>
              </Tooltip>
             </IconButton>
              <IconButton>
             <Tooltip title="Spam">
               <ReportOutlinedIcon  onClick={(e)=>handleUpdateMultiple(e,'spamemails')}/>
               </Tooltip>
             </IconButton> 
             <IconButton >
               <Tooltip title="Delete">
               <DeleteOutlinedIcon  onClick={(e)=>handleUpdateMultiple(e,'binemails')}/>
               </Tooltip>
             </IconButton> 
             <IconButton >
             <Tooltip title="Mark as UnReaded">
               <MarkEmailUnreadOutlinedIcon  onClick={(e)=>handleUpdateMultiple(e,'readedemails')}/>
               </Tooltip>
             </IconButton> 
             <IconButton className='view-icon' >
               <Tooltip title="More">
               <MoreVertIcon/>
               </Tooltip>
             </IconButton>
       </spam> }
            </div>
            <div className="right-email-top-bar">
              <Tooltip title="Previous Page">
                <IconButton>
                  <KeyboardArrowLeftIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Next Page">
                <IconButton>
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div> 
          {length === 0 ? (
            <NoEmail />
          
          ) : (
            <div className="emailList_List" >
              {(emails || <NoEmail catergoy={category} />).map((email) => (
                <div key={email._id}>
                  {/* Email Row */}
                  <div className="email-row"  style={email.readed ? { backgroundColor: "#eaf1fb" } : {}}>  
                    <div className="emailRow_options">
                      <Tooltip title="select">
                        <IconButton>
                          <Checkbox 
                           onChange={(e) => handleSelectEmail(e, email._id)}
                           checked={checkboxEmail.includes(email._id)}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={email.starred ? "starred" : "Unstar"}>
                        <IconButton
                          onClick={(e) => handleChange(e, "starred", email._id)}
                        >
                          <i
                            className={`fa-${
                              email.starred ? "solid" : "regular"
                            } fa-star fa-xs`}
                          ></i>
                        </IconButton>
                      </Tooltip>
                    </div>

                    <div
                      className="emailRow_message"
                      onClick={(e) => handleViewEmail(e, email._id)}
                    >
                      <div className="email-title">{email.name}</div>

                      <h6>
                        {email.subject}&nbsp;
                        <span className="emailRow_description">
                          {email.body}
                        </span>
                      </h6>
                    </div>
                    <div className="emailRow_time">
                      <div className="edit-icons">
                        <Tooltip
                          title={update.archived ? "UnArchive" : "Archive"}
                        >
                          <ArchiveOutlinedIcon
                            onClick={(e) =>
                              handleChange(e, "archived", email._id)
                            }
                            className="icon-email-row"
                            fontSize="small"
                          />
                        </Tooltip>
                        <Tooltip title="delete">
                          <DeleteOutlinedIcon
                            onClick={(e) => handleChange(e, "bin", email._id)}
                            className="icon-email-row"
                            fontSize="small"
                          />
                        </Tooltip>
                        <Tooltip
                          title={
                            email.readed
                              ? "Mark as UnReaded"
                              : "Mark as Readed"
                          }
                        >
                          <DraftsOutlinedIcon
                            className="icon-email-row"
                            fontSize="small"
                            onClick={(e) =>
                              handleChange(e, "readed", email._id)
                            }
                          />
                        </Tooltip>
                        <Tooltip title={update.spam ? "UnSpam" : "Spam"}>
                          <ReportOutlinedIcon
                            className="icon-email-row"
                            fontSize="small"
                            onClick={(e) => handleChange(e, "spam".email._id)}
                          />
                        </Tooltip>
                      </div>
                      <span className="mail-time">
                        {email.date} - {email.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* <ViewEmail/> */}
    </div>
  );
};

export default Emails;

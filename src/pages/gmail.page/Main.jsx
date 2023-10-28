import { useState } from "react"
import HeaderMaterial from "./MaterialUI/header/HeaderMaterial"
import SidebarMaterial from "./MaterialUI/sidebar/SidebarMaterial"
import Emails from "./MaterialUI/Components/Emails"
import {  useParams } from "react-router-dom"



const Main = () => {
  const [openDrawer,setOpenDrawer]=useState(true)
  const {category}=useParams();
  console.log('category:',category)
  const toggleDrawer=()=>{
    setOpenDrawer(prevState => !prevState);
  }
  return (
    <div className="main">
     <HeaderMaterial toggleDrawer={toggleDrawer}/>
     <SidebarMaterial openDrawer={openDrawer} category={category}/>
     <Emails openDrawer={openDrawer} category={category}/>
    </div>
  )
}

export default Main
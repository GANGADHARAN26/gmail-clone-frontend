import { Divider, Typography, styled } from "@mui/material"
import { Box } from "@mui/system"

const Component=styled(Box)({
    display:'flex',
    alignItems: 'center',
    flexDirection:'column',
    marginTop:50,
    opacity:'.8 ',
    width:'100%'
})
const StyledDivider=styled(Divider)({
    width:'100%',
    marginTop:10,
})
// eslint-disable-next-line react/prop-types
const NoEmail = ({catergoy}) => {
  return (
    <Component>
        <Typography>Your {catergoy} Mail is empty</Typography>
        <Typography>Mails that dont appear in other tabs will be shown here</Typography>
        <Typography></Typography>
        <StyledDivider/>
       </Component>
  )
}

export default NoEmail
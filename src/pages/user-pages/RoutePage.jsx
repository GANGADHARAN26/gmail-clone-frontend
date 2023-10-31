import Box from '@mui/material/Box';
import { LinearProgress} from '@mui/material';
import { Typography } from '@mui/material';
import gmail from '../gmail.page/MaterialUI/assets/gmail.svg';


const RoutePage = () => {
  setTimeout(() => window.location.href="./main/normal",[3000])
    
  return (
    <Box 
    sx={{ 
      display: 'flex' ,
      justifyContent:'space-around',
      alignItems:'center'}}>
      <Box sx={{ width: '100%' }}>
      <LinearProgress />
      <Typography variant='h3'
      sx={{
        display: 'flex',
        justifyContent:'center',
        marginTop:'16%'
      }}>

<img src={gmail} alt="Gmail" style={{width:'100px'}}/>
&nbsp;<span style={{display:'flex',alignItems:'center'}}>Gmail Application</span>
</Typography>
    </Box>
   
  </Box>
  )
}

export default RoutePage
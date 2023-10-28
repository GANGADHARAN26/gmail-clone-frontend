import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { TypeSpecimenTwoTone } from '@mui/icons-material';

const SuspenseLoader = () => {
  return (
    <Box sx={{ display: 'flex' ,justifyContent:'space-around'}}>
      <CircularProgress />
      <TypeSpecimenTwoTone>Loading...</TypeSpecimenTwoTone>
    </Box>
  )
}

export default SuspenseLoader
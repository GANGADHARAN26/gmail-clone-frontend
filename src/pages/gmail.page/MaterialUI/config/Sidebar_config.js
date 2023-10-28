import PhotoIcon from '@mui/icons-material/Photo';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
export const SIDEBAR_DATA =[{
    name:'inbox',
    title:'Inbox',
    icon:PhotoIcon,
    location:'normal'
},
{
    name:'starred',
    title:'Starred',
    icon:StarBorderOutlinedIcon,
    location:'starredemails'
},
{
    name:'sent',
    title:'Sent',
    icon:SendOutlinedIcon,
    location:'inbox'
},
{
    name:'important',
    title:'Important',
    icon:LabelImportantIcon,
    location:'importantemails'
},
{
    name:'bin',
    title:'Bin',
    icon:DeleteOutlineOutlinedIcon,
    location:'binned'
},
{
    name:'allmail',
    title:'All Mail',
    icon:MailOutlinedIcon,
    location:'allmails'
}
]
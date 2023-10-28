import axios from "axios";
import { backendUrl } from './../../../../config';
const accountEmail = JSON.parse(localStorage.getItem("user"));
const accessToken=accountEmail.accessToken;
const API_GAMIL =async(urlObject,payload)=>{
    return await axios({
        method:urlObject.method,
        url:`${backendUrl}/email/${urlObject.endpoint}`,
        headers: {
            "Content-Type": "application/json",
             "auth-token": accessToken
          },
        data:payload
    })
}
export default API_GAMIL; 
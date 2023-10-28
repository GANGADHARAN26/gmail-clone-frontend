import axios from "axios";
import { backendUrl } from './../../../../config';

const API_GAMIL =async(urlObject,payload,accessToken)=>{
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
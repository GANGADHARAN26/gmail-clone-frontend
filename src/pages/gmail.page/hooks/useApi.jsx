import { useState } from "react";
import API_GAMIL from "../services/api"

const useApi=(urlObject)=>{
    const accountEmail = JSON.parse(localStorage.getItem("user"));
const accessToken=accountEmail.accessToken;
    const [response,setResponse]=useState(null);
    const [error,setError]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const call =async(payload)=>{
        setResponse(null);
        setError("");
        setIsLoading(true);
        try{
            let res=await API_GAMIL(urlObject,payload,accessToken);
            setResponse(res.data);
        }catch(error){
            setError(error.message);
        }finally{
            setIsLoading(false);
        }
    }
    return {call,response,error,isLoading};
}

export default useApi;
import React, { use, useEffect } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';


const secureInstance = axios.create({
  baseURL: 'https://club-sphere-server.vercel.app',
 
})
  const useSecureAxios=()=>{
const navigate = useNavigate()
const {user,logOut} = use(AuthContext)
    useEffect(()=>{

    const axiosRequest = secureInstance.interceptors.request.use((config)=>{

       config.headers.authorization = `Bearer ${user.accessToken}`

        return config
    })

   const axiosResponse = secureInstance.interceptors.response.use(res=>{

return res
   },err=>{
 
     const status = err.response?.status;

      if(status === 401 || status === 403){
            logOut()
            .then(()=>{
               navigate("/register")
            })
          }
   })

     return ()=>{

      secureInstance.interceptors.request.eject(axiosRequest);
      secureInstance.interceptors.response.eject(axiosResponse);


        }
         
},
    
    [user,logOut,navigate])
         
  

   



     return secureInstance;

  }
  export default useSecureAxios;
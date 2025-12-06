import React from 'react';

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://club-sphere-server.vercel.app',
 
})
  const useAxios=()=>{

     return instance;

  }
  export default useAxios;
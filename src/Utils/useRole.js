import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import useAxios from "./axios";
import { AuthContext } from "../context/AuthContext";

 
  const useRole = () =>{

    const {user} = use(AuthContext)
    const instance = useAxios()
    const { data : role ="user" , isLoading } = useQuery({

        queryKey:["user-role", user?.email],
        queryFn: async() =>{

            const res = await instance.get(`/user/${user.email}/role`)
            return res.data.role
        }

    })
    return {role,isLoading}
  } 

  export default useRole ;
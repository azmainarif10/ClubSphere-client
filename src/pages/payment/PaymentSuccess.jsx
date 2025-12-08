import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../../Utils/axios';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
     const instance = useAxios()
    const [searchParam] = useSearchParams()
 const sessionId = searchParam.get("session_id");
 
 useEffect(()=>{
 
    if (sessionId) {
     instance.get(`/payment-success?session_id=${sessionId}`)
     .then(()=>
         Swal.fire({
       position: "top-end",
       icon: "success",
       title: "Paid member has been  added",
       showConfirmButton: false,
       timer: 1500
     })
    )
         
     
     
        }
 
 
 
 
},[instance,sessionId]
 )
     return (
        <div>
            <p className='text-lg font-bold text-blue-300'>Payment Sucessful</p>
        </div>
    );
};

export default PaymentSuccess;
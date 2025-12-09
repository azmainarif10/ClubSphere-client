import React, {  useContext } from 'react';
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from '../../Utils/axios';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
const ClubDetails = () => {
    const {user} = useContext(AuthContext)
    console.log(user)
    const {id} = useParams()
    const instance = useAxios()
     const { data: club} = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await instance.get(`/clubs/${id}`);
      return res.data;
    },
  });

    
       const joinFreeClub = useMutation({
    mutationFn: async (data) => {
      const res = await instance.post("/memberships",data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("You have successfully joined the club!");
    },
    onError: () => {
      toast.error("Something went wrong.");
    }
  });
  if (!user){
  return <div className="text-center py-20">Loading...</div>;
    } 
 
  if (!club) {
    return <div className="text-center py-20">Something went wrong!</div>;
  }
  
  function handleJoinFree() {
  if (!user) {
    toast.error("Please login first");
    return;
  }

  joinFreeClub.mutate({
    clubId: id,
    userEmail: user.email,
    status: "active",
  });
}
  async function  handlePay(club){

  if (!user) {
    toast.error("Please login first");
    return;
  }


     const clubInfo = {
    clubId : id,
    cost : club.membershipFee,
    email:user?.email,
    clubName :club.clubName,


  }
 
   const res =  await instance.post("/create-checkout-session",clubInfo);
        
  
   window.location.assign(res.data.url)

}

   
    return (
       <div>
  <div className="max-w-7xl mx-auto px-4 py-10">
    <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
      <img
        src={club.bannerImage}
        alt={club.clubName}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-4">{club.clubName}</h1>
        <p className="text-gray-600 mb-4">{club.description}</p>

        <div className="flex flex-wrap gap-4 mb-6">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            Category: {club.category}
          </span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            Location: {club.location}
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
            Membership Fee: {club.membershipFee > 0 ? `${club.membershipFee}$` : "Free"}
          </span>
        </div>
 
       
       
       {
  club.membershipFee > 0 ? (
    <button
      onClick={() => handlePay(club)}
      className="bg-blue-300 text-white text-lg font-bold py-2 px-6 rounded"
    >
      Pay & Join Club
    </button>
  ) : (
    <button
      onClick={handleJoinFree}
      className="bg-blue-300 text-white text-lg font-bold py-2 px-6 rounded"
    >
      Join Club
    </button>
  )
}
      

      
   

      </div>

      <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Club Manager</h3>
        <p className="text-gray-700 mb-2">{club.managerName || "Manager Name"}</p>
        <p className="text-gray-500 text-sm">{club.managerEmail || "manager@example.com"}</p> </div>
   </div>
   </div>
   </div>
    );
};

export default ClubDetails;
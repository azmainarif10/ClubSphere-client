import React, { useState } from 'react';
import {useQuery} from '@tanstack/react-query'
import useAxios from '../../Utils/axios';
const Club = () => {
     const instance = useAxios()
       const [category, setCategory] = useState("");
     const [searchTerm,setSearchTerm] = useState('')
     const {  data: clubs=[] } = useQuery({
    queryKey: ['clubs',searchTerm, category],
    queryFn: async () =>{

         const params = {};
      if (searchTerm) params.search = searchTerm;
      if (category) params.category = category;

     const res =  await instance.get('/clubs',{params})
        
    return  res.data
    }
  })

  const filteredClubs = clubs.filter(club=>club.clubName.toLowerCase().includes(searchTerm.toLowerCase()))
    
 

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

  <div className="w-full h-60 md:h-80 rounded-xl overflow-hidden mb-10">
    <img
      src="https://i.ibb.co.com/WSwhyXk/Gemini-Generated-Image-pj0vpzpj0vpzpj0v-1.png" 
      alt="Clubs Banner"
      className="w-full h-full object-cover"
    />
  </div>

  <h1 className="text-3xl font-bold mb-6 text-center">
    Explore All Clubs
  </h1>

  <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
    <input
      onChange={(e)=> setSearchTerm(e.target.value)}
     value={searchTerm}
      type="text"
      placeholder="Search clubs..."
      className="w-full md:w-1/3 px-4 py-2 border rounded-lg outline-none"
    />

    <select
      value={category}
        onChange={(e) => setCategory(e.target.value)}
     className="w-full md:w-1/4 px-4 py-2 border rounded-lg outline-none">
      <option value="">Filter by Category</option>
      <option value="Technology">Technology</option>
      <option value="Travelling">Travelling</option>
      <option value="Literature">Literature</option>
      <option value="Photography">Photography</option>
    </select>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredClubs.map((club) => (
      <div
        key={club.id}
        className="bg-white shadow-md rounded-xl  overflow-hidden hover:shadow-lg transition flex flex-col"
      >
        <div className="w-full h-40 overflow-hidden">
          <img
            src={club.bannerImage || "https://i.ibb.co/5x3WmSR/club-banner.jpg"} 
            alt={club.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
          <p className="text-gray-600 mb-1"><b>Category:</b> {club.category}</p>
          <p className="text-gray-600 mb-1"><b>Name:</b> {club.clubName}</p>
          <p className="text-gray-600 mb-4"><b>Membership Fee:</b> {club.membershipFee}$</p>

          <button className="mt-auto w-full bg-blue-300 text-white py-2 rounded-lg">
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>

</div>
                
    );
};

export default Club;
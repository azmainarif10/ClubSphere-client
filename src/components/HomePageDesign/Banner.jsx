import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../Utils/axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const instance = useAxios();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await instance.get("/clubs");
      return res.data;
    },
  });

  if (isLoading || clubs.length === 0) {
    return null;
  }

  return (
    <div className="md:px-10 lg:px-20">
      <Carousel
        autoPlay
        infiniteLoop
        interval={2000}
        showThumbs={false}
        showStatus={false}
        
        emulateTouch
                stopOnHover={false}
      >
        {clubs.map((club) => (
          <div key={club._id} className="relative lg:h-[60vh] h-80 rounded-xl overflow-hidden shadow-lg">
            <img
              src={club.bannerImage}
              alt={club.clubName}
              className="w-full h-full object-cover brightness-75"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">{club.clubName}</h2>
              <p className="text-sm lg:text-base mb-2">{club.category}</p>
              <p className="hidden lg:block text-sm">{club.description?.slice(0, 100)}{club.description?.length > 100 ? '...' : ''}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;

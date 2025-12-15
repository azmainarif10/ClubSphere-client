import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../Utils/axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  
    const instance = useAxios()

 const { data: clubs = [] ,isLoading} = useQuery({
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
        <div>
              <div className='md:px-20'>
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
               interval={2000}
                showThumbs={false}
                showStatus={false}
                stopOnHover={false}
            
            >
              
              {
                clubs.map(club=>
                    <div className="lg:h-[60vh]">
                    <img src={club.bannerImage} />
                    
                </div>
                )
              } 
                
            </Carousel>
        </div>
        </div>
    );
};

export default Banner;
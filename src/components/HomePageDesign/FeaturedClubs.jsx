import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { FaUsers } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { AuthContext } from "../../context/AuthContext";
import useAxios from "../../Utils/axios";
import { useQuery } from "@tanstack/react-query";

const FeaturedClubs = () => {
  const instance = useAxios();
  const { loading } = useContext(AuthContext);

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featuredClubs"],
    queryFn: async () => {
      const res = await instance.get("/home/clubs/featured");
      return res.data;
    },
  });

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p>Loading featured clubs...</p>
      </div>
    );
  }

  return (
    <div className="py-10">

    < p className="text-3xl text-center text-blue-300 font-bold py-6">Featured Clubs</p>

      <Swiper
        key={clubs.length}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        centeredSlides
        grabCursor
        slidesPerView={3}
        pagination={{ clickable: true }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.85,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {clubs.map((club) => (
          <SwiperSlide key={club._id}>
            <div className="max-w-lg bg-base-100 shadow-lg rounded-xl overflow-hidden">
              <figure>
                <img
                  src={club.bannerImage}
                  alt={club.clubName}
                  className="h-48 w-full object-cover"
                />
              </figure>

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">
                  {club.clubName}
                </h3>

                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <FaUsers />
                  {club.memberCount} Members
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedClubs;
